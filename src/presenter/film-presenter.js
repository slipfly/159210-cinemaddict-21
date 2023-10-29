import FilmCardView from '../view/film-card-view.js';
import { remove, render, replace } from '../framework/render.js';


export default class FilmPresenter {
  #filmContainerComponent = null;
  #filmCardComponent = null;
  #film = null;

  constructor({ container }) {
    this.#filmContainerComponent = container;
  }

  init(film) {
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#film = film;
    this.#filmCardComponent = new FilmCardView({
      film: this.#film
    });

    if (prevFilmCardComponent === null) {

      render(this.#filmCardComponent, this.#filmContainerComponent);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }
}
