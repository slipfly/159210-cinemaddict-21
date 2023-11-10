import AbstractView from '../framework/view/abstract-view.js';
import { convertArrayToLine } from '../utils/popup.js';
import { DATE_FORMATS } from '../const.js';
import dayjs from 'dayjs';
import { humanizeTime } from '../utils/common.js';
import { remove } from '../framework/render.js';

function createGenresList(array) {
  return array.map((item) => (`<span class="film-details__genre">${item}</span>`)).join('');
}

function getComments(comments, commentsData) {
  return comments.map((comment) => {
    const commentInfo = commentsData.find((item) => item.id === comment);
    return (`<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${commentInfo.emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${commentInfo.comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${commentInfo.author}</span>
                <span class="film-details__comment-day">${dayjs(commentInfo.date).format(DATE_FORMATS.COMMENT)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`);
  }).join('');
}

function createPopupTemplate({ comments, filmInfo, userDetails }, commentsData) {
  return (
    `<section class="film-details">
  <div class="film-details__inner">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img
            class="film-details__poster-img"
            src="./images/posters/${filmInfo.poster}" alt="${filmInfo.title}">

          <p class="film-details__age">${filmInfo.ageRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating.toFixed(1)}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody><tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${convertArrayToLine(filmInfo.writers)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${convertArrayToLine(filmInfo.actors)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(filmInfo.release.date).format(DATE_FORMATS.POPUP)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Duration</td>
              <td class="film-details__cell">${humanizeTime(filmInfo.duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createGenresList(filmInfo.genre)}</td>
            </tr>
          </tbody></table>

          <p class="film-details__film-description">
            ${filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button"
          class="film-details__control-button
          film-details__control-button--watchlist
          ${userDetails.watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button"
          class="film-details__control-button
          film-details__control-button--watched
          ${userDetails.alreadyWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button"
          class="film-details__control-button
          film-details__control-button--favorite
          ${userDetails.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : '0'}</span></h3>

        <ul class="film-details__comments-list">
          ${getComments(comments, commentsData)}
        </ul>

        <form class="film-details__new-comment" action="" method="get">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </form>
      </section>
    </div>
  </div>
</section>`
  );
}

export default class PopupView extends AbstractView {
  #film = null;
  #commentsData = null;

  constructor({film, commentsData}){
    super();
    this.#film = film;
    this.#commentsData = commentsData;

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  get template() {
    return createPopupTemplate(this.#film, this.#commentsData);
  }

  destroy() {
    remove(this);
  }

  #closeClickHandler = (evt) => {
    if (evt.target.nodeName !== 'BUTTON') {
      return;
    }

    evt.preventDefault();

    this.element.parentNode.classList.remove('hide-overflow');

    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      this.element.parentNode.classList.remove('hide-overflow');

      this.destroy();
    }
  };
}
