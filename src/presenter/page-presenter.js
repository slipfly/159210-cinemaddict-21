import { FILMS } from '../const.js';
import { render } from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
import MainNavigationView from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';

export default class PagePresenter {
  #header = null;
  #container = null;

  #headerProfile = new HeaderProfileView();
  #mainNavigation = new MainNavigationView();
  #sort = new SortView();
  #films = new FilmsView({
    films: FILMS
  });

  constructor({ header, container }) {
    this.#header = header;
    this.#container = container;
  }

  init() {
    this.#films.init();
    render(this.#headerProfile, this.#header);
    render(this.#mainNavigation, this.#container);
    render(this.#sort, this.#container);
    render(this.#films, this.#container);
  }
}
