import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatusMenuStore } from '../../../dashboard/ui/store/status-menu.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class Navbar {
  protected readonly menuStore = inject(StatusMenuStore);

  toggleMenu() {
    this.menuStore.toggleIsExpanded();
  }
}
