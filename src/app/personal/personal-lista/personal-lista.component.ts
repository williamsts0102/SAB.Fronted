import { Component, OnInit } from '@angular/core';
import { Personal } from '../../core/models/personal.model';
import { CommonModule } from '@angular/common';
import { PersonalCardComponent } from '../../shared/components/personal-card/personal-card.component';
import { PersonalService } from '../../core/services/personal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-personal-lista',
  standalone: true,
  imports: [CommonModule, PersonalCardComponent],
  templateUrl: './personal-lista.component.html',
  styleUrl: './personal-lista.component.css',
})
export class PersonalListaComponent implements OnInit {
  personales: Personal[] = [];
  constructor(
    private route: ActivatedRoute,
    private personalService: PersonalService
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('pstrCodGrupoPersonal');
    this.listarPersonales(codigo!);
  }

  listarPersonales(codigo: string): void {
    this.personalService.listarPersonalPorGrupo(codigo).subscribe(
      (data: Personal[]) => {
        this.personales = data;
      },
      (error) => {
        console.error('Error al obtener los personales', error);
      }
    );
  }
}
