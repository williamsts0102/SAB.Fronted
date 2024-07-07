import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alerta } from '../../core/models/alerta.model';
import { GruposPersonalesActivos } from '../../core/models/grupospersonalesactivos.model';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '../../core/services/alerta.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  GoogleMap,
  MapDirectionsRenderer,
  MapDirectionsService,
  MapMarker,
} from '@angular/google-maps';

declare const google: any;
@Component({
  selector: 'app-alerta-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GoogleMap,
    MapMarker,
    MapDirectionsRenderer,
  ],
  templateUrl: './alerta-detail.component.html',
  styleUrls: ['./alerta-detail.component.css'],
})
export class AlertaDetailComponent {
  alerta: Alerta | null = null;
  gruposPersonalesActivos: GruposPersonalesActivos[] = [];
  selectedGrupoPersonal: number | null = null;
  map: any = null;
  mapLoaded = false;
  latitud: number | null = null;
  longitud: number | null = null;
  originMarker: MapMarker | null = null;
  destinationMarker: MapMarker | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('strCodAlerta');
    if (codigo) {
      this.alertaService.detalleAlerta(codigo).subscribe((alerta) => {
        this.alerta = alerta;
        if (this.alerta && this.alerta.strLatitud && this.alerta.strLongitud) {
          this.latitud = parseFloat(this.alerta.strLatitud);
          this.longitud = parseFloat(this.alerta.strLongitud);
          // Create origin marker on map initialization
          this.createOriginMarker();
          // Create destination marker based on alerta data
          this.createDestinationMarker();
        }
        if (this.alerta && this.alerta.bitEstado) {
          this.alertaService
            .obtenerGruposPersonalesActivos()
            .subscribe((grupos) => {
              this.gruposPersonalesActivos = grupos;
            });
        }
      });
    }
  }
  descartarAlerta(): void {
    if (this.alerta) {
      this.alertaService
        .descartarAlerta(this.alerta.strCodAlerta)
        .subscribe(() => {
          this.alerta!.bitEstado = false;
        });
    }
  }

  actualizarAlerta(): void {
    if (this.alerta && this.selectedGrupoPersonal) {
      this.alertaService
        .actualizarAlerta(this.selectedGrupoPersonal, this.alerta.strCodAlerta)
        .subscribe(() => {
          this.alerta!.bitEstado = false;
        });
    }
  }

  zoom = 13;
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      console.log(event.latLng.toJSON());
    }
  }

  createOriginMarker() {
    if (this.map) {
      this.originMarker = new google.maps.Marker({
        position: { lat: 1, lng: 2 }, // Fixed origin
        map: this.map,
        label: 'Origen',
      });
    }
  }

  createDestinationMarker() {
    if (this.map && this.latitud && this.longitud) {
      this.destinationMarker = new google.maps.Marker({
        position: { lat: this.latitud, lng: this.longitud },
        map: this.map,
        label: 'Destino',
      });
    }
  }
}
