import { Injectable } from '@angular/core';
import { Alerta } from '../models/alerta.model';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5134/alerthub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public addAlertListener(callback: (alert: Alerta) => void): void {
    this.hubConnection.on('ReceiveAlert', (alert: Alerta) => {
      callback(alert);
    });
  }
  constructor() {}
}
