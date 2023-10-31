import { nanoid } from 'nanoid';

function generateRandomDate() {
  const from = new Date(2000, 0, 1);
  const to = new Date();
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const COMMENT_TEXTS = [
  'Now is the winter of our discontent',
  'Made glorious summer by this sun of York',
  'And all the clouds that lour\'d upon our house',
  'In the deep bosom of the ocean buried.',
  'Now are our brows bound with victorious wreaths;',
  'Our bruised arms hung up for monuments;',
  'Our stern alarums changed to merry meetings',
  'Our dreadful marches to delightful measures.'
];

const AUTHORS = [
  'Sonny Carney',
  'Inaaya Vincent',
  'Libby Patel',
  'Aled Dillon',
  'Justin Stafford',
  'Amie Cantrell',
  'Romeo Gordon',
  'Sian Hull',
  'Noel Conley',
  'Herbie Fuentes'
];

function getComments(count) {
  const commentsList = [];
  for(let i = 0; i < count; i++) {
    const newComment = {
      id: nanoid(),
      comment: getRandomArrayElement(COMMENT_TEXTS),
      emotion: getRandomArrayElement(EMOTIONS),
      author: getRandomArrayElement(AUTHORS),
      date: generateRandomDate()
    };
    commentsList.push(newComment);
  }
  return commentsList;
}

const Comments = getComments(20);

export { Comments };
