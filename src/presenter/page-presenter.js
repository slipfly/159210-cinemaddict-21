import { FILMS } from '../mock/films.js';
import { render } from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import FilmsCollectionView from '../view/films-collection-view.js';
import MoreButtonView from '../view/more-button-view.js';
import FilmsListView from '../view/films-list-view.js';

export default class PagePresenter {
  #header = null;
  #container = null;
  #filmsCollectionPresenter = null;

  #films = FILMS;
  #headerProfileView = new HeaderProfileView();
  #mainNavigationView = new MainNavigationView();
  #sortView = new SortView();
  #filmsView = new FilmsView();
  #filmPresenters = new Map();
  #filmsCollection = new FilmsCollectionView();
  #moreBtn = new MoreButtonView();
  #filmsList = new FilmsListView();

  constructor({ header, container }) {
    this.#header = header;
    this.#container = container;
  }

  init() {
    this.#renderPage();
  }

  #renderPage() {
    this.#renderHeaderProfile();
    this.#renderMainNavigation();
    this.#renderSortPanel();
    this.#renderFilmsContainer();

    this.#films.forEach((film) => this.#renderFilm(film));

    this.#renderMoreBtn();
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      container: this.#filmsCollection.element
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

  #renderMoreBtn() {
    render(this.#moreBtn, this.#filmsList.element);
  }
}
