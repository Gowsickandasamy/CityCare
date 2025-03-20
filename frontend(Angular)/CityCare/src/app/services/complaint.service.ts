import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = "http://127.0.0.1:8000/complaints"
  constructor(private http:HttpClient) { }

  createComplaint(body:any):Observable<any>{
    const{title,description, area_name, location_link} = body;
    return this.http.post(`${this.apiUrl}/create/`, {title,description, area_name, location_link})
  }
}
