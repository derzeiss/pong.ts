import { Bar } from "./Bar";

export class LowIntelligenceAIBar extends Bar {
  public static NAME = 'Low Int';

  handleInput() {
    const ball = this.game.ball;
    const ballCenter = ball.getY() + ball.getHeight() / 2;
    const selfCenter = this.getY() + this.getHeight() / 2;
    if (Math.abs(ballCenter - selfCenter) > 5) {
      // prevent ball flickering
      if (ballCenter < selfCenter) {
        this.moveUp();
      } else if (ballCenter > selfCenter) {
        this.moveDown();
      }
    }
  }
}