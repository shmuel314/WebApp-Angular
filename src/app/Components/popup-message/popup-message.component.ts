import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-popup-message',
  imports: [ButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './popup-message.component.html',
  styleUrl: './popup-message.component.scss'
})
export class PopupMessageComponent {
  message = input.required<string>();
}
