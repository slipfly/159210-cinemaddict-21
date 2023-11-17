import { FilterType, UpdateType } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filter } from '../utils/filter.js';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, filmsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length
      }, {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length
      }, {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length
      }, {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilter: this.#filterModel.filter,
      onFilterTypeChange: this.#onFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #onModelEvent = () => {
    this.init();
  };

  #onFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
