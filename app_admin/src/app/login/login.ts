/// Handles user login and authentication logic ///


import { ChangeDetectorRef, Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from "@angular/forms"; 
import { Router } from '@angular/router'; 
import { Authentication } from '../services/authentication'; 
import { User } from '../models/user';


@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  public formError: string = '';
  submitted = false;

  credentials = {
    userName: '',
    //email: '',
    password: ''
  };

  constructor( 
    private router: Router, 
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
  ) { } 
 
  ngOnInit(): void { 
  } 

  // When form is submitted -> activate doLogin() using form data
   public onLoginSubmit(): void { 
    this.formError = ''; 
    if (!this.credentials.password || !this.credentials.userName) { 
      console.log('LoginSubmit::Failure');
      this.formError = 'Login Failed, Redirecting...';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.router.navigateByUrl('#'); // Return to login page
        console.log('LoginFailure::Wait::' + this.formError);
      }, 1500); 
    } else { 
      this.doLogin();
    } 
  }
   // Login method to route to auhentication
   private doLogin(): void { 
    let newUser = { 
      userName: this.credentials.userName 
      //email: this.credentials.email 
    } as User; 
 
    this.authenticationService.login(newUser, 
    this.credentials.password); 

    this.router.navigate(['']);
    console.log('LoginComponent::Success');

  }

}
