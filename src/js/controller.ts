import { display, tileSize } from './index';
import { Button } from './Button';

interface Controller {
  restart: boolean;
  up: boolean;
  left: boolean;
  right: boolean;
  space: boolean;
  leftMousePressed: boolean;
  rihghtMousePressed: boolean;
  buttons: Array<Button>;
}

export let controller: any = {
  restart: false,
  up: false,
  left: false,
  right: false,
  space: false,
  leftMousePressed: false,
  rihghtMousePressed: false,

  buttons: [
    new Button('restart', 192, 272, 256, 128, '/images/restart.png', false),
    new Button('jump', 352, 672, 256, 128, '/images/jump.png', true),
    new Button('left', 32, 672, 128, 128, '/images/left.png', true),
    new Button('right', 192, 672, 128, 128, '/images/right.png', true),
    new Button('start', 192, 382, 256, 128, '/images/start.png', false)
  ],

  testButtons: (targetTouches: Array<EventTarget>) => {
    let button: any,
      i: number,
      k: number,
      touch: any;

    let ratio = Math.max(display.buffer_output_ratio, 1);

    for (i = controller.buttons.length - 1; i > -1; --i) {
      button = controller.buttons[i];
      button.active = false;
      controller[button.name] = false;

      for (k = targetTouches.length - 1; k > -1; --k) {
        touch = targetTouches[k];

        if (button.containsPoint((touch.clientX - display.boundingRectangle.left) * ratio, (touch.clientY - display.boundingRectangle.top) * ratio)) {
          button.active = true;
          controller[button.name] = true;
          break;
        }
      }
    }
  },

  testButtonsClick: (e: any) => {
    let ratio = Math.max(display.buffer_output_ratio, 1);

    for (let i = controller.buttons.length - 1; i > -1; --i) {
      let button = controller.buttons[i];
      button.active = false;
      controller[button.name] = false;

      if (button.containsPoint((e.clientX - display.boundingRectangle.left) * ratio, (e.clientY - display.boundingRectangle.top) * ratio)) {
        if (e.type === 'mousedown') {
          button.active = true;
          controller[button.name] = true;
        } else {
          button.active = false;
          controller[button.name] = false;
        }
      }
    }
  },

  touchEnd: (event: TouchEvent) => {
    event.preventDefault();
    controller.testButtons(event.targetTouches);
  },

  touchMove: (event: TouchEvent) => {
    event.preventDefault();
    controller.testButtons(event.targetTouches);
  },

  touchStart: (event: TouchEvent) => {
    event.preventDefault();
    controller.testButtons(event.targetTouches);
  },

  keyListener: (e: any): void => {
    let keyState = (e.type === 'keydown') ? true : false;
    let rectangle = display.buffer.canvas.getBoundingClientRect();

    /**
     * Ловим клавиши
     */
    switch (e.keyCode) {
      case 82: // R - reset
        controller.restart = keyState;
        break;
      case 13: // Enter - reset
        controller.restart = keyState;
        break;
      case 37:
        controller.left = keyState;
        break;
      case 39:
        controller.right = keyState;
        break;
      case 38:
        controller.up = keyState;
        break;
      case 32: // space
        controller.up = keyState;
        break;
      case 40:
        controller.down = keyState;
        break;
    }

    /**
     * Ловим мышку
     */
    switch (e.type) {
      case 'mousedown':
        controller.testButtonsClick(e);
        break;
      case 'mouseup':
        controller.testButtonsClick(e);
        break;
    }
  }
};
