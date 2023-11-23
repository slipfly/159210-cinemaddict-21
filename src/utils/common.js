import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Time } from '../const.js';

dayjs.extend(relativeTime);

function humanizeTime(time) {
  const minutes = time % Time.MINUTES;
  let hours = (time - minutes) / Time.MINUTES;

  hours = hours > 0 ? `${hours}h` : '';

  return `${hours} ${minutes}m`;
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function checkHowLongAgo(date) {
  const timeAgo = dayjs(date).fromNow();

  if (timeAgo.includes('hour')) {
    return 'Today';
  }

  if (timeAgo === '1 day ago') {
    return 'Yesterday';
  }

  if (timeAgo === '2 days ago') {
    return timeAgo;
  }

  return date;
}

export { humanizeTime, updateItem, checkHowLongAgo };
