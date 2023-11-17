import AbstractView from '../framework/view/abstract-view.js';
import { ControlButton, DATE_FORMATS } from '../const.js';
import dayjs from 'dayjs';
import { humanizeTime } from '../utils/common.js';

function createFilmCardTemplate({ comments, filmInfo, userDetails }) {
  return (
    `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo.title}</h3>
            <p class="film-card__rating">${filmInfo.totalRating.toFixed(1) }</p>
            <p class="film-card__info">
              <span class="film-card__year">${dayjs(filmInfo.release.date).format(DATE_FORMATS.MAIN)}</span>
              <span class="film-card__duration">${humanizeTime(filmInfo.duration)}</span>
              <span class="film-card__genre">${filmInfo.genre}</span>
            </p>
            <img src="./images/posters/${filmInfo.poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${filmInfo.description}</p>
            <span class="film-card__comments">${comments.length} comments</span>
          </a>
          <div class="film-card__controls">
            <button class=" ${userDetails.watchlist ? 'film-card__controls-item--active' : ''} film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class=" ${userDetails.alreadyWatched ? 'film-card__controls-item--active' : ''} film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class=" ${userDetails.favorite ? 'film-card__controls-item--active' : ''} film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`
  );
}

export default class FilmCardView extends AbstractView {
  #film = null;
  #onDetailsClick = null;
  #onWatchlistClick = null;
  #onWatchedClick = null;
  #onFavoriteClick = null;

  constructor({ film, onDetailsClick, onWatchlistClick, onWatchedClick, onFavoriteClick }) {
    super();
    this.#film = film;
    this.#onDetailsClick = onDetailsClick;
    this.#onWatchlistClick = onWatchlistClick;
    this.#onWatchedClick = onWatchedClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.addEventListener('click', this.#detailsClickHandler);
    this.element.querySelector('.film-card__controls')
      .addEventListener('click', this.#controlsClickHandler);
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #detailsClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDetailsClick?.(evt.target);
  };

  #controlsClickHandler = (evt) => {
    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }
    evt.preventDefault();
    const currentControl = evt.target.textContent.split(' ').pop();
    switch (currentControl) {
      case ControlButton.WATCHLIST:
        this.#onWatchlistClick();
        break;
      case ControlButton.HISTORY:
        this.#onWatchedClick();
        break;
      case ControlButton.FAVORITES:
        this.#onFavoriteClick();
        break;
    }
  };
}
