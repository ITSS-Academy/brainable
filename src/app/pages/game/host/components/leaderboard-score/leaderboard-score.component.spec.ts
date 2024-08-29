import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardScoreComponent } from './leaderboard-score.component';

describe('LeaderboardScoreComponent', () => {
  let component: LeaderboardScoreComponent;
  let fixture: ComponentFixture<LeaderboardScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderboardScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaderboardScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
