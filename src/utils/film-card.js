import { Time } from '../const.js';

function humanizeTime(time) {
  const minutes = time % Time.MINUTES;
  let hours = (time - minutes) / Time.MINUTES;

  hours = hours > 0 ? `${hours}h` : '';

  return `${hours} ${minutes}m`;
}

export { humanizeTime };
