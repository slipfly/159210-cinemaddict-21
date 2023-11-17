import CommentsModel from './model/comments-model.js';
import FilmsModel from './model/fillms-model.js';
import PagePresenter from './presenter/page-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const header = document.querySelector('header');
const content = document.querySelector('main');
const body = document.querySelector('body');

const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filterModel = new FilterModel();

const pagePresenter = new PagePresenter({
  header,
  container: content,
  body,
  filmsModel,
  commentsModel,
  filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: content,
  filterModel,
  filmsModel
});

filmsModel.init();
filterPresenter.init();
commentsModel.init();
pagePresenter.init();
