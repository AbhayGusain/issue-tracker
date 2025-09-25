import json
import os
from datetime import datetime, timezone
from typing import Dict, List, Optional, Tuple

from schemas import Issue, IssueCreate, IssueUpdate


DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class IssueStore:
    def __init__(self) -> None:
        self._issues: Dict[int, Issue] = {}
        self._next_id: int = 1
        self._load()

        if not self._issues:
            self._seed()

    def _load(self) -> None:
        if not os.path.exists(DATA_FILE):
            return
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                raw = json.load(f)
            issues = raw.get("issues", [])
            self._issues = {i["id"]: Issue(**i) for i in issues}
            self._next_id = max(self._issues.keys(), default=0) + 1
        except Exception:
            # Start fresh if corrupted
            self._issues = {}
            self._next_id = 1

    def _save(self) -> None:
        payload = {"issues": [i.model_dump() for i in self._issues.values()]}
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(payload, f, indent=2)

    def _seed(self) -> None:
        now = utc_now_iso()
        samples = [
            Issue(
                id=self._next_id,
                title="Bug: Login fails on Safari",
                description="Users on Safari 17 cannot login due to CORS preflight error.",
                status="open",
                priority="high",
                assignee="alice",
                createdAt=now,
                updatedAt=now,
            ),
            Issue(
                id=self._next_id + 1,
                title="Feature: Add dark mode",
                description="Provide a toggle for dark theme",
                status="in_progress",
                priority="medium",
                assignee="bob",
                createdAt=now,
                updatedAt=now,
            ),
            Issue(
                id=self._next_id + 2,
                title="Docs: Update README with API usage",
                description="Add examples for filtering and sorting",
                status="closed",
                priority="low",
                assignee="carol",
                createdAt=now,
                updatedAt=now,
            ),
        ]
        for s in samples:
            self._issues[s.id] = s
        self._next_id += len(samples)
        self._save()

    def list_issues(
        self,
        q: Optional[str],
        status: Optional[str],
        priority: Optional[str],
        assignee: Optional[str],
        sort_by: str,
        sort_order: str,
        page: int,
        page_size: int,
    ) -> Tuple[List[Issue], int]:
        issues = list(self._issues.values())

        # Filters
        if q:
            q_lower = q.lower()
            issues = [i for i in issues if q_lower in i.title.lower()]
        if status:
            issues = [i for i in issues if i.status == status]
        if priority:
            issues = [i for i in issues if i.priority == priority]
        if assignee:
            issues = [i for i in issues if (i.assignee or "").lower() == assignee.lower()]

        # Sorting
        valid_sort = {"id", "title", "status", "priority", "assignee", "createdAt", "updatedAt"}
        if sort_by not in valid_sort:
            sort_by = "updatedAt"
        reverse = sort_order == "desc"

        def sort_key(i: Issue):
            val = getattr(i, sort_by)
            # Normalize None for assignee sort
            if val is None:
                return ""
            return val

        issues.sort(key=sort_key, reverse=reverse)

        total = len(issues)
        # Pagination
        if page < 1:
            page = 1
        if page_size < 1:
            page_size = 10
        start = (page - 1) * page_size
        end = start + page_size
        paged = issues[start:end]
        return paged, total

    def get_issue(self, issue_id: int) -> Optional[Issue]:
        return self._issues.get(issue_id)

    def create_issue(self, data: IssueCreate) -> Issue:
        now = utc_now_iso()
        issue = Issue(
            id=self._next_id,
            title=data.title,
            description=data.description,
            status=data.status,
            priority=data.priority,
            assignee=data.assignee,
            createdAt=now,
            updatedAt=now,
        )
        self._issues[issue.id] = issue
        self._next_id += 1
        self._save()
        return issue

    def update_issue(self, issue_id: int, data: IssueUpdate) -> Optional[Issue]:
        existing = self._issues.get(issue_id)
        if not existing:
            return None
        updated = existing.model_copy(update={k: v for k, v in data.model_dump(exclude_unset=True).items()})
        updated.updatedAt = utc_now_iso()
        self._issues[issue_id] = updated
        self._save()
        return updated