import { display } from './index';
import { randomInt } from './helper';

class Snowflake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.alpha = 0;

    this.reset();
  }

  reset() {
    this.x = this.randBetween(0, window.innerWidth);
    this.y = this.randBetween(0, -window.innerHeight);
    this.vx = this.randBetween(-3, 3);
    this.vy = this.randBetween(2, 5);
    this.radius = this.randBetween(1, 4);
    this.alpha = this.randBetween(0.1, 0.9);
  }

  randBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.radius > window.innerHeight) {
      this.reset();
    }
  }
}

export class Snow {
  snowflakes: Array<any>;
  width: number;
  height: number;

  constructor() {
    this.createSnowflakes();
  }

  createSnowflakes() {
    const flakes = window.innerWidth / 4;

    this.snowflakes = [];

    for (let s = 0; s < flakes; s++) {
      this.snowflakes.push(new Snowflake());
    }
  }

  drawSnow() {
    display.buffer.clearRect(0, 0, this.width, this.height);

    for (let flake of this.snowflakes) {
      flake.update();

      display.buffer.save();
      display.buffer.fillStyle = "#FFF";
      display.buffer.beginPath();
      display.buffer.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 3);
      display.buffer.closePath();
      display.buffer.globalAlpha = flake.alpha;
      display.buffer.fill();
      display.buffer.restore();
    }
  }
}
