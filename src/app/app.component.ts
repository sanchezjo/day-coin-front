import { Component, OnInit } from '@angular/core';
import { BtcsService } from './services/btcs/btcs.service';
import {
  Chart,
  ChartConfiguration,
  ChartDataSets,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  chart: Chart;
  isLoaded = false;
  dataRate: any[] = [];

  // ********* Data for Ng2Chart **********
  barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'BTC last 24h (from ng2Charts)',
    },
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      label: 'BTC (eur)',
      data: this.dataRate,
    },
  ];

  constructor(private btcsService: BtcsService) {
  }

  ngOnInit(): void {
    // version basée sur ng2chart
    this.showNgChart();

    // version basée sur chartjs
    this.showChart();
  }

  // Build the chart based on chartjs
  showChart(): void {
    this.btcsService.getBtcsForChart().subscribe(
      (data) => {
        // get the chart visual option
        const options = this.btcsService.getChartOption(data);

        this.setChart(options);

      },
      (error) => {

      },
    );
  }


  // Update the chart based on Ng2Chart
  showNgChart(): void {
    this.btcsService.getBtcsForChart().subscribe(
      (data) => {
        this.barChartData[0].data = data.map((row) => row.y);
        this.barChartLabels = data.map((row) =>
          row.t.toLocaleTimeString('fr-FR'),
        );

        this.isLoaded = true;
      },
      (error) => {},
    );
  }

  // Build the chart based on Chartjs
  setChart(options: ChartConfiguration): void {
    this.chart = new Chart('canvas', options);
  }
}
