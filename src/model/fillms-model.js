import Observable from '../framework/observable.js';
import { FILMS } from '../mock/films.js';

export default class FilmsModel extends Observable {
  #films = [];

  get films() {
    return this.#films;
  }

  init() {
    this.#films = FILMS;
  }

  updateFilm(updateType, update) {
    const index = this.#films.findIndex((film) => film.id === update.id);


    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1)
    ];
    this._notify(updateType, update);
  }
}
