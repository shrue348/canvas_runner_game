import { display } from './index';
import { randomInt } from './helper'

export class Snow {
	mp: number; // кол-во нежинок
	particles: Array<any>; // масисв снежинок
	angle: number;

  constructor () {
  	this.mp = 45,
    this.particles = [],
    this.angle = 0;

    for(var i = 0; i < this.mp; i++) {
	    this.particles.push({
	      x: randomInt(0, display.output.canvas.width * 4),
	      y: randomInt(0, display.output.canvas.height * 4),
	      r: Math.random() * 4 + 1,
	      d: Math.random() * this.mp
	    })
	  }
  }

  drawSnow = () => {
    display.buffer.fillStyle = 'rgba(255, 255, 255, 0.75)';
    display.buffer.beginPath();
    for(var i = 0; i < this.mp; i++) {
      var p = this.particles[i];
      display.buffer.moveTo(p.x, p.y);
      display.buffer.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    display.buffer.fill();
    this.updateSnow();
  } 

  updateSnow = () => {
    this.angle += 0.01;
    for(var i = 0; i < this.mp; i++) {
      var p = this.particles[i];
      p.x += Math.sin(this.angle) * 2;
      p.y += Math.cos(this.angle + p.d) + 1 + p.r / 2;
    
      if(p.x > display.output.canvas.width * 4 + 5 || p.x < -5 || p.y > display.output.canvas.height * 4) {
        if(i % 3 > 0) {
          this.particles[i] = {x: Math.random() * display.output.canvas.width * 4, y: -10, r: p.r, d: p.d};
        } else {
          if(Math.sin(this.angle) > 0) {
            this.particles[i] = {x: -5, y: Math.random() * display.output.canvas.height * 4, r: p.r, d: p.d};
          } else {
            this.particles[i] = {x: display.output.canvas.width * 4 + 5, y: Math.random() * display.output.canvas.height * 4, r: p.r, d: p.d};
          }
        }
      }
    }
  } 
}
