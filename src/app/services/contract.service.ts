import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Contract } from '../models/Contract';
import { MessageResponse } from '../models/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private prefix = 'contract';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${environment.apiUrl}${this.prefix}/all`);
  }

  getById(entity_id: number): Observable<Contract> {
    return this.http.get<Contract>(`${environment.apiUrl}${this.prefix}/find/${entity_id}`);
  }

  getCurrentMonthCount(): Observable<MessageResponse> {
    return this.http.get<MessageResponse>(`${environment.apiUrl}${this.prefix}/month-count`);
  }

  add(entity: Contract): Observable<Contract> {
    return this.http.post<Contract>(`${environment.apiUrl}${this.prefix}/add`, entity);
  }

  update(entity: Contract): Observable<Contract> {
    return this.http.put<Contract>(`${environment.apiUrl}${this.prefix}/update`, entity);
  }

  delete(entity_id: number): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(`${environment.apiUrl}${this.prefix}/delete/${entity_id}`);
  }
}
