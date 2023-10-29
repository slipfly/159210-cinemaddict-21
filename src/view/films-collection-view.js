import AbstractView from '../framework/view/abstract-view.js';

function createFilmsCollectionTemplate() {
  return (
    `<div class="films-list__container">

      </div>`
  );
}

export default class FilmsCollectionView extends AbstractView {

  get template() {
    return createFilmsCollectionTemplate();
  }
}
