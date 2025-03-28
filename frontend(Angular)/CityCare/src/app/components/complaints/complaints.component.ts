import { Component, OnInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StatusModalComponent } from '../../components-library/status-modal/status-modal.component';

@Component({
  selector: 'app-complaints',
  imports: [CommonModule, MatIconModule, FormsModule, RouterLink, StatusModalComponent],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent implements OnInit{
  complaints:Complaint[] = []
  userRole: string = '';
  userName: string = '';
  searchText: string = ''
  selectedStatus: string = 'All Complaints';
  showModal: boolean = false;
  selectedComplaint: Complaint | null = null;

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

  openStatusModal(complaint: Complaint) {
    this.selectedComplaint = complaint;
    this.showModal = true;
  }

  closeStatusModal() {
    this.showModal = false;
    this.selectedComplaint = null;
  }

  updateComplaintStatus(newStatus: any) {
    if (!this.selectedComplaint) {
      console.error('Error: No complaint selected.');
      return;
    }
  
    if (this.selectedComplaint.id === undefined) {
      console.error('Error: Complaint ID is missing.');
      return;
    }
  
    const updatedComplaint = {
      id: this.selectedComplaint.id,  // Ensure ID is included
      status: newStatus
    };
  
    this.complaintService.change_status(updatedComplaint).subscribe({
      next: () => {
        if (this.selectedComplaint) {  // Ensure it's not null before updating
          this.selectedComplaint.status = newStatus;
        }
        this.loadComplaints();
        this.closeStatusModal();
      },
      error: (err) => console.error('Error updating status:', err)
    });
  }
  
  

  get filteredComplaints() {
    return this.complaints.filter(complaint => {
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
