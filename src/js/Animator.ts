/**
 * Аниматор спрайтов
 */
import { context } from './index';

export class Animator {
  count: number;
  delay: number;
  frame: number;
  frameHeight: number;
  frameIndex: number;
  frameSet: any;

  constructor (frameSet: any, delay: number) {
    this.count = 0; // сколько циклов прошло с предыдущего кадра
    this.delay = delay; // сколько циклов надо пропустить
    this.frame = 0; // The value in the sprite sheet of the sprite image / tile to display.
    this.frameIndex = 0;// The frame's index in the current animation frame set.
    this.frameSet = frameSet;// The current animation frame set that holds sprite tile values.
  }

  /* This changes the current animation frame set. For example, if the current
    set is [0, 1], and the new set is [2, 3], it changes the set to [2, 3]. It also
    sets the delay. */
  change = function (frameSet: any, delay: number = 15) {
    if (this.frameSet !== frameSet) {// If the frame set is different:
      this.count = 0;// Reset the count.
      this.delay = delay;// Set the delay.
      this.frameIndex = 0;// Start at the first frame in the new frame set.
      this.frameSet = frameSet;// Set the new frame set.
      this.frame = this.frameSet[this.frameIndex];// Set the new frame value.
    }
  };

  /* Call this on each game cycle. */
  update = function () {
    this.count++;// Keep track of how many cycles have passed since the last frame change.

    if (this.count >= this.delay) {// If enough cycles have passed, we change the frame.
      this.count = 0;// Reset the count.
      /* If the frame index is on the last value in the frame set, reset to 0.
      If the frame index is not on the last value, just add 1 to it. */
      this.frameIndex = (this.frameIndex === this.frameSet.length - 1) ? 0 : this.frameIndex + 1;
      this.frame = this.frameSet[this.frameIndex];// Change the current frame value.
    }
  };
}
