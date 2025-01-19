import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { UserService } from '../../Services/user-service.service';
import { IUser } from '../../interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { MatIconModule } from '@angular/material/icon';
import { userDetails } from '../../enums';
import { ErrorHandleComponent } from "../error-handler/error-handler.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user-detail-component',
  imports: [AsyncPipe, ButtonComponent, MatIconModule, KeyValuePipe, ErrorHandleComponent, LoaderComponent],
  standalone: true,
  providers: [UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-detail-component.component.html',
  styleUrl: './user-detail-component.component.scss'
})

export class UserDetailComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  hasError = signal(false);
  param!: string;
  userDetails$!: Observable<IUser>;

  ngOnInit(): void {
    this.param = this.route.snapshot?.paramMap?.get('id') as string;
    if (this.param) {
      this.getUserDetails()
    } else {
      this.returnToHome();
    }
  }

  getUserDetails(): void {
    this.userDetails$ = this.userService.getUser(this.param)
      .pipe(
        catchError(() => {
          this.hasError.set(true);
          return EMPTY;
        })
      )
  }

  returnToHome(): void {
    this.router.navigate(["/users"]);
  }

  editUser(id: number): void {
    this.router.navigate([`/users/edit/${id}`]);
  }
}
