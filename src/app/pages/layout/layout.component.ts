import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlidebarComponent } from '../../components/slidebar/slidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SlidebarComponent,
    HeaderComponent,
    MaterialModule,
    NgClass,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  isSlideBarVisible = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const slideBar = document.querySelector('.slide-bar');
    const menuIcon = document.querySelector('.menu-icon');
    if (
      slideBar &&
      !slideBar.contains(event.target as Node) &&
      menuIcon !== event.target &&
      this.isSlideBarVisible
    ) {
      this.isSlideBarVisible = false;
    }
  }

  onMenuClick(): void {
    this.isSlideBarVisible = true;
  }

  onLinkActivated(): void {
    this.isSlideBarVisible = false;
  }
}
