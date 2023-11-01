import { render,remove } from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import FilmsCollectionView from '../view/films-collection-view.js';
import MoreButtonView from '../view/more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import PopupView from '../view/popup.js';
import { FILM_QUANT } from '../const.js';
import EmptyListView from '../view/empty-list-view.js';

export default class PagePresenter {
  #header = null;
  #container = null;
  #body = null;
  #filmsModel = null;
  #commentsModel = null;
  #moreBtn = null;

  #headerProfileView = new HeaderProfileView();
  #mainNavigationView = new MainNavigationView();
  #sortView = new SortView();
  #filmsView = new FilmsView();
  #filmPresenters = new Map();
  #filmsCollection = new FilmsCollectionView();
  #filmsList = new FilmsListView();
  #emptyListView = new EmptyListView();

  #pageFilms = [];
  #renderedFilmsCounter = FILM_QUANT;

  constructor({ header, container, body, filmsModel, commentsModel }) {
    this.#header = header;
    this.#container = container;
    this.#body = body;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  get films() {
    return this.#filmsModel.films;
  }

  init() {
    this.#pageFilms = [...this.films];

    this.#renderPage();
  }

  #renderPage() {
    this.#renderHeaderProfile();
    this.#renderMainNavigation();
    this.#renderSortPanel();
    this.#renderFilmsContainer();

    for (let i = 0; i < Math.min(this.#pageFilms.length, FILM_QUANT); i++) {
      this.#renderFilm(this.#pageFilms[i]);
    }

    if (this.#pageFilms.length > FILM_QUANT) {
      this.#moreBtn = new MoreButtonView({
        onClick: this.#onMoreButtonClick
      });
      render(this.#moreBtn, this.#filmsList.element);
    }

    if (this.#pageFilms.length === 0) {
      render(this.#emptyListView, this.#filmsView.element);
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
    render(this.#filmsList, this.#filmsView.element);
    render(this.#filmsCollection, this.#filmsList.element);
  }

  #renderHeaderProfile() {
    render(this.#headerProfileView, this.#header);
  }

  #renderMainNavigation() {
    render(this.#mainNavigationView, this.#container);
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
}
