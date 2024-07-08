import { Personal } from '../../../core/models/personal.model';
import { Component, Input, OnInit } from '@angular/core';
import { PersonalService } from '../../../core/services/personal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-card',
  standalone: true,
  imports: [],
  templateUrl: './personal-card.component.html',
  styleUrl: './personal-card.component.css',
})
export class PersonalCardComponent {
  @Input() personal!: Personal;
}
