import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Affair } from '../models/Affair';
import { MessageResponse } from '../models/MessageResponse';
import { Statistic } from '../models/Statistic';

@Injectable({
  providedIn: 'root'
})
export class AffaiService {

  private prefix = 'affair';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Affair[]> {
    return this.http.get<Affair[]>(`${environment.apiUrl}${this.prefix}/all`);
  }

  getById(entity_id: number): Observable<Affair> {
    return this.http.get<Affair>(`${environment.apiUrl}${this.prefix}/find/${entity_id}`);
  }

  getStatistics(): Observable<Statistic[]> {
    return this.http.get<Statistic[]>(`${environment.apiUrl}${this.prefix}/statistics`);
  }

  getCurrentYearCount(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${environment.apiUrl}${this.prefix}/year-count`);
  }

  getCurrentMonthCount(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${environment.apiUrl}${this.prefix}/month-count`);
  }

  add(entity: Affair): Observable<Affair> {
    return this.http.post<Affair>(`${environment.apiUrl}${this.prefix}/add`, entity);
  }

  update(entity: Affair): Observable<Affair> {
    return this.http.put<Affair>(`${environment.apiUrl}${this.prefix}/update`, entity);
  }

  delete(entity_id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${environment.apiUrl}${this.prefix}/delete/${entity_id}`);
  }
}
