import { AlertaService } from './../core/services/alerta.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ChartData,
  ChartOptions,
  ChartType,
  ChartConfiguration,
} from 'chart.js';
import { Alerta } from '../core/models/alerta.model';
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class EstadisticaComponent {
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
  };
  public barChartLabels: string[] = [
    'Casos del Mes',
    'Casos Atendidos',
    'Casos No Atendidos',
    'Casos Finalizados',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [{ data: [0, 0, 0, 0], label: 'Casos' }],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels: string[] = [
    'Casos Atendidos',
    'Casos No Atendidos',
    'Casos Finalizados',
  ];
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [{ data: [0, 0, 0] }],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(private alertaService: AlertaService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.alertaService.listarAlertas().subscribe((alertas: Alerta[]) => {
      const casosMes = alertas.length;
      const casosAtendidos = alertas.filter(
        (alerta) => alerta.bitEstado === false
      ).length;
      const casosNoAtendidos = alertas.filter(
        (alerta) => alerta.bitEstado === true
      ).length;
      const casosFinalizados = alertas.filter(
        (alerta) => alerta.bitEstado === true
      ).length;

      this.barChartData.datasets[0].data = [
        casosMes,
        casosAtendidos,
        casosNoAtendidos,
        casosFinalizados,
      ];
      this.pieChartData.datasets[0].data = [
        casosAtendidos,
        casosNoAtendidos,
        casosFinalizados,
      ];
    });
  }
}
