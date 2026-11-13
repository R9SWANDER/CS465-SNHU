/// Runs delete-trip logic ///
// -- Deletes a trip from database & returns to trip listing page -- //


import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { TripData } from '../services/trip-data'; 
import { Trip } from '../models/trip';


@Component({
  imports: [CommonModule],
  selector: 'app-delete-trip',
  styleUrl: './delete-trip.css',
  templateUrl: './delete-trip.html',
  standalone: true
})
export class DeleteTrip implements OnInit {

  message : string = '';
  trip!: Trip;

  constructor(
    private router: Router, 
    private tripData: TripData,
    private cdr: ChangeDetectorRef // needed to detect trip read for delete confirmation
  ) {}

  ngOnInit(): void {
    // Retrieve the trip code from local storage
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('DeleteTrip::ngOnInit');
    console.log('tripcode:' + tripCode);

    // Fetch trip details
    this.tripData.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          console.log('getTrip response:', value);
          this.trip = Array.isArray(value) ? value[0] : value; // Handle both array and single object responses
          console.log('Trip retrieved:', this.trip);
          if(!value)
          {
            this.message = 'No Trip Retrieved';
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error retrieving trip:', err);
          alert('Failed to retrieve trip. Please try again.');
          this.router.navigate(['']);
        }
      });

  }

  // Confirm deletion of the trip
  public confirmDelete() {
    this.tripData.deleteTrip(this.trip.code).subscribe({
      next: (value: any) => {
        console.log('Trip deleted successfully');
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error deleting trip:', err);
        alert('Failed to delete trip. Please try again.');
        this.router.navigate(['']);
      }
    });
  }

  // Triggered when the delete button is clicked
  public onDeleteClick() {
    this.confirmDelete();
  }
}
