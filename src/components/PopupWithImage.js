import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popup, name, link) {
    super(popup);
    this._name = name;
    this._link = link;
    this._img = this._popup.querySelector('.popup__img');
    this._imgDescription = this._popup.querySelector('.popup__description');
  }

  //Открытие модального окна
  open() {
    this._img.src = this._link;
    this._img.alt = this._name;
    this._imgDescription.textContent = this._name;

    super.open();
  }
}
