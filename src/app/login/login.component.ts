import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  warning: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.user.password || !this.user.userName) {
      this.warning = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.authService.login(this.user).subscribe({
      next: (data) => {
        this.loading = false;
        localStorage.setItem('access_token', data.token);
        this.router.navigate(['/newReleases']);
      },
      complete: () => {
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.warning = err.error.message;
      },
    });
  }
}
