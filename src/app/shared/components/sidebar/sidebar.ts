import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  activeItem = signal('dashboard');
  isExpanded = signal(false);
  isDarkTheme = signal(false);

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }

  toggleTheme() {
    this.isDarkTheme.set(!this.isDarkTheme());
  }
}
