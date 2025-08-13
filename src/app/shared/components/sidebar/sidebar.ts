import { Component, inject, Renderer2, signal } from '@angular/core';
import { DarkLightStore } from '../../../dashboard/ui/store/dark-light.store';
import { StatusMenuStore } from '../../../dashboard/ui/store/status-menu.store';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  activeItem = signal('dashboard');
  private renderer = inject(Renderer2);
  protected readonly store = inject(DarkLightStore);
  protected readonly menuStore = inject(StatusMenuStore);

  toggleSidebar() {
    this.menuStore.toggleIsExpanded();
  }

  toggleTheme() {
    this.store.toggleDarkMode();
    if (this.store.darkMode()) {
      this.renderer.addClass(document.documentElement, 'dark');
      localStorage['theme'] = 'dark';
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
      localStorage['theme'] = 'light';
    }
  }
}
