import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Officer } from '../../models/officer';
import { AddOfficerService } from '../../services/add-officer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-officer',
  imports: [CommonModule],
  templateUrl: './list-officer.component.html',
  styleUrl: './list-officer.component.css'
})
export class ListOfficerComponent implements OnInit{

  officers:Officer[]=[]

  constructor(private officerService:AddOfficerService, private toastr:ToastrService){
  }

  ngOnInit(): void {
      this.getOfficers();
  }
  getOfficers(){
    this.officerService.getOfficers().subscribe((res)=>{
      this.officers = res
    },
    (err)=>{
      this.toastr.error("Something went wrong");
    })
  }
}
