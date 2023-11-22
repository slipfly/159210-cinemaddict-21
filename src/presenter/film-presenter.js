import FilmCardView from '../view/film-card-view.js';
import { remove, render, replace } from '../framework/render.js';
import { Mode } from '../const.js';


export default class FilmPresenter {
  #filmContainerComponent = null;
  #filmCardComponent = null;
  #film = null;
  #onDetailsClick = null;
  #onModeChange = null;
  #onFilmChange = null;
  #onControlClick = null;

  #mode = Mode.DEFAULT;

  constructor({ container, onDetailsClick, onFilmChange, onControlClick }) {
    this.#filmContainerComponent = container;
    this.#onDetailsClick = onDetailsClick;
    this.#onFilmChange = onFilmChange;
    this.#onControlClick = onControlClick;
  }

  init(film) {
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#film = film;
    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onDetailsClick: this.#onDetailsClick,
      onControlClick: this.#onControlClick
    });

    if (prevFilmCardComponent === null) {

      render(this.#filmCardComponent, this.#filmContainerComponent);
      return;
    }

    replace(this.#filmCardComponent, prevFilmCardComponent);

    remove(prevFilmCardComponent);
  }

  destroy() {
    remove(this.#filmCardComponent);
  }

  setSaving = () => {
  };

  setDeleting = () => {
  };

  setAborting = () => {

  };
}
