// Routes the endpoints of the app_admin to the correct componenets ///


import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip';
import { Login } from './login/login';
import { DeleteTrip } from './delete-trip/delete-trip';
import { UserListing } from './user-listing/user-listing';
import { DeleteUser } from './delete-user/delete-user';
import { AddUser } from './add-user/add-user';

export const routes: Routes = [
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip', component: EditTrip },
  { path: 'delete-trip', component: DeleteTrip },
  { path: '', component: TripListing, pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'users', component: UserListing },
  { path: 'delete-user', component: DeleteUser },
  { path: 'add-user', component: AddUser }
];
