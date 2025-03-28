import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-status-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './status-modal.component.html',
  styleUrl: './status-modal.component.css'
})
export class StatusModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() complaint: any; // Ensure you are passing a valid complaint object
  @Output() closeModal = new EventEmitter<void>();
  @Output() statusUpdated = new EventEmitter<string>();

  statusForm!: FormGroup; // Ensure form is initialized

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.statusForm = this.fb.group({
      status: [this.complaint?.status || 'PENDING', Validators.required] // Default status
    });
  }

  updateStatus() {
    if (this.statusForm.invalid) {
      console.error("Form is invalid");
      return;
    }

    const updatedStatus = this.statusForm.value.status;
    console.log("Updated Status:", updatedStatus); // Debugging log

    this.statusUpdated.emit(updatedStatus); // Emit status change
    this.closeModal.emit(); // Close modal
  }

  close() {
    this.closeModal.emit();
  }
}
