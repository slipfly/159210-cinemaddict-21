import { Time } from '../const.js';

function humanizeTime(time) {
  const minutes = time % Time.MINUTES;
  let hours = (time - minutes) / Time.MINUTES;

  hours = hours > 0 ? `${hours}h` : '';

  return `${hours} ${minutes}m`;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { humanizeTime, updateItem };
