import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-officer-modal',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './officer-modal.component.html',
  styleUrl: './officer-modal.component.css',
})
export class OfficerModalComponent {
  @Input() header!: string; // Header text for the modal
  @Input() formGroup!: FormGroup; // FormGroup to handle the form data
  @Input() showModal = false; // Boolean to toggle modal visibility
  @Output() closeModal = new EventEmitter<void>(); // Event emitter to close the modal
  @Output() formSubmit = new EventEmitter<void>(); // New EventEmitter for form submission

  close() {
    this.closeModal.emit();
  }

  submitForm() {
    if (this.formGroup.valid) {
      this.formSubmit.emit();
      this.close(); // Optionally close the modal after submitting
    }
  }
}
