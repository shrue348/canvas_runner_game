/**
 * Возвращает рандомное число от min до max
 */
export function randomInt (min: number, max: number): number {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

/**
 * переводит градусы в радианы
 * @param num - угол поворота в градусах
 */
export function inRad (num: number) {
  return num * Math.PI / 180;
}

/*
if(Math.random() < 1 - Math.pow(.993, gameTime)) // - условие для усложнения игры
this.x += (x - this.x - screenWidth * 0.5) * 0.05; // - easing движение экрана к координате
*/