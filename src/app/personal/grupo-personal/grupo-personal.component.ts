import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GrupoCardComponent } from '../../shared/components/grupo-card/grupo-card.component';
import { PersonalService } from '../../core/services/personal.service';
import { Grupo } from '../../core/models/grupo.model';

@Component({
  selector: 'app-grupo-personal',
  standalone: true,
  imports: [CommonModule, GrupoCardComponent],
  templateUrl: './grupo-personal.component.html',
  styleUrl: './grupo-personal.component.css',
})
export class GrupoPersonalComponent implements OnInit {
  grupos: Grupo[] = [];

  constructor(private personalService: PersonalService) {}

  ngOnInit(): void {
    this.listarGrupo();
  }

  listarGrupo(): void {
    this.personalService.listarGruposPersonales().subscribe(
      (data: Grupo[]) => {
        this.grupos = data;
      },
      (error) => {
        console.error('Error al obtener las alertas', error);
      }
    );
  }
}
