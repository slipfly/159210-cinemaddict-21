import AbstractView from '../framework/view/abstract-view.js';

function createFilterItem({name, type, count}, currentFilter) {
  const countLine = `<span class="main-navigation__item-count">${count}</span>`;
  return (`<a href="#${type.toLowerCase()}"
    class="main-navigation__item
    ${type === currentFilter ? 'main-navigation__item--active' : ''}">${name}
    ${type === 'All' ? '' : countLine}</a>`);
}

function createFilterTemplate(filters, currentFilter) {
  const filterItemsTemplate = filters
    .map((filter) => createFilterItem(filter, currentFilter))
    .join('');
  return (
    `<nav class="main-navigation">
    ${filterItemsTemplate}
  </nav>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #onFilterTypeChange = null;

  constructor({filters, currentFilter, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#onFilterTypeChange = onFilterTypeChange;


    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    if (evt.target.nodeName !== 'A') {
      return;
    }
    evt.preventDefault();
    const newFilterType = evt.target.innerText.split(' ')[0];
    this.#onFilterTypeChange?.(newFilterType);
  };
}
