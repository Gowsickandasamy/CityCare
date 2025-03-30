import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StatusModalComponent } from '../../components-library/status-modal/status-modal.component';
import { ToastrService } from 'ngx-toastr';
declare var bootstrap: any;
@Component({
  selector: 'app-complaints',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    RouterLink,
    StatusModalComponent,
  ],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css',
})
export class ComplaintsComponent implements OnInit, AfterViewInit {
  complaints: Complaint[] = [];
  userRole: string = '';
  userName: string = '';
  searchText: string = '';
  selectedStatus: string = 'All Complaints';
  showModal: boolean = false;
  selectedComplaint: Complaint | null = null;
  constructor(
    private complaintService: ComplaintService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (user: User) => {
        this.userRole = user.role;
        this.userName = user.username;
        this.loadComplaints();
      },
      error: (err) => console.error('Error fetching user info:', err),
    });
  }

  ngAfterViewInit() {
    this.initializeTooltips();
  }

  initializeTooltips() {
    setTimeout(() => {
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]'
      );
      tooltipTriggerList.forEach((tooltip) => new bootstrap.Tooltip(tooltip));
    }, 100);
  }

  loadComplaints(): void {
    this.complaintService.get_complaint().subscribe({
      next: (response: any) => {
        console.log(response);
        this.complaints = response;
        setTimeout(() => this.initializeTooltips(), 100);
      },
      error: (err) => console.error('Error fetching complaints:', err),
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
      id: this.selectedComplaint.id,
      status: newStatus,
    };

    this.complaintService.change_status(updatedComplaint).subscribe({
      next: () => {
        if (this.selectedComplaint) {
          this.selectedComplaint.status = newStatus;
        }
        this.loadComplaints();
        this.closeStatusModal();
      },
      error: (err) => console.error('Error updating status:', err),
    });
  }

  get filteredComplaints() {
    return this.complaints.filter((complaint) => {
      const statusMatch =
        this.selectedStatus === 'All Complaints' ||
        complaint.status === this.selectedStatus;

      const officerMatch =
        this.searchText.trim() === '' ||
        (complaint.officer?.toLowerCase() ?? '').includes(
          this.searchText.toLowerCase()
        );

      return statusMatch && officerMatch;
    });
  }

  setStatus(status: string) {
    this.selectedStatus = status;
  }

  deleteComplaint(id: number) {
    const isConfirmed = window.confirm("Are you sure you want to delete this complaint?");
    
    if (isConfirmed) {
      this.complaintService.delete_complaint(id).subscribe(
        (res) => {
          this.toastr.success("Complaint was deleted");
          this.loadComplaints();
        },
        (err) => {
          this.toastr.error(err);
        }
      );
    }
  }
  
}
