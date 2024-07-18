import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropComponent } from './drag-drop/drag-drop.component'
import { PruebaComponent } from './prueba/prueba.component'
import { InputTxtComponent } from './input-txt/input-txt.component'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DragDropComponent,
    PruebaComponent,
    InputTxtComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab03-ia';
}
