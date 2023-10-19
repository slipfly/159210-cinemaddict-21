import { render } from '../framework/render.js';
import AbstractView from '../framework/view/abstract-view.js';
import FilmsCollectionView from './films-collection-view.js';
import MoreButtonView from './more-button-view.js';

function createFilmsListTemplate() {
  return (
    `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

    </section>`
  );
}

export default class FilmsListView extends AbstractView {
  #filmsCollection = null;

  #moreButton = new MoreButtonView();

  constructor({ films }) {
    super();
    this.#filmsCollection = new FilmsCollectionView({ films });
  }

  get template() {
    return createFilmsListTemplate();
  }

  init() {
    render(this.#filmsCollection, this.element);
    render(this.#moreButton, this.element);
  }
}
