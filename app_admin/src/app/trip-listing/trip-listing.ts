import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCard } from '../trip-card/trip-card';

import { Trip } from '../models/trip'; 
import { TripData } from '../services/trip-data';

import { Router } from '@angular/router';
import { Authentication } from '../services/authentication'; 

/// NOTE ///
// ChangeDetectorRef is used to fix a bug which caused
// the view not to update on first open, or when refreshing the page
// content would only render when triggering a refresh from codebase changes
// Implementing ChangeDetectorRef fixes this issue. Everything now loads every time.

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

  constructor(
    private tripData: TripData, 
    private router: Router,
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
    ) { 
    console.log('trip-listing constructor'); 
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  private getStuff(): void { 
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

          this.cdr.detectChanges(); // Added to fix refresh bug
        }, 
        error: (error: any) => { 
          console.log('Error: ' + error); 
        } 
      }) 
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }

  public isLoggedIn() { 
    return this.authenticationService.isLoggedIn(); 
  }
}
