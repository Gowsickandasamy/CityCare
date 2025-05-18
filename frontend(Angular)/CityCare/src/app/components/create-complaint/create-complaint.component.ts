import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { ToastrService } from 'ngx-toastr';
import { MapComponent } from '../../components-library/map/map.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-complaint',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MapComponent],
  templateUrl: './create-complaint.component.html',
  styleUrl: './create-complaint.component.css',
})
export class CreateComplaintComponent implements OnInit {
  complaintForm!: FormGroup;
  errorMessage!: '';
  isModalOpen = false;
  complaintId: string | null = null;
  isEditMode = false; 

  title !: string
  constructor(
    private complaintService: ComplaintService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      area_name: ['', Validators.required],
      location_link: ['', Validators.required],
    });
    this.route.paramMap.subscribe((params) => {
      this.complaintId = params.get('id');
      this.isEditMode = !!this.complaintId;
  
      if (this.isEditMode) {
        this.loadComplaint();
        this.title = "Edit Complaint"
      }
      else{
        this.title = "Create Complaint"
      }
    });
  }

  loadComplaint() {
    this.complaintService.get_complaint().subscribe(
      (complaints) => {
        const complaint = complaints.find((c) => c.id === Number(this.complaintId));
        
        if (complaint) {
          this.complaintForm.patchValue(complaint);
          this.checkFilled();
        } else {
          this.toastr.error('Complaint not found');
          this.router.navigate(['/current-complaints']);
        }
      },
      (err) => {
        this.toastr.error('Failed to load complaint');
        console.error(err);
      }
    );
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      if (this.isEditMode) {
        this.updateComplaint();
      } else {
        this.createComplaint();
      }
    } else {
      console.log('Form is invalid:', this.complaintForm.errors);
    }
  }

  createComplaint() {
    this.complaintService.createComplaint(this.complaintForm.value).subscribe(
      (res) => {
        this.toastr.success('Complaint was raised');
        this.complaintForm.reset();
        this.router.navigate(['/current-complaints']);
      },
      (err) => {
        this.toastr.error('Something went wrong');
      }
    );
  }

  updateComplaint() {
    const updatedData = { id: this.complaintId, ...this.complaintForm.value };
    this.complaintService.edit_complaint(updatedData).subscribe(
      (res) => {
        this.toastr.success('Complaint updated successfully');
        this.router.navigate(['/current-complaints']);
      },
      (err) => {
        this.toastr.error('Failed to update complaint');
      }
    );
  }

  
  receiveLocationLink(locationLink: string) {
    this.complaintForm.patchValue({ location_link: locationLink });
    this.isModalOpen = false;
    const locationInput = document.getElementById('location');
    if (locationInput) {
      locationInput.classList.add('filled');
    }
  }

  openModal(event: Event) {
    event.preventDefault();
    this.isModalOpen = true;
  }

  checkFilled(event?: any) {
    const inputs = document.querySelectorAll('.input-text');
    inputs.forEach((input) => {
      if ((input as HTMLInputElement).value.trim()) {
        input.classList.add('filled');
      } else {
        input.classList.remove('filled');
      }
    });
  }  
  
}
