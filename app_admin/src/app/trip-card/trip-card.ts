/// Creates the individual trip cards for the admin panel ///


import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';
import { Subscription } from 'rxjs';

@Component({
  imports: [CommonModule],
  standalone: true,
  selector: 'app-trip-card',
  styleUrl: './trip-card.css',
  templateUrl: './trip-card.html',
})
export class TripCard implements OnInit {
  
  @Input('trip') trip: any;

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

  // Edit trip button router
  public editTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  // Login check router
  public isLoggedIn() { 
    return this.authenticationService.isLoggedIn(); 
  }

  // Delete trip button router
  public deleteTrip(trip: Trip): void {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['delete-trip']);
  }

}
