const DATE_FORMATS = {
  MAIN: 'YYYY',
  POPUP: 'DD MMM YYYY',
  COMMENT: 'YYYY/MM/DD HH:mm'
};

const Time = {
  HOURS: 24,
  MINUTES: 60
};

const FILM_QUANT = 5;

const FilterType = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites'
};

const FilterParameter = {
  WATCHLIST: 'watchlist',
  HISTORY: 'alreadyWatched',
  FAVORITES: 'favorite'
};

const DEFAULT_FILTER = 'All movies';

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export {
  DATE_FORMATS,
  Time,
  FILM_QUANT,
  FilterType,
  FilterParameter,
  DEFAULT_FILTER,
  UpdateType
};
