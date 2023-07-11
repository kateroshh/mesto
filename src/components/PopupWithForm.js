import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup-form');
    this._submitButton = this._popup.querySelector('.popup-form__send');
  }

  close() {
    super.close();

    this._form.reset();
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup-form__input');
    this._formValues = {};
    this._inputList.forEach(input => {this._formValues[input.name] = input.value});
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    //Обработчик формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // отменяет стандартную отправку формы
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
