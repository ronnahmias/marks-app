import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.email = '';
    this.password = '';
    this.error = '';
  }
  email: string;
  password: string;
  error: string;
  loginForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    // check if user is already logged in
    if (localStorage.getItem('access-token')) {
      this.router.navigate(['/marks']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('access-token', response.token);
        this.router.navigate(['/marks']);
      },
      error: (error) => {
        this.error = error.error.message; // Display the error message in the template
      },
    });
  }
}
