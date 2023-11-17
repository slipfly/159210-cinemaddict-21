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

const ControlButton = {
  WATCHLIST: 'watchlist',
  HISTORY: 'watched',
  FAVORITES: 'favorite'
};

const DEFAULT_FILTER = 'All movies';

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
};

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_FILM: 'ADD_FILM',
  DELETE_FILM: 'DELETE_FILM',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

export {
  DATE_FORMATS,
  Time,
  FILM_QUANT,
  FilterType,
  FilterParameter,
  DEFAULT_FILTER,
  UpdateType,
  SortType,
  ControlButton,
  UserAction,
  Mode
};
