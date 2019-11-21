/**
 * Возвращает рандомное число от min до max
 */
export function randomInt (min: number, max: number): number {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.abs(Math.round(rand));
  return rand;
}

/**
 * переводит градусы в радианы
 * @param num - угол поворота в градусах
 */
export function inRad (num: number) {
  return num * Math.PI / 180;
}

/**
 *
 */
export function timeStamp () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

/**
 * Рендерит текст с переносами
 */
export function wrapText(context: any, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}
/*
if(Math.random() < 1 - Math.pow(.993, gameTime)) // - условие для усложнения игры
this.x += (x - this.x - screenWidth * 0.5) * 0.05; // - easing движение экрана к координате
*/
