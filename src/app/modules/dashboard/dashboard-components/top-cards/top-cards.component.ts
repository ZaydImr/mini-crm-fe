import { Component, OnInit } from '@angular/core';
import { TopCard } from '../../../../models/TopCard'
import { ClientService } from 'src/app/services/client.service';
import { firstValueFrom } from 'rxjs';
import { AffaiService } from 'src/app/services/affair.service';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html'
})
export class TopCardsComponent implements OnInit {

  topcards: TopCard[] = [];

  constructor(private affairService: AffaiService, private contractService: ContractService, private clientService: ClientService) { }

  async ngOnInit() {
    // Affairs
    let { message } = await firstValueFrom(this.affairService.getCurrentMonthCount());
    this.topcards.push({
      bgcolor: 'success',
      icon: 'bi bi-clipboard-pulse',
      title: message,
      subtitle: 'Monthly Affairs'
    });

    message = (await firstValueFrom(this.affairService.getCurrentYearCount())).message;
    this.topcards.push({
      bgcolor: 'info',
      icon: 'bi bi-clipboard-data-fill',
      title: message,
      subtitle: 'Yearly Affairs'
    });

    // Contracts
    message = (await firstValueFrom(this.contractService.getCurrentMonthCount())).message;
    this.topcards.push({
      bgcolor: 'info',
      icon: 'bi bi-file-earmark-text-fill',
      title: message,
      subtitle: 'Monthly Contracts'
    });
    
    // Clients
    message = (await firstValueFrom(this.clientService.getCount())).message;
    this.topcards.push({
      bgcolor: 'info',
      icon: 'bi bi-people-fill',
      title: message,
      subtitle: 'Total Clients'
    });
  }

}
