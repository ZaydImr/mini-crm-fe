import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<Client[]>{
    return this.http.get<Client[]>(`${environment.apiUrl}client/all`);
  }

  getById(id: number) : Observable<Client>{
    return this.http.get<Client>(`${environment.apiUrl}client/find/${id}`);
  }

  add(client: Client) : Observable<Client>{
    return this.http.post<Client>(`${environment.apiUrl}client/add`, client);
  }

  update(client: Client) : Observable<Client>{
    return this.http.put<Client>(`${environment.apiUrl}client/update`, client);
  }

  delete(id: number) : Observable<string>{
    return this.http.delete<string>(`${environment.apiUrl}client/delete/${id}`);
  }

}
