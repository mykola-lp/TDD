export function diceHandValue(die1, die2) {
  if (die1 === die2) {
    return 100 + die1;
  }

  return Math.max(die1, die2);
}
