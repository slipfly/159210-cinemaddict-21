import AbstractView from '../framework/view/abstract-view.js';
import { DATE_FORMAT } from '../const.js';
import dayjs from 'dayjs';
import { humanizeTime } from '../utils/film-card.js';

function createFilmCardTemplate({ comments, filmInfo, userDetails }) {
  return (
    `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${filmInfo.title}</h3>
            <p class="film-card__rating">${filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${dayjs(filmInfo.release.date).format(DATE_FORMAT)}</span>
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

  constructor({ film }) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmCardTemplate(this.#film);
  }
}
