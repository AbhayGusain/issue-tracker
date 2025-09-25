from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


class StatusEnum(str, Enum):
    open = "open"
    in_progress = "in_progress"
    closed = "closed"


class PriorityEnum(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class IssueBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=5000)
    status: StatusEnum = StatusEnum.open
    priority: PriorityEnum = PriorityEnum.medium
    assignee: Optional[str] = Field(default=None, max_length=200)


class IssueCreate(IssueBase):
    pass


class IssueUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=5000)
    status: Optional[StatusEnum] = None
    priority: Optional[PriorityEnum] = None
    assignee: Optional[str] = Field(default=None, max_length=200)


class Issue(IssueBase):
    id: int
    createdAt: str
    updatedAt: str


class IssueListResponse(BaseModel):
    items: list[Issue]
    page: int
    pageSize: int
    total: int
    totalPages: int
    sortBy: str
    sortOrder: str
    filters: dict