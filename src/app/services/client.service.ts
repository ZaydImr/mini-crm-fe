import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Client } from '../models/Client';
import { environment } from 'src/environments/environment.development';
import { MessageResponse } from '../models/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private prefix = 'client';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Client[]>{
    return this.http.get<Client[]>(`${environment.apiUrl}${this.prefix}/all`);
  }

  getClientById(client_id : number): Observable<Client>{
    return this.http.get<Client>(`${environment.apiUrl}${this.prefix}/find/${client_id}`);
  }

  addClient(client : Client) : Observable<Client>{
    return this.http.post<Client>(`${environment.apiUrl}${this.prefix}/add`, client);
  }

  updateClient(client : Client) : Observable<Client>{
    console.log(client);
    
    return this.http.put<Client>(`${environment.apiUrl}${this.prefix}/update`, client);
  }

  deleteClient(client_id : number) : Observable<MessageResponse>{
    return this.http.delete<MessageResponse>(`${environment.apiUrl}${this.prefix}/delete/${client_id}`);
  }
}
