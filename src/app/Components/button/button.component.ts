import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule, NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {

  iconStyle = input<Partial<CSSStyleDeclaration>>({})
  text = input<string>();
  type = input<string>();
  icon = input<string>();
  disabled = input<boolean>(false);

  @Output() onButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.onButtonClicked.emit(event);
  }



}
