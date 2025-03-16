import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  Renderer2,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ButtonComponent } from '../../components-library/button/button.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddOfficerService } from '../../services/add-officer.service';
import { OfficerModalComponent } from '../../components-library/officer-modal/officer-modal.component';

@Component({
  selector: 'app-add-officer',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, OfficerModalComponent],
  templateUrl: './add-officer.component.html',
  styleUrl: './add-officer.component.css',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('1s ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AddOfficerComponent implements OnInit{

  OfficerForm!:FormGroup;
  errorMessage: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2, private fb: FormBuilder,private toastr:ToastrService, private officerService: AddOfficerService) {}

  showModal = false;

  ngOnInit(): void {
    this.OfficerForm = this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      phone_number:['',Validators.required],
      area_of_control:['',Validators.required]
    })
  }
  @ViewChildren('fadeInElement') fadeInSections!: QueryList<ElementRef>;
  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'is-visible');
          } else {
            this.renderer.removeClass(entry.target, 'is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    this.fadeInSections.forEach((section) => {
      observer.observe(section.nativeElement);
    });
  }



  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  submitOfficerForm() {
   if(this.OfficerForm.valid){
    this.officerService.addOfficer(this.OfficerForm.value).subscribe((res)=>{
      this.showModal = false;
      this.toastr.success("Successfully Added")
    },(err)=>{
      this.toastr.error("Something went wrong")
      this.showModal = false;
    })
   }
   else {
    console.log('Form is invalid:', this.OfficerForm.errors); 
  }
  }
}
