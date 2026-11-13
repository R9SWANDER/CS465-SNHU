/// Runs the overall logic for linking the trip cards and whole page


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip'; 
import { TripData } from '../services/trip-data';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication'; 
import { Subscription } from 'rxjs';


@Component({
  imports: [CommonModule, TripCard],
  selector: 'app-trip-listing',
  standalone: true,
  styleUrl: './trip-listing.css',
  templateUrl: './trip-listing.html',
  providers: [TripData] 
})

export class TripListing implements OnInit {
  
  trips!: Trip[];
  message: string = '';
  loginWatcher = false;
  private authSub!: Subscription;

  constructor(
    private tripData: TripData, 
    private router: Router,
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
    ) { 
  }

  // Navigate to add trip page
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // Build the trip listings by calling the database
  private getTripData(): void { 
    this.tripData.getTrips() 
      .subscribe({
         next: (value: any) => { 
          this.trips = value; 
          if(value.length > 0) 
          { 
            this.message = 'There are ' + value.length + ' trips available.'; 
          } 
          else{ 
            this.message = 'There were no trips retireved from the database'; 
          } 
          console.log(this.message); 

          this.cdr.detectChanges();
        }, 
        error: (error: any) => { 
          console.log('Error: ' + error); 
        } 
      }) 
  }

  // Initialize the component and get the trip data
  ngOnInit(): void {
    this.getTripData();

    // Subscribe to the authentication status to update the loginWatcher
    this.authSub = this.authenticationService
    .authStatus$
    .subscribe(status => {
      this.loginWatcher = status;
      this.cdr.detectChanges();
    });
  }

  // Check if user is logged in
  public isLoggedIn() { 
    return this.authenticationService.isLoggedIn(); 
  }
}
