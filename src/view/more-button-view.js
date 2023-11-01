import AbstractView from '../framework/view/abstract-view.js';

function createMoreButtonTemplate() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class MoreButtonView extends AbstractView {
  #onClick = null;

  constructor({ onClick }) {
    super();
    this.#onClick = onClick;

    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createMoreButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };
}
