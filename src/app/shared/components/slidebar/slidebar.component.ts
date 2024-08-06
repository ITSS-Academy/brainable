import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [MaterialModule, RouterLink, NgClass],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.scss',
})
export class SlidebarComponent implements OnInit {
  navLinks = [
    {
      name: 'Home',
      route: '/home',
      icon: 'home',
    },
    {
      name: 'Library',
      route: '/library',
      icon: 'library_books',
    },
    {
      name: 'Reports',
      route: '/reports',
      icon: 'bar_chart',
    },
    {
      name: 'Profile',
      route: '/profile',
      icon: 'person',
    },
  ];

  activeLink = this.navLinks[0];

  constructor(private router: Router) {
    if (this.router.url.includes('home')) {
      this.activeLink = this.navLinks[0];
    } else if (this.router.url.includes('library')) {
      this.activeLink = this.navLinks[1];
    } else if (this.router.url.includes('reports')) {
      this.activeLink = this.navLinks[2];
    } else if (this.router.url.includes('profile')) {
      this.activeLink = this.navLinks[3];
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLinkBasedOnUrl();
      });

    this.setActiveLinkBasedOnUrl();
  }

  setActive(link: any) {
    this.activeLink = link;
    this.router.navigateByUrl(link.route).then();
  }

  setActiveLinkBasedOnUrl() {
    if (this.router.url.includes('home')) {
      this.activeLink = this.navLinks[0];
    } else if (this.router.url.includes('library')) {
      this.activeLink = this.navLinks[1];
    } else if (this.router.url.includes('reports')) {
      this.activeLink = this.navLinks[2];
    } else if (this.router.url.includes('profile')) {
      this.activeLink = this.navLinks[3];
    }
  }
}
