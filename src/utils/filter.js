import { FilterType, FilterParameter } from '../const.js';

function filterFilms(films, parameter) {
  return films.filter(({ userDetails }) => userDetails[parameter] === true);
}

const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => filterFilms(films, FilterParameter.WATCHLIST),
  [FilterType.HISTORY]: (films) => filterFilms(films, FilterParameter.HISTORY),
  [FilterType.FAVORITES]: (films) => filterFilms(films, FilterParameter.FAVORITES)
};

export { filter };
