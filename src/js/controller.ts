import { display, tileSize } from './index';
import { Button } from './Button';

interface Controller {
  up: boolean;
  down: boolean;
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
    new Button('restart', 128, 672, 384, 128, '/images/restart.png', false),
    new Button('jump', 352, 672, 256, 128, '/images/jump.png', true),
    new Button('left', 32, 672, 128, 128, '/images/left.png', true),
    new Button('right', 192, 672, 128, 128, '/images/right.png', true)
  ],

  // buttons: [
  //   new Button('restart', 128, 672, 384, 128, '/images/restart.png', false),
  //   new Button('jump', 196, 672, 256, 128, '/images/jump.png', true)
  // ],

  testButtons: (targetTouches: Array<EventTarget>) => {
    let button: any,
      i: number,
      k: number,
      touch: any;

    for (i = controller.buttons.length - 1; i > -1; --i) {
      button = controller.buttons[i];
      button.active = false;
      controller[button.name] = false;

      for (k = targetTouches.length - 1; k > -1; --k) {
        touch = targetTouches[k];

        if (button.containsPoint((touch.clientX - display.boundingRectangle.left) * display.buffer_output_ratio, (touch.clientY - display.boundingRectangle.top) * display.buffer_output_ratio)) {
          // display.message.innerHTML = 'touches:' + targetTouches.length + '<br>- ';
          button.active = true;
          controller[button.name] = true;
          break;
        }
      }
    }
  },

  testButtonsClick: (e: any) => {

    for (let i = controller.buttons.length - 1; i > -1; --i) {
      let button = controller.buttons[i];
      button.active = false;
      controller[button.name] = false;

      let touch = e;

      if (button.containsPoint((touch.clientX - display.boundingRectangle.left), (touch.clientY - display.boundingRectangle.top))) {
        button.active = true;
        controller[button.name] = true;
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
        // controller.mouse = true;
        controller.testButtonsClick(e);
        break;
      case 'mouseup':
        // controller.mouse = false;
        controller.testButtonsClick(e);
        break;
    }
  }
};
