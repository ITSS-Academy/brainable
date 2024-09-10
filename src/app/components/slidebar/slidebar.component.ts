import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { AuthState } from '../../ngrx/auth/auth.state';
import { SharedModule } from '../../shared/modules/shared.module';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { Profile } from '../../models/profile.model';
import * as ProfileActions from '../../ngrx/profile/profile.actions';
import { GameService } from '../../services/game/game.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-slidebar',
  standalone: true,
  imports: [MaterialModule, SharedModule, RouterLink],
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
  ];

  isLogoutSuccess$ = this.store.select('auth', 'isLogoutSuccess');
  subscriptions: Subscription[] = [];
  activeLink = this.navLinks[0];
  profile!: Profile;

  dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private store: Store<{ profile: ProfileState; auth: AuthState }>,
    private gameService: GameService,
  ) {
    if (this.router.url.includes('home')) {
      this.activeLink = this.navLinks[0];
    } else if (this.router.url.includes('library')) {
      this.activeLink = this.navLinks[1];
    } else if (this.router.url.includes('reports')) {
      this.activeLink = this.navLinks[2];
    }
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLinkBasedOnUrl();
      });

    this.setActiveLinkBasedOnUrl();

    this.subscriptions.push(
      this.store.select('profile', 'profile').subscribe((profile) => {
        this.profile = profile;
      }),
    );
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
    }
  }

  signOut() {
    this.store.dispatch(AuthActions.logout());
    // this.isLogoutSuccess$.subscribe((isLogoutSuccess) => {
    //   if (isLogoutSuccess) {
    //     window.location.reload();
    //   }
    // })
    this.profile = {
      photoUrl: '',
      email: '',
      uid: '',
      fullName: '',
      quizzes: [],
    };
    this.isLogoutSuccess$.subscribe((isLogoutSuccess) => {
      if (isLogoutSuccess) {
        this.store.dispatch(ProfileActions.clearState());
      }
    });
  }

  returnToHome() {
    this.router.navigateByUrl('/home').then();
  }
}
