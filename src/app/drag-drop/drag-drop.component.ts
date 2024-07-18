import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  files: File[] = [];
  isDragOver = false;
  csvContent: string[][] = [];
  showModal = false;
  loading = false;

  constructor(private http: HttpClient) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    if (event.dataTransfer && event.dataTransfer.files) {
      this.files = Array.from(event.dataTransfer.files);
      this.readCSV(this.files[0]);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files);
      this.readCSV(this.files[0]);
    }
  }

  readCSV(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.split('\n');
      this.csvContent = lines.map(line => line.split(','));
      this.showModal = true;
    };
    reader.readAsText(file);
  }

  analyzeCSV() {
    if (this.files.length === 0) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.files[0]);

    this.http.post<any>('http://127.0.0.1:5000/upload_csv', formData)
      .subscribe(response => {
        console.log(response);
        this.loading = false;
        this.files = [];
      }, error => {
        console.error('Error:', error);
        this.loading = false;
      });
  }

  closeModal() {
    this.showModal = false;
    this.files = [];
  }
}
