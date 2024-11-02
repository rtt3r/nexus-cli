import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [
    CommonModule
  ]
})
export class ButtonComponent {

  @Input() click? = new EventEmitter<void>();

}
