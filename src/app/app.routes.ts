import { Routes } from '@angular/router';
import { UserListComponentComponent } from './Components/user-list-component/user-list-component.component';
import { UserDetailComponent } from './Components/user-detail-component/user-detail-component.component';
import { UserFormComponentComponent } from './Components/user-form-component/user-form-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full'},
    { path: 'users', component: UserListComponentComponent },
    { path: 'users/new', component: UserFormComponentComponent },
    { path: 'users/:id', component: UserDetailComponent },
    { path: 'users/edit/:id', component: UserFormComponentComponent },
];
