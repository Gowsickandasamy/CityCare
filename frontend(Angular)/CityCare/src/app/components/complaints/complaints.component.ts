import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-complaints',
  imports: [CommonModule, MatIconModule],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent implements OnInit{
  complaints:Complaint[] = []
  userRole: string = '';
  userName: string = '';

  constructor(private complaintService:ComplaintService, private authService: AuthService){}

  ngOnInit(): void {
    // Fetch user role and complaints
    this.authService.getUserInfo().subscribe({
      next: (user: User) => {
        this.userRole = user.role;
        this.userName = user.username;
        this.loadComplaints();
      },
      error: (err) => console.error('Error fetching user info:', err)
    });
  }

  loadComplaints(): void {
    this.complaintService.get_complaint().subscribe({
      next: (response: any) => {
        console.log(response)
        this.complaints = response
      },
      error: (err) => console.error('Error fetching complaints:', err)
    });
  }
}
