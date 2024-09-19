import {Component, ElementRef, EventEmitter, HostListener, inject, OnInit, Output} from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { SharedModule } from '../../shared/modules/shared.module';
import { SearchState } from '../../ngrx/search/search.state';
import * as SearchActions from '../../ngrx/search/search.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, SharedModule, RouterLink, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  subscription: Subscription[] = [];
  @Output() menuClick = new EventEmitter<void>();

  dialog = inject(MatDialog);
  profile$ = this.store.select('profile', 'isGettingProfileSuccessful');

  searchValue = '';



  constructor(
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
      search: SearchState;
    }>,
    private router: Router,
    private elementRef: ElementRef,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store
        .select('auth', 'isLoginSuccess')
        .subscribe((isLoginSuccess) => {
          if (isLoginSuccess) {
            this.dialog.closeAll();
          }
        }),
      this.store
        .select('search', 'isSearchingSuccess')
        .subscribe((isSuccess) => {
          if (isSuccess) {
            this.router.navigate(['/search']);
          }
        }),
    );
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40vw';
    dialogConfig.maxWidth = '80vw';
    dialogConfig.panelClass = 'custom-dialog-container';

    this.dialog.open(LoginComponent, dialogConfig);
  }

  isSearch = false;

  showSearch() {
    this.isSearch = !this.isSearch;
  }

  hideSearch() {
    this.isSearch = false;

  }

  onEnterPress() {
    this.store.dispatch(SearchActions.search({ query: this.searchValue }));
  }

  // Bắt sự kiện nhấp chuột trên toàn bộ trang
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    // Kiểm tra nếu click không nằm trong phần tử có ô tìm kiếm
    if (this.isSearch && !this.elementRef.nativeElement.contains(targetElement)) {
      this.hideSearch();
    }
  }


}
