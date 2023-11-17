import { SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItem(type, currentSortType) {
  return (`<li>
    <a href="#"
      class="sort__button
      ${type === currentSortType ? 'sort__button--active' : ''}"
      data-type="${type}">Sort by ${type}</a>
  </li>`);
}

function createSortTemplate(currentSortType) {
  const sortTypes = Object.values(SortType)
    .map((type) => createSortItem(type, currentSortType))
    .join('');
  return (
    `<ul class="sort">
    ${sortTypes}
  </ul>`
  );
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #onSortTypeChange = null;

  constructor({ currentSortType, onSortTypeChange }) {
    super();

    this.#currentSortType = currentSortType;
    this.#onSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.nodeName !== 'A') {
      return;
    }

    evt.preventDefault();
    this.#onSortTypeChange(evt.target.dataset.type);
  };
}
