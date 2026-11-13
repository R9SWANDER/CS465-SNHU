/// Runs logic to edit a trip in the database ///
// -- Edits a trip in the database and returns to trip listing page -- ///


import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"; 
import { TripData } from '../services/trip-data'; 
import { Trip } from '../models/trip';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-edit-trip',
  styleUrl: './edit-trip.css',
  templateUrl: './edit-trip.html',
})

export class EditTrip implements OnInit {

  editForm!: FormGroup; 
  trip!: Trip; 
  submitted = false; 
  message : string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    // Retrieve the trip code from local storage
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    // Initialize the form with validation rules
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch trip details and populate the form with current trip values
    this.tripData.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = Array.isArray(value) ? value[0] : value;

          if (this.trip.start) {
            // Convert the start date to format YYYY-MM-DD
            this.trip.start = this.trip.start.substring(0, 10); 
          }

          this.editForm.patchValue(value[0]);
          if(!value)
          {
            this.message = 'No Trip Retrieved';
          }
          else{
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // When form is submitted -> activate updateTrip() using form data
   public onSubmit() { 

    this.submitted = true; 
 
    if(this.editForm.valid) 
    { 
      this.tripData.updateTrip(this.editForm.value) 
      .subscribe({
        next: (value: any) => { 
          console.log(value); 
          this.router.navigate(['']); 
        }, 
        error: (error: any) => { 
          console.log('Error: ' + error); 
        } 
      }) 
    } 
  }

  // get the form short name to access the form fields 
  get f() { return this.editForm.controls; }
}
