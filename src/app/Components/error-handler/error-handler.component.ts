import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-error-handle',
  imports: [MatIconModule, ButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-handler.component.html',
  styleUrl: './error-handler.component.scss'
})
export class ErrorHandleComponent {
  @Output() refreshClicked = new EventEmitter<void>();
}
