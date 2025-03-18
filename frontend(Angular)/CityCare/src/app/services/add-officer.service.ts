import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Officer } from '../models/officer';

@Injectable({
  providedIn: 'root'
})
export class AddOfficerService {

  private apiUrl = "http://127.0.0.1:8000/officer"

  constructor(private http: HttpClient) { }

  addOfficer(body:any):Observable<any>{
    const { username, email, phone_number, area_of_control } = body
    return this.http.post(`${this.apiUrl}/create/`, { username, email, phone_number, area_of_control })
  }

  getOfficers():Observable<Officer[]>{
    return this.http.get<Officer[]>(`${this.apiUrl}/getOfficer/`)
  }
}
