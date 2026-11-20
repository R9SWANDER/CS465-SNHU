import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLine } from '../user-line/user-line';
import { User } from '../models/user';
import { UserData } from '../services/user-data';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [CommonModule, FormsModule, UserLine],
  selector: 'app-user-listing',
  standalone: true,
  styleUrl: './user-listing.css',
  templateUrl: './user-listing.html',
  providers: [UserData]
})

export class UserListing implements OnInit {

  users: User[] = [];
  displayedUsers: User[] = [];

  usernameFilter = '';
  sortAscending = true;

  message: string = '';
  loginWatcher = false;
  private authSub!: Subscription;

  constructor(
    private userData: UserData,
    private router: Router,
    private authenticationService: Authentication,
    private cdr: ChangeDetectorRef
  ) {}

  public Return(): void {
    this.router.navigate(['']);
  }

  private getUserData(): void {
    this.userData.getUsers()
      .subscribe({
        next: (value: any) => {
          this.users = value;

          this.applyFilters();

          if(value.length > 0)
          {
            this.message = 'There are ' + value.length + ' users available.';
          }
          else{
            this.message = 'There were no users retrieved from the database';
          }
          console.log(this.message);

          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  ngOnInit(): void {
    this.getUserData();

    this.authSub = this.authenticationService
    .authStatus$
    .subscribe(status => {
      this.loginWatcher = status;
      this.applyFilters();
      this.cdr.detectChanges();
    });
  }

  public applyFilters(): void {
    this.displayedUsers = this.users
    .filter(user =>
      user.userName
      .toLowerCase()
      .includes(this.usernameFilter.toLowerCase())
    )
    .sort((a, b) => {
      return this.sortAscending
      ? a.userName.localeCompare(b.userName)
      : b.userName.localeCompare(a.userName);
    });
  }

  public sortToggle(): void {
    this.sortAscending = !this.sortAscending;
    this.applyFilters();
  }

  public isLoggedIn() {
    console.log("Users isLoggedIn(): " + this.authenticationService.isLoggedIn())
    return this.authenticationService.isLoggedIn();
  }

  public addUser(): void {
    this.router.navigate(['add-user']);
  }
}
