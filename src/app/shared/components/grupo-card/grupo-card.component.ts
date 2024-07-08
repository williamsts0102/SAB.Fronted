import { Component, Input } from '@angular/core';
import { Grupo } from '../../../core/models/grupo.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grupo-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './grupo-card.component.html',
  styleUrl: './grupo-card.component.css',
})
export class GrupoCardComponent {
  @Input() grupo!: Grupo;
}
