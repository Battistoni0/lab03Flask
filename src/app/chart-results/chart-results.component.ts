import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-results.component.html',
  styleUrls: ['./chart-results.component.css']
})
export class ChartResultsComponent implements OnChanges {
  @Input() analysisResults: { texts: string[], sentiments: string[] } = { texts: [], sentiments: [] };

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['analysisResults'] && this.analysisResults.texts.length > 0) {
      this.createChart();
    }
  }

  createChart() {
    const positiveCount = this.analysisResults.sentiments.filter(sentiment => sentiment === 'Positive').length;
    const negativeCount = this.analysisResults.sentiments.filter(sentiment => sentiment === 'Negative').length;

    const ctx = document.getElementById('sentimentChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Positive', 'Negative'],
        datasets: [{
          label: 'Sentiment Count',
          data: [positiveCount, negativeCount],
          backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
