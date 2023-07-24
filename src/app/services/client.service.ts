import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
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

  getClientById(client_id : any): Observable<Client>{
    return this.http.get<Client>(`${environment.apiUrl}client/find/${client_id}`);
  }

  addClient(client : Client) : Observable<Client>{
    return this.http.post<Client>(`${environment.apiUrl}client/add`, client);
  }

  updateClient(client : Client) : Observable<Client>{
    return this.http.put<Client>(`${environment.apiUrl}client/update`, client);
  }

  deleteClient(id : any) : Observable<String>{
    return this.http.delete<String>(`${environment.apiUrl}client/delete/${id}`);
  }
}
