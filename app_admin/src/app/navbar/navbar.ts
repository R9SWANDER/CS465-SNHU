/// Navbar component logic for the admin panel ///


import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../services/authentication';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  imports: [CommonModule, RouterModule],
  standalone: true,
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})

export class Navbar implements OnInit, OnDestroy { 

  loginWatcher = false;
  private authSub!: Subscription;

 
  constructor( 
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
  ) { } 
 
  // Initialize the component and subscribe to authentication status 
  ngOnInit() {

    this.authSub = this.authenticationService
    .authStatus$
    .subscribe(status => {
      this.loginWatcher = status;

      this.cdr.detectChanges();

    });


  }

  // Unsubscribe from the authentication status when the component is destroyed
  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean { 
    return this.authenticationService.isLoggedIn(); 
  } 
 
  // Logout the user and update the authentication status
  public onLogout(): void { 
    return this.authenticationService.logout(); 
  } 
 } 