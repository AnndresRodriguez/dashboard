import { Component, inject, Renderer2, signal } from '@angular/core';

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
  private renderer = inject(Renderer2);

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }

  toggleTheme() {
    const isDarkTheme = this.isDarkTheme();
    this.isDarkTheme.set(!isDarkTheme);

    if (!isDarkTheme) {
      this.renderer.addClass(document.documentElement, 'dark');
      localStorage['theme'] = 'dark';
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
      localStorage['theme'] = 'light';
    }
  }
}
