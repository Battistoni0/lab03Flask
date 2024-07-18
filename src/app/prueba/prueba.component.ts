import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalResultsComponent } from '../modal-results/modal-results.component';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ModalResultsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  files: File[] = [];
  isDragOver = false;
  loading = false;
  showModal = false;
  analysisResults: { texts: string[], sentiments: string[] } = { texts: [], sentiments: [] };

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
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files = Array.from(input.files);
      console.log('Files selected:', this.files); // Depuración
      this.resetFileInput(); // Restablecer el valor del input de tipo archivo
    }
  }

  removeFile(file: File) {
    this.files = this.files.filter(f => f !== file);
  }

  getFileTypeIcon(file: File): string {
    if (file.type === 'application/pdf') {
      return 'document-outline';
    } else if (file.type === 'text/csv') {
      return 'document-text-outline';
    } else if (file.type.startsWith('text/')) {
      return 'document-text-outline';
    } else {
      return 'document-outline'; // Default icon for unsupported types
    }
  }

  uploadFiles() {
    if (this.files.length === 0) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    this.files.forEach(file => formData.append('file', file));

    this.http.post<{ texts: string[], sentiments: string[] }>('http://127.0.0.1:5000/upload_files', formData)
      .subscribe(response => {
        this.loading = false;
        this.analysisResults = response;
        this.showModal = true;
      }, error => {
        console.error('Error:', error);
        this.loading = false;
      });
  }

  closeModal() {
    this.showModal = false;
    this.analysisResults = { texts: [], sentiments: [] }; // Restablecer resultados de análisis
    this.files = [];  // Limpiar archivos seleccionados después de cerrar el modal
    this.isDragOver = false;
    this.resetFileInput(); // Restablecer el valor del input de tipo archivo al cerrar el modal
  }

  private resetFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
