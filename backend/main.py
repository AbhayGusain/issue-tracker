from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from typing import Optional

from schemas import Issue, IssueCreate, IssueListResponse, IssueUpdate
from store import IssueStore

app = FastAPI(title="Issue Tracker API", version="1.0.0")
store = IssueStore()

# CORS for local Angular dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo purposes; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redirect the root path to Swagger docs for convenience
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/issues", response_model=IssueListResponse)
def list_issues(
    q: Optional[str] = Query(default=None, description="Search by title (case-insensitive substring)"),
    status: Optional[str] = Query(default=None, description="Filter by status: open|in_progress|closed"),
    priority: Optional[str] = Query(default=None, description="Filter by priority: low|medium|high"),
    assignee: Optional[str] = Query(default=None, description="Filter by exact assignee"),
    sortBy: str = Query(default="updatedAt", description="Sort field"),
    sortOrder: str = Query(default="desc", description="asc|desc"),
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=10, ge=1, le=100),
):
    items, total = store.list_issues(q, status, priority, assignee, sortBy, sortOrder, page, pageSize)
    total_pages = (total + pageSize - 1) // pageSize if pageSize else 1
    return {
        "items": items,
        "page": page,
        "pageSize": pageSize,
        "total": total,
        "totalPages": total_pages,
        "sortBy": sortBy,
        "sortOrder": sortOrder,
        "filters": {
            "q": q,
            "status": status,
            "priority": priority,
            "assignee": assignee,
        },
    }


@app.get("/issues/{issue_id}", response_model=Issue)
def get_issue(issue_id: int):
    issue = store.get_issue(issue_id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return issue


@app.post("/issues", response_model=Issue, status_code=201)
def create_issue(payload: IssueCreate):
    return store.create_issue(payload)


@app.put("/issues/{issue_id}", response_model=Issue)
def update_issue(issue_id: int, payload: IssueUpdate):
    updated = store.update_issue(issue_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="Issue not found")
    return updated