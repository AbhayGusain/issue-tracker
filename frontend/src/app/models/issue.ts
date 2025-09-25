export type Status = 'open' | 'in_progress' | 'closed';
export type Priority = 'low' | 'medium' | 'high';

export interface Issue {
  id: number;
  title: string;
  description?: string | null;
  status: Status;
  priority: Priority;
  assignee?: string | null;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface IssueCreate {
  title: string;
  description?: string | null;
  status: Status;
  priority: Priority;
  assignee?: string | null;
}

export interface IssueUpdate {
  title?: string;
  description?: string | null;
  status?: Status;
  priority?: Priority;
  assignee?: string | null;
}

export interface PagedIssues {
  items: Issue[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  filters: Record<string, unknown>;
}