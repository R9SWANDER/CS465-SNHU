import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../services/user-data';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-add-user',
  standalone: true,
  styleUrl: './add-user.css',
  templateUrl: './add-user.html',
})
export class AddUser implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserData
  ) { }


  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [],
      userName: 
      [
        '', 
        [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ],
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.addForm.valid){
      this.userService.addUser(this.addForm.value)
      .subscribe( {
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['users']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }});
    }
  }

  get f() { return this.addForm.controls; }
}
