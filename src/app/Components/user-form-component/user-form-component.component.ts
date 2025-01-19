import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces';
import { UserService } from '../../Services/user-service.service';
import { catchError, EMPTY, filter, Observable, switchMap, tap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { ErrorHandleComponent } from "../error-handler/error-handler.component";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, ErrorHandleComponent, LoaderComponent, LoaderComponent],
  providers: [UserService],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.scss'
})
export class UserFormComponentComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private formBuilder = inject(FormBuilder);
  errorMessage = signal("");
  hasErrorLoadingData = signal(false);
  userData$!: Observable<IUser>;
  userData!: IUser;
  id!: string;
  isEditMode!: boolean;
  myForm!: FormGroup;
  idForUpdate!: number;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    if (this.id) {
      this.isEditMode = true;
      this.getUserData();
    }
    else {
      this.isEditMode = false;
      this.initForm();
    }
  }

  getUserData(): void {
    this.userService.getUser(this.id)
      .pipe(
        catchError(() => {
          this.hasErrorLoadingData.set(true);
          return EMPTY;
        })
      )
      .subscribe((data) => {
        this.userData = data;
        this.idForUpdate = data.id;
        this.initForm(data);
      })
  }

  initForm(data?: IUser): void {
    this.myForm = this.formBuilder.group({
      name: new FormControl(
        data?.name ?? '', [Validators.required]
      ),
      id: new FormControl(
        data?.id ?? '', [Validators.required, Validators.pattern(/^\d{9}$/)]
      ),
      email: new FormControl(
        data?.email ?? '', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]
      ),
      password: new FormControl(
       data?.password ?? '', [Validators.required]
      ),
    });
  }

  onSubmit(): void {
    this.isEditMode ? this.updateUser() : this.addUser();
  }

  updateUser(): void {
    const formData = this.myForm.value;
    this.errorMessage.set("");
    this.userService.updateUser(this.idForUpdate, formData)
      .pipe(
        catchError(() => {
          this.errorMessage.set("Something went wrong...");
          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.returnToHome();
      });
  }

  addUser(): void {
    this.errorMessage.set("");
    const formData = this.myForm.value;
    this.userService.getIsUserExists(formData?.email)
      .pipe(
        catchError(() => {
          this.errorMessage.set("Something went wrong...");
          return EMPTY;
        }),
        filter((isExist) => {
          if (isExist) {
            this.errorMessage.set("This user already exists");
          }
         return !isExist;
        }),
        switchMap(() => this.userService.addUser(formData))
      )
      .subscribe(() => {
        this.returnToHome();
      });
  }

  returnToHome(): void {
    this.router.navigate(["/users"]);
  }
}
