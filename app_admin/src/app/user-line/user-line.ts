/// Creates the individual user lines for the admin panel ///


import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Authentication } from '../services/authentication';
import { Subscription } from 'rxjs';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-user-line',
  styleUrl: './user-line.css',
  templateUrl: './user-line.html',
})
export class UserLine implements OnInit {

  @Input('user') user: any;

  loginWatcher = false;
  private authSub!: Subscription;

  constructor(
    private router: Router, 
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
  ) { }
    
 // Initialize the component and subscribe to authentication status
  ngOnInit(): void {
    
    this.authSub = this.authenticationService
    .authStatus$
    .subscribe(status => {
      this.loginWatcher = status;
      this.cdr.detectChanges();
    });

  }

  // Edit user button router
  public editUser(user: User): void {
    localStorage.removeItem('userName');
    localStorage.setItem('userName', user.userName);
    this.router.navigate(['edit-user']);
  }

  // Login check router
  public isLoggedIn() { 
    return this.authenticationService.isLoggedIn(); 
  }

  // Delete user button router
  public deleteUser(user: User): void {
    localStorage.removeItem('userName');
    localStorage.setItem('userName', user.userName);
    this.router.navigate(['delete-user']);
  }
}
