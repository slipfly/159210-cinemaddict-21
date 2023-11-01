import { nanoid } from 'nanoid';
import { Comments } from './comments';

function generateRandomDate() {
  const from = new Date(1950, 0, 1);
  const to = new Date();
  return new Date(
    from.getTime() +
    Math.random() * (to.getTime() - from.getTime()),
  );
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function getsomeComments() {
  const count = Math.floor(Math.random() * 7);
  const commentsList = [];
  while (commentsList.length < count) {
    let newComment = Comments[getRandomInteger(0, Comments.length - 1)].id;
    if (commentsList.includes(newComment)) {
      newComment = Comments[getRandomInteger(0, Comments.length - 1)].id;
    } else {
      commentsList.push(newComment);
    }
  }
  return commentsList;
}

const FILMS = [
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'The Dance of Life',
      alternativeTitle: '',
      description: 'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…',
      totalRating: 8.3,
      poster: 'the-dance-of-life.jpg',
      ageRating: 12,
      director: 'Anthony Mann',
      writers: [
        'Minnie Graham',
        'Martin Lee'
      ],
      actors: [
        'Peter Sullivan',
        'Phillip Taylor',
        'Beverly Ruiz'
      ],
      genre: ['Drama'],
      duration: 96,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Nepal'
      }
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '',
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'Sagebrush Trail',
      alternativeTitle: '',
      description: 'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant\'s narrow escap…',
      totalRating: 3.2,
      poster: 'sagebrush-trail.jpg',
      ageRating: 12,
      director: 'John Banks',
      writers: [
        'Jimmy Cunningham',
        'Robert Collins',
        'John King'
      ],
      actors: [
        'Tiffany Kelley',
        'Richard Carr',
        'Jonathan Harrison',
        'Kenneth Chavez',
        'Katherine Phillips'
      ],
      genre: ['Drama'],
      duration: 103,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Brazil'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '',
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'The Man with the Golden Arm',
      alternativeTitle: '',
      description: 'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
      totalRating: 9,
      poster: 'the-man-with-the-golden-arm.jpg',
      ageRating: 16,
      director: 'William Sanders',
      writers: [
        'Donna Brown'
      ],
      actors: [
        'Miguel Smith',
        'Richard Garcia',
        'Mary Waters'
      ],
      genre: ['Drama'],
      duration: 122,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Panama'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: generateRandomDate(),
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'Santa Claus Conquers the Martians',
      alternativeTitle: '',
      description: 'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
      totalRating: 2.3,
      poster: 'santa-claus-conquers-the-martians.jpg',
      ageRating: 16,
      director: 'Michelle Miller',
      writers: [
        'Susan Moran',
        'Eric Nguyen'
      ],
      actors: [
        'Kathleen Ingram',
        'Rebecca Carter',
        'Ruth Silva',
        'Margaret Palmer'
      ],
      genre: ['Drama'],
      duration: 109,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Estonia'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: generateRandomDate(),
      favorite: true
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'Popeye the Sailor Meets Sindbad the Sailor',
      alternativeTitle: '',
      description: 'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
      totalRating: 6.3,
      poster: 'popeye-meets-sinbad.png',
      ageRating: 3,
      director: 'Anthony Hunter',
      writers: [
        'Timothy Cooper',
        'Eric Russell',
        'Kimberly Hicks'
      ],
      actors: [],
      genre: ['Drama'],
      duration: 40,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Guatemala'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: generateRandomDate(),
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'The Dance of Life',
      alternativeTitle: '',
      description: 'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…',
      totalRating: 8.3,
      poster: 'the-dance-of-life.jpg',
      ageRating: 12,
      director: 'Anthony Mann',
      writers: [
        'Minnie Graham',
        'Martin Lee'
      ],
      actors: [
        'Peter Sullivan',
        'Phillip Taylor',
        'Beverly Ruiz'
      ],
      genre: ['Drama'],
      duration: 96,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Nepal'
      }
    },
    userDetails: {
      watchlist: true,
      alreadyWatched: false,
      watchingDate: '',
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'Sagebrush Trail',
      alternativeTitle: '',
      description: 'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant\'s narrow escap…',
      totalRating: 3.2,
      poster: 'sagebrush-trail.jpg',
      ageRating: 12,
      director: 'John Banks',
      writers: [
        'Jimmy Cunningham',
        'Robert Collins',
        'John King'
      ],
      actors: [
        'Tiffany Kelley',
        'Richard Carr',
        'Jonathan Harrison',
        'Kenneth Chavez',
        'Katherine Phillips'
      ],
      genre: ['Drama'],
      duration: 103,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Brazil'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: '',
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'The Man with the Golden Arm',
      alternativeTitle: '',
      description: 'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…',
      totalRating: 9,
      poster: 'the-man-with-the-golden-arm.jpg',
      ageRating: 16,
      director: 'William Sanders',
      writers: [
        'Donna Brown'
      ],
      actors: [
        'Miguel Smith',
        'Richard Garcia',
        'Mary Waters'
      ],
      genre: ['Drama'],
      duration: 122,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Panama'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: generateRandomDate(),
      favorite: false
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'Santa Claus Conquers the Martians',
      alternativeTitle: '',
      description: 'The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…',
      totalRating: 2.3,
      poster: 'santa-claus-conquers-the-martians.jpg',
      ageRating: 16,
      director: 'Michelle Miller',
      writers: [
        'Susan Moran',
        'Eric Nguyen'
      ],
      actors: [
        'Kathleen Ingram',
        'Rebecca Carter',
        'Ruth Silva',
        'Margaret Palmer'
      ],
      genre: ['Drama'],
      duration: 109,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Estonia'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: true,
      watchingDate: generateRandomDate(),
      favorite: true
    }
  },
  {
    id: nanoid(),
    comments: getsomeComments(),
    filmInfo: {
      title: 'Popeye the Sailor Meets Sindbad the Sailor',
      alternativeTitle: '',
      description: 'In this short, Sindbad the Sailor (presumably Bluto playing a "role") proclaims himself, in song, to be the greatest sailor, adventurer and…',
      totalRating: 6.3,
      poster: 'popeye-meets-sinbad.png',
      ageRating: 3,
      director: 'Anthony Hunter',
      writers: [
        'Timothy Cooper',
        'Eric Russell',
        'Kimberly Hicks'
      ],
      actors: [],
      genre: ['Drama'],
      duration: 40,
      release: {
        date: generateRandomDate(),
        releaseCountry: 'Guatemala'
      }
    },
    userDetails: {
      watchlist: false,
      alreadyWatched: false,
      watchingDate: generateRandomDate(),
      favorite: false
    }
  }
];

export {FILMS};
