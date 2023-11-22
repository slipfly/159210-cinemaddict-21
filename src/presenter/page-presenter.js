import { render,remove, RenderPosition } from '../framework/render.js';
import FilmsView from '../view/films-view.js';
import HeaderProfileView from '../view/header-profile-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import FilmsCollectionView from '../view/films-collection-view.js';
import MoreButtonView from '../view/more-button-view.js';
import FilmsListView from '../view/films-list-view.js';
import PopupView from '../view/popup-view.js';
import { ControlButton, FILM_QUANT, FilterParameter, FilterType, SortType, UpdateType, UserAction } from '../const.js';
import EmptyListView from '../view/empty-list-view.js';
import { sortByDate, sortByRating } from '../utils/films.js';

export default class PagePresenter {
  #header = null;
  #container = null;
  #body = null;
  #filmsModel = null;
  #commentsModel = null;
  #moreBtn = null;
  #filterModel = null;
  #sortView = null;
  #popup = null;

  #headerProfileView = new HeaderProfileView();
  #filmsView = new FilmsView();
  #filmPresenters = new Map();
  #filmsCollection = new FilmsCollectionView();
  #filmsList = new FilmsListView();
  #emptyListView = new EmptyListView();
  #filterType = FilterType.ALL;
  #currentSortType = SortType.DEFAULT;
  #isPopup = false;

  #pageFilms = [];
  #sourcedPageFilms = [];
  #renderedFilmsCounter = FILM_QUANT;

  constructor({ header, container, body, filmsModel, commentsModel, filterModel }) {
    this.#header = header;
    this.#container = container;
    this.#body = body;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#onModelEvent);
    this.#filterModel.addObserver(this.#onModelEvent);
  }

  init() {
    this.#pageFilms = [...this.#filmsModel.films];
    this.#sourcedPageFilms = [...this.#filmsModel.films];

    this.#renderPage();
  }

  #renderPage() {
    this.#renderHeaderProfile();

    if (this.#pageFilms.length > 0) {
      this.#renderSortPanel();
      this.#renderFilmsContainer();
      this.#renderFilmsList();

      this.#renderFilms(0, Math.min(this.#pageFilms.length, FILM_QUANT));
    } else {
      this.#renderFilmsContainer();
      render(this.#emptyListView, this.#filmsView.element, RenderPosition.AFTERBEGIN);
    }

    if (this.#pageFilms.length > FILM_QUANT) {
      this.#moreBtn = new MoreButtonView({
        onClick: this.#onMoreButtonClick
      });
      render(this.#moreBtn, this.#filmsList.element);
    }
  }

  #sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this.#pageFilms.sort(sortByDate);
        break;

      case SortType.RATING:
        this.#pageFilms.sort(sortByRating);
        break;

      case SortType.DEFAULT:
      default:
        this.#pageFilms = [...this.#sourcedPageFilms];
    }

    this.#currentSortType = sortType;
  }

  #renderFilm(film) {
    const filmPresenter = new FilmPresenter({
      container: this.#filmsCollection.element,
      onDetailsClick: this.#onFilmClick,
      onFilmChange: this.#onViewAction,
      onControlClick: this.#onControlClick
    });

    filmPresenter.init(film);

    this.#filmPresenters.set(film.id, filmPresenter);
  }

  #renderFilms(from, to) {
    this.#pageFilms
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #renderFilmsContainer() {
    render(this.#filmsView, this.#container);
  }

  #renderFilmsList() {
    render(this.#filmsList, this.#filmsView.element);
    render(this.#filmsCollection, this.#filmsList.element);
  }

  #renderHeaderProfile() {
    render(this.#headerProfileView, this.#header);
  }

  #renderSortPanel() {
    this.#sortView = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#onSortTypeChange
    });

    render(this.#sortView, this.#container);
  }

  #renderPopup = (film) => {
    if (this.#isPopup === true) {
      this.#popup.destroy();
      this.#popup = null;
    }

    this.#popup = new PopupView({
      film,
      commentsData: this.#commentsModel.comments,
      onPopupClose: this.#onPopupClose,
      onControlClick: this.#onControlClick
    });

    this.#isPopup = true;

    render(this.#popup, this.#body);

    if (window.sessionStorage.getItem('popupScroll') !== '' &&
      window.sessionStorage.getItem('popupScroll') !== null &&
      window.sessionStorage.getItem('popupScroll') !== undefined) {
      this.#popup.element.scrollTop = window.sessionStorage.getItem('popupScroll');
    }

    if (window.sessionStorage.getItem('popupAvatar') !== '' &&
      window.sessionStorage.getItem('popupAvatar') !== null &&
      window.sessionStorage.getItem('popupAvatar') !== undefined) {
      this.#popup.element.querySelector('.film-details__add-emoji-label')
        .innerHTML = window.sessionStorage.getItem('popupAvatar');
    }
  };

  #onFilmClick = (evt) => {
    if (evt.nodeName !== 'IMG') {
      return;
    }

    const currentTitle = evt.parentNode.children[0].innerText;

    const currentFilm = this.#pageFilms.find((film) =>
      film.filmInfo.title === currentTitle);

    this.#renderPopup(currentFilm);

    this.#isPopup = true;

    this.#body.classList.add('hide-overflow');
  };

  #onPopupClose = () => {
    this.#isPopup = false;
  };

  #onMoreButtonClick = () => {
    this.#pageFilms
      .slice(this.#renderedFilmsCounter, this.#renderedFilmsCounter + FILM_QUANT)
      .forEach((film) => this.#renderFilm(film));
    this.#renderedFilmsCounter += FILM_QUANT;
    if (this.#renderedFilmsCounter >= this.#pageFilms.length) {
      remove(this.#moreBtn);
    }
  };

  #clearPage() {

    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();

    remove(this.#headerProfileView);
    remove(this.#filmsList);
    remove(this.#sortView);
    remove(this.#moreBtn);
  }

  #onModelEvent = (updateType, data) => {
    this.#pageFilms = [...this.#filmsModel.films];
    this.#sourcedPageFilms = [...this.#filmsModel.films];
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearPage();
        this.#renderPage();
        break;

      case UpdateType.MAJOR:
        this.#clearPage({ resetSortType: true });
        this.#renderPage();
        break;

      case UpdateType.INIT:
        // this.#isLoading = false;
        // remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  };

  #onViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmPresenters.get(update.id).setSaving();
        this.#filmsModel.updateFilm(updateType, update);
        break;

      case UserAction.ADD_FILM:
        this.#filmsModel.addFilm(updateType, update);
        break;

      case UserAction.DELETE_FILM:
        this.#filmPresenters.get(update.id).setDeleting();
        this.#filmsModel.deleteFilm(updateType, update);
        break;
    }
  };

  #onSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearPage();
    this.#renderPage();
    this.#renderedFilmsCounter = FILM_QUANT;
  };

  #onControlClick = (film, control) => {
    const key = Object.keys(ControlButton).find((btn) => ControlButton[btn] === control);
    const parameter = FilterParameter[key];
    const changedValue = !film.userDetails[parameter];
    const userDetails = { ...film.userDetails, [parameter]: changedValue };
    const updatedFilm = { ...film, userDetails };
    this.#onViewAction(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      updatedFilm
    );

    if (this.#isPopup === true) {
      this.#renderPopup(updatedFilm);
    }
  };
}
