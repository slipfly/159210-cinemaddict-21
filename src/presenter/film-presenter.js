import FilmCardView from '../view/film-card-view.js';
import { remove, render, replace } from '../framework/render.js';
import { UpdateType, UserAction, Mode } from '../const.js';


export default class FilmPresenter {
  #filmContainerComponent = null;
  #filmCardComponent = null;
  #film = null;
  #onDetailsClick = null;
  #onModeChange = null;
  #onFilmChange = null;

  #mode = Mode.DEFAULT;

  constructor({ container, onDetailsClick, onFilmChange }) {
    this.#filmContainerComponent = container;
    this.#onDetailsClick = onDetailsClick;
    this.#onFilmChange = onFilmChange;
  }

  init(film) {
    const prevFilmCardComponent = this.#filmCardComponent;

    this.#film = film;
    this.#filmCardComponent = new FilmCardView({
      film: this.#film,
      onDetailsClick: this.#onDetailsClick,
      onWatchlistClick: this.#onWatchlistClick,
      onWatchedClick: this.#onWatchedClick,
      onFavoriteClick: this.#onFavoriteClick
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

  #onWatchlistClick = () => {
    const watchlist = !this.#film.userDetails.watchlist;
    const userDetails = {...this.#film.userDetails, watchlist};
    this.#onFilmChange(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      { ...this.#film, userDetails}
    );
  };

  #onWatchedClick = () => {
    const alreadyWatched = !this.#film.userDetails.alreadyWatched;
    const userDetails = { ...this.#film.userDetails, alreadyWatched };
    this.#onFilmChange(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      { ...this.#film, userDetails }
    );
  };

  #onFavoriteClick = () => {
    const favorite = !this.#film.userDetails.favorite;
    const userDetails = { ...this.#film.userDetails, favorite };
    this.#onFilmChange(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      { ...this.#film, userDetails }
    );
  };
}
