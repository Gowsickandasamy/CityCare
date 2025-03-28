import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-complaint-modal',
  imports: [MapComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './complaint-modal.component.html',
  styleUrl: './complaint-modal.component.css'
})
export class ComplaintModalComponent {

  complaintForm: FormGroup;
  errorMessage!: '';
  isModalOpen = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ComplaintModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.complaintForm = this.fb.group({
      title: ['', Validators.required],
      area_name: ['', Validators.required],
      location_link: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      this.dialogRef.close(this.complaintForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
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

