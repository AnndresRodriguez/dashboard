import { Component, signal } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar.component';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Main } from './shared/components/main/main';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar, Main],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('dashboard');
}
