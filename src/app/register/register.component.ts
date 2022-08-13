import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = new RegisterUser();
  warning: string = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;

    if (
      !this.registerUser.userName ||
      !this.registerUser.password ||
      !this.registerUser.password2
    ) {
      this.warning = 'Please fill in all fields';
      this.loading = false;
      return;
    }

    if (this.registerUser.password !== this.registerUser.password2) {
      this.warning = 'Passwords do not match';
      this.loading = false;
      return;
    }

    this.authService.register(this.registerUser).subscribe({
      complete: () => {
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        this.warning = err.error.message;
        this.loading = false;
        this.success = false;
      },
    });
  }
}
