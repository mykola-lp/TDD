export class ScoringSystem {
  score = 0;
  level = 1;
  lines = 0;

  points = { 1: 40, 2: 100, 3: 300, 4: 1200 };

  linesCleared(count) {
    const points = this.points[count] || 0;

    this.score += points * this.level;

    this.lines += count;
    this.level = Math.floor(this.lines / 10) + 1;
  }
}