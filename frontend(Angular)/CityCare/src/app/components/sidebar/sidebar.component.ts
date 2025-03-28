import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatListModule, RouterOutlet, FooterComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  userRole!: string | null;
  user!:User;
  private authService = inject(AuthService);
  private router = inject(Router);
  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.authService.getUserInfo().subscribe(
      (res)=>{
        this.user = res
      },
      (err)=>{
        console.log("Something went wrong")
      })
    
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Logout Failed:', err)
    });
  }

  isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  isUser():boolean{
    return this.user?.role === 'USER';
  }
}
