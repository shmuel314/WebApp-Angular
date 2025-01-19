import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private location = inject(Location);
  page: string = "";

  ngOnInit(): void {
      console.log("location is: ",this.location.path().slice(1));
      this.setPageName();
  }

  setPageName(): void {
    const path = this.location.path().slice(1);
    if (/^users\/\d+$/.test(path)) { // Matches 'users/<number>'
      this.page = "פרטי משתמש";
    } else if (/^users\/edit\/\d+$/.test(path)) { // Matches 'users/edit/<number>'
      this.page = "עריכת משתמש קיים";
    } else {
      switch (path) {
        case "users":
          this.page = "רשימת משתמשים";
          break;
        case "users/new":
          this.page = "יצירת משתמש חדש";
          break;
        default:
          this.page = "דף לא נמצא"; // Optional fallback
          break;
      }
    }
  }

}
