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
    this._inputList = Array.from(this._form.querySelectorAll('.popup-form__input'));
    this._inputValues = {};
    this._inputValuesArray = [];

    this._inputList.forEach(input => {
      //формируем объект name: значение, link: значение
      this._inputValues[input.name.substring(input.name.indexOf('__')+2)] = input.value;
    });

    //Передаем
    this._inputValuesArray.push(this._inputValues);

    return this._inputValuesArray;
  }

  setEventListeners() {
    super.setEventListeners();
    //Обработчик формы
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault(); // отменяет стандартную отправку формы
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
