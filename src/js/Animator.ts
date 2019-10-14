/**
 * Animator
 */

import { context } from './index'

export class Animator {
  texture: any;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;

  constructor (texture: any, frameCount: number, frameWidth: number, frameHeight: number) {
    this.texture = texture;
    this.frameCount = frameCount;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
  }

}