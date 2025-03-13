import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatIconModule, MatListModule, RouterOutlet, FooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']  // ✅ Fixed typo here
})
export class SidebarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  private authService = inject(AuthService);
  private router = inject(Router);
  
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;  // ✅ Correctly initializes the observable
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error('Logout Failed:', err)
    });
  }
}
