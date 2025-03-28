import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from '../models/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = "http://127.0.0.1:8000/complaints"
  constructor(private http:HttpClient) { }

  createComplaint(body:Partial<Complaint>):Observable<Complaint>{
    const{title,description, area_name, location_link} = body;
    return this.http.post<Complaint>(`${this.apiUrl}/create/`, {title,description, area_name, location_link})
  }

  get_complaint():Observable<Complaint[]>{
    return this.http.get<Complaint[]>(`${this.apiUrl}/list/`)
  }

  get_complaintById(id:number):Observable<Complaint>{
    return this.http.get<Complaint>(`${this.apiUrl}/${id}/`)
  }

  edit_complaint(body: Partial<Complaint>): Observable<Complaint> {
    const { id, title, description, area_name, location_link } = body;
    return this.http.put<Complaint>(`${this.apiUrl}/${id}/edit/`, { title, description, area_name, location_link });
  }

  change_status(body: { id: number; status: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${body.id}/status/`, { status: body.status });
  }
}
