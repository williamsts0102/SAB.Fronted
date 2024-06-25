import { SignalRService } from './../../core/services/signal-r.service';
import { Component, OnInit } from '@angular/core';
import { Alerta } from '../../core/models/alerta.model';
import { AlertaService } from '../../core/services/alerta.service';
import { AlertCardComponent } from '../../shared/components/alert-card/alert-card.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-alerta-list',
  standalone: true,
  imports: [CommonModule, AlertCardComponent, HttpClientModule],
  templateUrl: './alerta-list.component.html',
  styleUrl: './alerta-list.component.css',
})
export class AlertaListComponent implements OnInit {
  alerts: Alerta[] = [];

  constructor(
    private alertaService: AlertaService,
    private SignalRService: SignalRService
  ) {}

  ngOnInit(): void {
    this.listarAlertas();
    this.startSignalRConnection();
  }

  listarAlertas(): void {
    this.alertaService.listarAlertas().subscribe(
      (data: Alerta[]) => {
        this.alerts = data;
      },
      (error) => {
        console.error('Error al obtener las alertas', error);
      }
    );
  }

  startSignalRConnection(): void {
    this.SignalRService.startConnection();
    this.SignalRService.addAlertListener((newAlert: Alerta) => {
      // Verificar si la alerta ya existe en la lista
      const exists = this.alerts.some(
        (alert) => alert.strCodAlerta === newAlert.strCodAlerta
      );
      if (!exists) {
        // Añadir la nueva alerta al principio de la lista
        this.alerts.unshift(newAlert);
      }
    });
  }
}
