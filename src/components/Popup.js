export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = popup.querySelector('.popup__close');
  }

  //Открытие модального окна
  open() {
    this._popup.classList.add('popup_opened');
  }

  //Закрытие модального окна
  close() {
    this._popup.classList.remove('popup_opened');

    //Удаление слушателей событий при закрытие модального окна
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
  }

  //Закрытие модального окна при нажатие на кнопку ESC
  _handleEscClose(evt) {
    if (evt.code === "Escape") {
      this.close();
    }
  }

  //Закрытие при нажатие на область вне модального окна
  _handleOverlayClose(evt) {
    if(evt.target === evt.currentTarget) {
      this.close();
    }
  }

  //Установка слушателей событий
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }
}
