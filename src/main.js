import PagePresenter from './presenter/page-presenter.js';

const header = document.querySelector('header');
const content = document.querySelector('main');

const pagePresenter = new PagePresenter({
  header,
  container: content
});

pagePresenter.init();
