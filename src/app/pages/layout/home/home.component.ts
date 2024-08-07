import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { Subscription } from 'rxjs';
import { QuizState } from '../../../ngrx/quiz/quiz.state';
import * as QuizActions from '../../../ngrx/quiz/quiz.actions';
import { Quiz, QuizDTO } from '../../../models/quiz.model';
import { MaterialModule } from '../../../shared/modules/material.module';
import { FormsModule } from '@angular/forms';
import { LocalTimePipe } from '../../../shared/pipes/local-time.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, FormsModule, LocalTimePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
