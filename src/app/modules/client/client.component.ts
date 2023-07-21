import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';

@Component({
  standalone: true,
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [CommonModule]
})
export class ClientComponent implements OnInit {

  clients: Client[] = [];

  constructor(private clientService: ClientService){ }

  ngOnInit(): void {
    this.clientService.getAll().subscribe({
      next: res => {
        this.clients = res;
      }
    })
  }  
  
}
