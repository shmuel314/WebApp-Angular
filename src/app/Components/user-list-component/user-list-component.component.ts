import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../Services/user-service.service';
import { IUser } from '../../interfaces';
import { catchError, EMPTY, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { Router } from '@angular/router';
import { ErrorHandleComponent } from '../error-handler/error-handler.component';
import { LoaderComponent } from '../loader/loader.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-list-component',
  standalone: true,
  imports: [AsyncPipe, ErrorHandleComponent, LoaderComponent, MatIconModule, ButtonComponent, LoaderComponent],
  providers: [UserService],
  templateUrl: './user-list-component.component.html',
  styleUrl: './user-list-component.component.scss'
})

export class UserListComponentComponent {
  // readonly addBtnIconStyle = { color: "rgb(212, 211, 245)", transform: "scale(4)" };
  readonly addBtnIconStyle: Partial<CSSStyleDeclaration> = {
    color: 'rgb(212, 211, 245)',
    transform: 'scale(4)',
    pointerEvents: 'none'
  };
  private userService = inject(UserService);
  private router = inject(Router);
  hasError = signal(false);
  showPopup = signal(false);
  users$: Observable<IUser[]> = this.getAllUsers();

  getAllUsers(): Observable<IUser[]> {
    return this.userService.getAllUsers()
      .pipe(
        catchError(() => {
          this.hasError.set(true);
          return EMPTY;
        })
      )
  }

  openUserDetails(user: IUser): void {
    this.router.navigate([`/users/${user.id}`]);
  }

  addUser(): void {
    this.router.navigate(["/users/new"]);
  }

  confirmDelete(): void {
    this.showPopup.set(true);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id)
      .pipe(
        catchError(() => {
          alert("Failed to delete the user")
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.refetchUsersList();
      });
  }

  editUser(id: number): void {
    this.router.navigate([`/users/edit/${id}`]);
  }

  refetchUsersList(): void {
    this.hasError.set(false);
    this.users$ = this.getAllUsers();
  }
}
