import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Issue, IssueCreate, IssueUpdate, Priority, Status } from '../../models/issue';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form">
      <div>
        <label>Title</label>
        <input type="text" [(ngModel)]="model.title" placeholder="Enter title" />
      </div>
      <div>
        <label>Assignee</label>
        <input type="text" [(ngModel)]="model.assignee" placeholder="e.g. alice" />
      </div>
      <div style="grid-column: 1 / -1;">
        <label>Description</label>
        <textarea [(ngModel)]="model.description" placeholder="Describe the issue..."></textarea>
      </div>
      <div>
        <label>Status</label>
        <select [(ngModel)]="model.status">
          <option *ngFor="let s of statuses" [value]="s">{{ s }}</option>
        </select>
      </div>
      <div>
        <label>Priority</label>
        <select [(ngModel)]="model.priority">
          <option *ngFor="let p of priorities" [value]="p">{{ p }}</option>
        </select>
      </div>
      <div class="actions">
        <button class="primary" (click)="onSubmit()" [disabled]="!model.title?.trim()">Save</button>
        <button (click)="cancel.emit()">Cancel</button>
      </div>
    </div>
  `
})
export class IssueFormComponent {
  @Input() issue?: Issue | null;
  @Output() save = new EventEmitter<IssueCreate | IssueUpdate>();
  @Output() cancel = new EventEmitter<void>();

  statuses: Status[] = ['open', 'in_progress', 'closed'];
  priorities: Priority[] = ['low', 'medium', 'high'];

  model: IssueCreate | IssueUpdate = {
    title: '',
    description: '',
    status: 'open',
    priority: 'medium',
    assignee: ''
  };

  ngOnChanges(): void {
    if (this.issue) {
      this.model = {
        title: this.issue.title,
        description: this.issue.description ?? '',
        status: this.issue.status,
        priority: this.issue.priority,
        assignee: this.issue.assignee ?? ''
      };
    } else {
      this.model = {
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        assignee: ''
      };
    }
  }

  onSubmit(): void {
    this.save.emit({ ...this.model });
  }
}