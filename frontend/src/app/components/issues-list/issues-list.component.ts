import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Issue, PagedIssues } from '../../models/issue';
import { IssueFormComponent } from '../issue-form/issue-form.component';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IssueFormComponent],
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent {
  // Query state
  q = '';
  status = '';
  priority = '';
  assignee = '';
  sortBy = 'updatedAt';
  sortOrder: 'asc' | 'desc' = 'desc';
  page = 1;
  pageSize = 10;

  // Data state
  issues: Issue[] = [];
  total = 0;
  totalPages = 0;
  loading = false;
  error = '';

  // Form state
  creating = false;
  editingId: number | null = null;
  editingIssue: Issue | null = null;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';
    this.api.getIssues({
      q: this.q || undefined,
      status: this.status || undefined,
      priority: this.priority || undefined,
      assignee: this.assignee || undefined,
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      page: this.page,
      pageSize: this.pageSize
    }).subscribe({
      next: (res: PagedIssues) => {
        this.issues = res.items;
        this.total = res.total;
        this.totalPages = res.totalPages;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load issues';
        console.error(err);
        this.loading = false;
      }
    });
  }

  resetPageAndLoad(): void {
    this.page = 1;
    this.load();
  }

  toggleSort(field: string): void {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = field;
      this.sortOrder = 'asc';
    }
    this.resetPageAndLoad();
  }

  pageChange(delta: number): void {
    const next = this.page + delta;
    if (next >= 1 && next <= this.totalPages) {
      this.page = next;
      this.load();
    }
  }

  openCreate(): void {
    this.creating = true;
    this.editingId = null;
    this.editingIssue = null;
  }

  openEdit(issue: Issue, event?: MouseEvent): void {
    if (event) event.stopPropagation(); // Prevent row click navigation
    this.creating = false;
    this.editingId = issue.id;
    this.editingIssue = issue;
  }

  cancelForm(): void {
    this.creating = false;
    this.editingId = null;
    this.editingIssue = null;
  }

  saveCreateOrEdit(payload: any): void {
    if (this.editingId) {
      this.api.updateIssue(this.editingId, payload).subscribe({
        next: () => {
          this.cancelForm();
          this.load();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.api.createIssue(payload).subscribe({
        next: () => {
          this.cancelForm();
          this.resetPageAndLoad();
        },
        error: (err) => console.error(err)
      });
    }
  }

  openDetail(issue: Issue): void {
    this.router.navigate(['/issues', issue.id]);
  }

  // Unique list of assignees from current page (for simple demo)
  get assigneesList(): string[] {
    const set = new Set<string>();
    for (const i of this.issues) {
      if (i.assignee) set.add(i.assignee);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }
}