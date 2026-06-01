import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BulkRequestService {
  constructor(private readonly http: HttpClient) {}

  create(payload: unknown): Observable<unknown> {
    return this.http.post(`${environment.apiUrl}/bulk-requests`, payload);
  }

  list(): Observable<unknown[]> {
    return this.http.get<unknown[]>(`${environment.apiUrl}/bulk-requests`, { headers: this.authHeaders() });
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('agrabo_admin_token');
    return token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
  }
}
