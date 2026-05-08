export class ScoringSystem {
  score = 0;

  linesCleared(count) {
    if (count === 1) this.score += 40;
    if (count === 2) this.score += 100;
  }
}
