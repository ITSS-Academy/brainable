import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-result',
  standalone: true,
  imports: [MatButton],
  templateUrl: './game-result.component.html',
  styleUrl: './game-result.component.scss',
})
export class GameResultComponent {
  constructor(private router: Router) {}

  homePage() {
    this.router.navigate(['/home']);
  }
}
