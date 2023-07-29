import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TopClient } from 'src/app/models/TopClient';
import { ClientService } from 'src/app/services/client.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  topClients!: TopClient[];

  constructor(private clientService: ClientService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.clientService.getTopClients().subscribe({
      next: res => {
        this.topClients = res;
      },
      error: err => {
        this.toastr.error('Something went wrong!');
      }
    });
  }

  getImagePath(logo?: string): string | undefined {
    return logo ? `${environment.apiUrl}file/find/${logo}` : undefined;
  }

}
