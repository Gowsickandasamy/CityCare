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

  constructor(
    private complaintService: ComplaintService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      area_name: ['', Validators.required],
      location_link: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      this.complaintService.createComplaint(this.complaintForm.value).subscribe(
        (res) => {
          this.toastr.success('Complaint was raised');
          this.complaintForm.reset();
        },
        (err) => {
          this.toastr.error('Something went wrong');
        }
      );
    } else {
      console.log('Form is invalid:', this.complaintForm.errors);
    }
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

  checkFilled(event: any) {
    const input = event.target;
    if (input.value) {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  }
}
