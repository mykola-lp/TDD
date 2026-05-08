export class ScoringSystem {
  score = 0;

  linesCleared(count) {
    if (count === 1) this.score = 40;
  }
}
