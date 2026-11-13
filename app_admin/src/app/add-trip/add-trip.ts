/// Runs logic to add a trip to the database ///
// -- Adds a trip to the database and returns to trip listing page -- ///


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripData } from '../services/trip-data';


@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-add-trip',
  standalone: true,
  styleUrl: './add-trip.css',
  templateUrl: './add-trip.html',
})

export class AddTrip implements OnInit { 
 addForm!: FormGroup; 
 submitted = false; 
 
 constructor( 
   private formBuilder: FormBuilder, 
   private router: Router, 
   private tripService: TripData 
 ) { } 
 
 // Initialize the form with validation rules
 ngOnInit() { 
   this.addForm = this.formBuilder.group({ 
     _id: [], 
     code: ['', Validators.required], 
     name: ['', Validators.required], 
     length: ['', Validators.required], 
     start: ['', Validators.required], 
     resort: ['', Validators.required], 
     perPerson: ['', Validators.required], 
     image: ['', Validators.required], 
     description: ['', Validators.required], 
   }) 
 } 
 
 // When form is submitted -> activate addTrip() using form data
 public onSubmit() { 
   this.submitted = true; 
   if(this.addForm.valid){ 
     this.tripService.addTrip(this.addForm.value) 
     .subscribe( { 
      next: (data: any) => { 
       console.log(data); 
       this.router.navigate(['']); 
     }, 
     error: (error: any) => {
      console.log('Error: ' + error); 
      }}); 
    } 
  } 
  // get the form short name to access the form fields 
  get f() { return this.addForm.controls; } 
}
