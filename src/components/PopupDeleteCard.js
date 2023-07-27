import Popup from './Popup';

export default class PopupDeleteCard extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup-form');
    this._submitButton = this._popup.querySelector('.popup-form__send');
  }

  open(cardId, cardElement, cardClass) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    this._cardClass = cardClass;

    super.open();
  }

  setEventListeners() {
    super.setEventListeners();

    //Обработчик формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // отменяет стандартную отправку формы
      this._submitButton.textContent = 'Удаление...';
      this._handleFormSubmit(this._cardId, this._cardElement, this._cardClass, this._submitButton);
    });
  }
}
