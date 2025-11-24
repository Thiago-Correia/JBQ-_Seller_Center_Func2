import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { CommonModule } from '@angular/common';
//import { ProdutosComponent } from './produtos/produtos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    //CommonModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('jbq_func2');
}