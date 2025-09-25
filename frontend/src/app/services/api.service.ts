import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Issue, IssueCreate, IssueUpdate, PagedIssues } from '../models/issue';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // Adjust if backend runs elsewhere
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  health(): Observable<{status: string}> {
    return this.http.get<{status: string}>(`${this.baseUrl}/health`);
  }

  getIssues(args: {
    q?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
  }): Observable<PagedIssues> {
    let params = new HttpParams();
    for (const [k, v] of Object.entries(args)) {
      if (v !== undefined && v !== null && v !== '') {
        params = params.set(k, String(v));
      }
    }
    return this.http.get<PagedIssues>(`${this.baseUrl}/issues`, { params });
  }

  getIssue(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.baseUrl}/issues/${id}`);
  }

  createIssue(payload: IssueCreate): Observable<Issue> {
    return this.http.post<Issue>(`${this.baseUrl}/issues`, payload);
  }

  updateIssue(id: number, payload: IssueUpdate): Observable<Issue> {
    return this.http.put<Issue>(`${this.baseUrl}/issues/${id}`, payload);
  }
}