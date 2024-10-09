import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  imports: [NgClass, NgIf],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() iconUrl: string = '';
  @Input() buttonText: string = '';
  @Input() buttonAction: any = () => {};

  constructor(private authService: AuthService) {}

  public isExpanded: boolean = true;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
