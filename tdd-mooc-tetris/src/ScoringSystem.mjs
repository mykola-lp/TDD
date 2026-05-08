export class ScoringSystem {
  score = 0;
  level = 1;

  linesCleared(count) {
    if (count === 1) this.score += 40;
    if (count === 2) this.score += 100;
    if (count === 3) this.score += 300;
    if (count === 4) this.score += 1200;
  }
}
