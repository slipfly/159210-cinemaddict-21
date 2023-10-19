import { DATE_FORMAT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import { humanizeTime } from '../utils/film-card.js';

function createFilmCards(films) {
  let cardsList = '';
  films.forEach(({ comments, filmInfo, userDetails }) => {
    cardsList += `<article class="film-card">
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
        </article>`;
  });
  return cardsList;
}

function createFilmsCollectionTemplate(films) {
  return (
    `<div class="films-list__container">
        ${createFilmCards(films)}
      </div>`
  );
}

export default class FilmsCollectionView extends AbstractView {
  #films = null;

  constructor({ films }) {
    super();
    this.#films = films;
  }

  get template() {
    return createFilmsCollectionTemplate(this.#films);
  }
}
