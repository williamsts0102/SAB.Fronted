import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-card.component.html',
  styleUrl: './alert-card.component.css',
})
export class AlertCardComponent {
  @Input() alert: any;

  openMap(lat: string, long: string): void {
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, '_blank');
  }
}
