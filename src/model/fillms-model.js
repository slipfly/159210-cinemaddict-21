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
}
