import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import Btcs from './btcs.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BtcsService {
  URL: string;

  constructor(private http: HttpClient) {
    this.URL = environment.apiUrl;
  }

  getBtcsForChart(): Observable<any> {
    return this.http.get<any>(`${this.URL}/btcs`).pipe(
      map((res) =>
        res.data.map((btc: Btcs) => {
          return {t: new Date(btc.date), y: btc.rate_float};
        }),
      ),
      catchError((error) => throwError(error.message || error)),
    );
  }

  // Centralise options for chartjs
  getChartOption(dataInput: any[]): ChartConfiguration {
    return {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'BTC (eur)',
            data: dataInput,
            backgroundColor: 'pink',
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: 'BTC last 24h (from ChartsJs)',
        },
        responsive: true,
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              time: {
                displayFormats: {
                  minute: 'h:mm',
                },
              },
            },
          ],
        },
      },
    };
  }
}
