import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-txt',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './input-txt.component.html',
  styleUrls: ['./input-txt.component.css']
})
export class InputTxtComponent {
  text: string = '';
  sentiment: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  analyzeSentiment() {
    this.loading = true;
    this.sentiment = '';
    const startTime = Date.now();
    
    this.http.post<any>('http://127.0.0.1:5000/predict', { text: this.text })
      .subscribe(response => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);
        
        setTimeout(() => {
          this.sentiment = response.sentiment;
          this.loading = false;
        }, remainingTime);
      }, error => {
        console.error('Error:', error);
        this.loading = false;
      });
  }
}
