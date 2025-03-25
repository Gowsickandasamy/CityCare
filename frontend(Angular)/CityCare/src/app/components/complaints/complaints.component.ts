import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-complaints',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent implements OnInit{
  complaints:Complaint[] = []
  userRole: string = '';
  userName: string = '';
  searchText: string = ''

  selectedStatus: string = 'All Complaints';

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


  get filteredComplaints() {
    return this.complaints.filter(complaint => {
      // Filter by status
      const statusMatch = this.selectedStatus === 'All Complaints' || complaint.status === this.selectedStatus;

      const officerMatch = this.searchText.trim() === '' || 
                     (complaint.officer?.toLowerCase() ?? '').includes(this.searchText.toLowerCase());
      

      return statusMatch && officerMatch;
    });
  }

  setStatus(status: string) {
    this.selectedStatus = status;
  }
}
