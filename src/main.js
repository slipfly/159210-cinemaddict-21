import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/fillm-model.js';
import PagePresenter from './presenter/page-presenter.js';

const header = document.querySelector('header');
const content = document.querySelector('main');
const body = document.querySelector('body');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();

const pagePresenter = new PagePresenter({
  header,
  container: content,
  body,
  filmsModel,
  commentsModel
});


filmsModel.init();
commentsModel.init();
pagePresenter.init();
