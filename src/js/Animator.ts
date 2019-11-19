/**
 * Аниматор спрайтов
 */
export class Animator {
  count: number;
  delay: number;
  frame: number;
  frameHeight: number;
  frameIndex: number;
  frameSet: Array<number>;

  constructor (frameSet: Array<number>, delay: number) {
    this.count = 0;
    this.delay = delay; // такты игры до сл кадра
    this.frame = 0;
    this.frameIndex = 0;
    this.frameSet = frameSet;
  }

  change = function (frameSet: Array<number>, delay: number = 15) {
    if (this.frameSet !== frameSet) {
      this.count = 0;
      this.delay = delay;
      this.frameIndex = 0;
      this.frameSet = frameSet;
      this.frame = this.frameSet[this.frameIndex];
    }
  };

  update = function () {
    this.count++;

    if (this.count >= this.delay) {
      this.count = 0;
      this.frameIndex = (this.frameIndex === this.frameSet.length - 1) ? 0 : this.frameIndex + 1;
      this.frame = this.frameSet[this.frameIndex];
    }
  };
}
