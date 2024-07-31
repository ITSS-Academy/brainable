import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { authReducer } from './ngrx/auth/auth.reducer';
import { AuthEffects } from './ngrx/auth/auth.effects';
import { provideHttpClient } from '@angular/common/http';
import { profileReducer } from './ngrx/profile/profile.reducer';
import { ProfileEffects } from './ngrx/profile/profile.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'profile', reducer: profileReducer }),
    provideEffects([AuthEffects, ProfileEffects]),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'brainable-d5919',
        appId: '1:1040011988423:web:359333ff1101fa7cdc1de2',
        storageBucket: 'brainable-d5919.appspot.com',
        apiKey: 'AIzaSyAbWdZ5bTZN_JqBXFGxFig0KlNVVWQXAqI',
        authDomain: 'brainable-d5919.firebaseapp.com',
        messagingSenderId: '1040011988423',
      }),
    ),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideHttpClient(),
  ],
};
