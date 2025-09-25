import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Issue } from '../../models/issue';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './issue-detail.component.html'
})
export class IssueDetailComponent {
  issue?: Issue;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.getIssue(id).subscribe({
      next: (res) => {
        this.issue = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Issue not found';
        console.error(err);
        this.loading = false;
      }
    });
  }
}