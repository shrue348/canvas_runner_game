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
