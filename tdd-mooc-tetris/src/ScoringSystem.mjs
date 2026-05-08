export class ScoringSystem {
  score = 0;
  level = 1;
  lines = 0;

  linesCleared(count) {
    if (count === 1) this.score += 40 * this.level;
    if (count === 2) this.score += 100 * this.level;
    if (count === 3) this.score += 300 * this.level;
    if (count === 4) this.score += 1200 * this.level;

    this.lines += count;

    if (this.lines >= 10) {
      this.level = 2;
    }
  }
}