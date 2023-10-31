import Observable from '../framework/observable.js';
import { Comments } from '../mock/comments.js';

export default class CommentsModel extends Observable {
  #comments = [];

  get comments() {
    return this.#comments;
  }

  init() {
    this.#comments = Comments;
  }
}
