import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';
import { firstValueFrom } from 'rxjs';
import { Statistic } from 'src/app/models/Statistic';
import { AffaiService } from 'src/app/services/affair.service';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: './sales-ratio.component.html'
})
export class SalesRatioComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions!: Partial<salesChartOptions>;
  chartData: {name: string, data: number[]}[] = [];

  constructor(private affairService: AffaiService) {    
    this.salesChartOptions = {
      series: [],
      chart: {
        fontFamily: 'Rubik,sans-serif',
        height: 250,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#137eff", "#6c757d"],
      stroke: {
        curve: 'smooth',
        width: '2',
      },
      grid: {
        strokeDashArray: 3,
      },
      markers: {
        size: 3
      },
      xaxis: {
        categories: this.getMonths(),
      },
      tooltip: {
        theme: 'dark'
      }
    };
   }

  async ngOnInit() {
    let statistics: Statistic[] = await firstValueFrom(this.affairService.getStatistics());
    
    this.chartData = [{
      name: 'Affaires',
      data: statistics.map(st => st.count)
    }];
  }

  getMonths(): string[] {
    let months: string[] = [];
    
    for(let i=11; i>=0; i--){
      let date = new Date();
      let current_month = date.getMonth() + 1;
      let current_year = date.getFullYear();

      let month = current_month;
      let year = current_year;

      if(current_month-i<1){
        month = current_month-i + 12;
        year = current_year - 1;
      }
      else{
        month = current_month-i;
      }
      months.push(`${month} - ${year}`);
    }

    return months;
  }

}
