


import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { UserData } from '../services/user-data'; 
import { User } from '../models/user';


@Component({
  imports: [CommonModule],
  selector: 'app-delete-user',
  styleUrl: './delete-user.css',
  templateUrl: './delete-user.html',
  standalone: true
})
export class DeleteUser implements OnInit {

  message : string = '';
  user!: User;

  constructor(
    private router: Router,
    private userData: UserData,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let userName = localStorage.getItem('userName');
    if (!userName) {
      alert("Something wrong, couldn't find where I stashed userName!");
      this.router.navigate(['users']);
      return;
    }

    console.log('DeleteUser::ngOnInit');
    console.log('username:' + userName);

    this.userData.getUser(userName)
      .subscribe({
        next: (value: any) => {
          console.log('getUser response:', value);
          this.user = Array.isArray(value) ? value[0] : value;
          console.log('User retrieved:', this.user);
          if(!value)
          {
            this.message = "No User Retrieved";
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error retrieveing user:', err);
          alert('Failed to retrieve user. Please try again.');
          this.router.navigate(['users']);
        }
      });
  }

  private confirmDelete() {
    this.userData.deleteUser(this.user.userName)
    .subscribe({
      next: (value: any) => {
        console.log('User deleted successfully');
        this.router.navigate(['users']);
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('Failed to delete user. Please try again.');
        this.router.navigate(['users']);
      } 
    });
  }

  public onDeleteClick() {
    this.confirmDelete();
  }

}
