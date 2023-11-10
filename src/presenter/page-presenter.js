import { render,remove, RenderPosition } from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
import FilterModel from '../model/filter-model.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import FilmsCollectionView from '../view/films-collection-view.js';
import MoreButtonView from '../view/more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import PopupView from '../view/popup-view.js';
import { FILM_QUANT, FilterType, UpdateType } from '../const.js';
import EmptyListView from '../view/empty-list-view.js';
import FilterPresenter from './filter-presenter.js';
import { filter } from '../utils/filter.js';

export default class PagePresenter {
  #header = null;
  #container = null;
  #body = null;
  #filmsModel = null;
  #commentsModel = null;
  #moreBtn = null;
  #filterPresenter = null;

  #headerProfileView = new HeaderProfileView();
  #sortView = new SortView();
  #filmsView = new FilmsView();
  #filmPresenters = new Map();
  #filmsCollection = new FilmsCollectionView();
  #filmsList = new FilmsListView();
  #emptyListView = new EmptyListView();
  #filterModel = new FilterModel();
  #filterType = FilterType.ALL;

  #pageFilms = [];
  #renderedFilmsCounter = FILM_QUANT;

  constructor({ header, container, body, filmsModel, commentsModel }) {
    this.#header = header;
    this.#container = container;
    this.#body = body;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;

    this.#filterModel.addObserver(this.#onModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    return filteredFilms;
  }

  init() {
    this.#pageFilms = [...this.films];

    this.#renderPage();
  }

  #renderPage() {
    this.#renderHeaderProfile();
    this.#filterPresenter = new FilterPresenter({
      filterContainer: this.#container,
      filterModel: this.#filterModel,
      filmsModel: this.#filmsModel
    });
    this.#filterPresenter.init();

    if (this.#pageFilms.length > 0) {
      this.#renderSortPanel();
      this.#renderFilmsContainer();
      this.#renderFilmsList();

      for (let i = 0; i < Math.min(this.#pageFilms.length, FILM_QUANT); i++) {
        this.#renderFilm(this.#pageFilms[i]);
      }
    } else {
      this.#renderFilmsContainer();
      render(this.#emptyListView, this.#filmsView.element, RenderPosition.AFTERBEGIN);
    }

    if (this.#pageFilms.length > FILM_QUANT) {
      this.#moreBtn = new MoreButtonView({
        onClick: this.#onMoreButtonClick
      });
      render(this.#moreBtn, this.#filmsList.element);
    }
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      container: this.#filmsCollection.element,
      onDetailsClick: this.#onFilmClick
    });

    filmPresenter.init(film);

    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilmsContainer() {
    render(this.#filmsView, this.#container);
  }

  #renderFilmsList() {
    render(this.#filmsList, this.#filmsView.element);
    render(this.#filmsCollection, this.#filmsList.element);
  }

  #renderHeaderProfile() {
    render(this.#headerProfileView, this.#header);
  }

  #renderSortPanel() {
    render(this.#sortView, this.#container);
  }

  #onFilmClick = (evt) => {
    if (evt.nodeName !== 'IMG') {
      return;
    }

    const currentTitle = evt.parentNode.children[0].innerText;

    const currentFilm = this.films.find((film) =>
      film.filmInfo.title === currentTitle);


    const popup = new PopupView({
      film: currentFilm,
      commentsData: this.#commentsModel.comments
    });

    this.#body.classList.add('hide-overflow');

    render(popup, this.#body);
  };

  #onMoreButtonClick = () => {
    this.#pageFilms
      .slice(this.#renderedFilmsCounter, this.#renderedFilmsCounter + FILM_QUANT)
      .forEach((film) => this.#renderFilm(film));
    this.#renderedFilmsCounter += FILM_QUANT;
    if (this.#renderedFilmsCounter >= this.#pageFilms.length) {
      remove(this.#moreBtn);
    }
  };

  #clearPage() {

    remove(this.#headerProfileView);
    remove(this.#filmsView);
    remove(this.#sortView);
    remove(this.#moreBtn);
  }

  #onModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderPage();
        break;

      case UpdateType.MAJOR:
        this.#clearPage({ resetSortType: true });
        this.#renderPage();
        break;

      case UpdateType.INIT:
        // this.#isLoading = false;
        // remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  };
}
