import { context, size } from './index';
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
  up: false,
  down: false,
  left: false,
  right: false,
  space: false,
  leftMousePressed: false,
  rihghtMousePressed: false,

  buttons: [
    new Button('jump', 500, 450, 280, 130, 'rgba(0, 144, 240, 1)'),
    new Button('left', 20, 450, 130, 130, 'rgba(0, 144, 240, 1)'),
    new Button('right', 170, 450, 130, 130, 'rgba(0, 144, 240, 1)'),
  ],

  testButtons: (targetTouches: Array<EventTarget>) => {
    let button: any,
      i: number,
      k: number,
      touch: any,
      boundingRectangle: any;

    boundingRectangle	= context.canvas.getBoundingClientRect();

    for (i = controller.buttons.length - 1; i > -1; --i) {
      button = controller.buttons[i];
      button.active = false;
      controller[button.name] = false;

      for (k = targetTouches.length - 1; k > -1; --k) {
        touch = targetTouches[k];

        if (button.containsPoint(touch.clientX - boundingRectangle.left, touch.clientY - boundingRectangle.top)) {
          document.querySelector('p').innerHTML = 'touches:' + targetTouches.length + '<br>- ';
          button.active = true;
          controller[button.name] = true;
          break;
        }
      }
    }

    document.querySelector('p').innerHTML = 'touches: ' + targetTouches.length + '<br>- ';

    if (controller.buttons[0].active) document.querySelector('p').innerHTML += 'jump ';
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
    let rectangle = context.canvas.getBoundingClientRect();

    /**
     * Ловим клавиши
     */
    switch (e.keyCode) {
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
        controller.mouse = true;
        break;
      case 'mouseup':
        controller.mouse = false;
        break;
    }
  }
};
