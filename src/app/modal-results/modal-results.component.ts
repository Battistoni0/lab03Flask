import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartResultsComponent } from '../chart-results/chart-results.component';

@Component({
  selector: 'app-modal-results',
  standalone: true,
  imports: [CommonModule, ChartResultsComponent],
  templateUrl: './modal-results.component.html',
  styleUrls: ['./modal-results.component.css']
})
export class ModalResultsComponent {
  @Input() showModal: boolean = false;
  @Input() analysisResults: { texts: string[], sentiments: string[] } = { texts: [], sentiments: [] };
  @Output() closeModalEvent = new EventEmitter<void>();

  closeModal(event: MouseEvent) {
    this.closeModalEvent.emit();
  }
}
