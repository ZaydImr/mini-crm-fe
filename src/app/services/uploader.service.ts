import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Files } from '../models/files';
import { MessageResponse } from '../models/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class UploaderService {

  baseUrl = `${environment.apiUrl}file`;

  constructor(private httpClient: HttpClient) { }

  public find(fileName: string): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/find/${fileName}`, { responseType: 'blob' });
  }

  public upload(file: File): Observable<MessageResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<MessageResponse>(`${this.baseUrl}/upload`, formData);
  }
  public getAll(): Observable<Files[]> {
    return this.httpClient.get<Files[]>(`${this.baseUrl}/all`);

  }
  public findById(internshipId: number): Observable<MessageResponse> {
    return this.httpClient.get<MessageResponse>(`${this.baseUrl}/findById/${internshipId}`);
  }
}
