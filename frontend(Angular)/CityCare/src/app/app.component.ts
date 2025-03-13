import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'CityCare';
  isLoggedIn!:Observable<boolean>;

  private authService = inject(AuthService)

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn$;
  }
  
}
