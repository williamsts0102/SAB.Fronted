import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alerta } from '../../core/models/alerta.model';
import { GruposPersonalesActivos } from '../../core/models/grupospersonalesactivos.model';
import { ActivatedRoute } from '@angular/router';
import { AlertaService } from '../../core/services/alerta.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GoogleMapsLoaderService } from '../../core/services/google-maps-loader.service';

declare const google: any;
@Component({
  selector: 'app-alerta-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './alerta-detail.component.html',
  styleUrls: ['./alerta-detail.component.css'],
})
export class AlertaDetailComponent {
  alerta: Alerta | null = null;
  gruposPersonalesActivos: GruposPersonalesActivos[] = [];
  selectedGrupoPersonal: number | null = null;
  map: any = null;
  mapLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertaService,
    private googleMapsLoader: GoogleMapsLoaderService
  ) {}

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('strCodAlerta');
    if (codigo) {
      this.alertaService.detalleAlerta(codigo).subscribe((alerta) => {
        this.alerta = alerta;
        if (this.alerta && this.alerta.bitEstado) {
          this.alertaService
            .obtenerGruposPersonalesActivos()
            .subscribe((grupos) => {
              this.gruposPersonalesActivos = grupos;
            });
        }
        this.loadMap();
      });
    }
  }

  ngOnDestroy(): void {
    // Limpiar la instancia del mapa al salir del componente para evitar problemas de memoria
    if (this.map) {
      this.map = null;
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

  initMap(): void {
    if (this.alerta && google && !this.map) {
      const lat = parseFloat(this.alerta.strLatitud);
      const lng = parseFloat(this.alerta.strLongitud);

      if (!isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng)) {
        this.map = new google.maps.Map(document.getElementById('map')!, {
          center: { lat, lng },
          zoom: 15,
        });
        new google.maps.Marker({
          position: { lat, lng },
          map: this.map,
        });
      } else {
        console.error(
          'Invalid coordinates:',
          this.alerta.strLatitud,
          this.alerta.strLongitud
        );
      }
    }
  }

  private destroyMap(): void {
    if (this.map) {
      const mapContainer = document.getElementById('map');
      while (mapContainer && mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild);
      }
      this.map = null;
    }
  }

  loadMap(): void {
    if (!this.mapLoaded) {
      this.googleMapsLoader.load().then(() => {
        this.initMap();
        this.mapLoaded = true;
      });
    } else {
      this.initMap();
    }
  }
}
