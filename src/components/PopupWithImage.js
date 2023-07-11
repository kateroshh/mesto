import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = this._popup.querySelector('.popup__img');
    this._imgDescription = this._popup.querySelector('.popup__description');
  }

  //Открытие модального окна
  open(name, link) {
    this._img.src = link;
    this._img.alt = name;
    this._imgDescription.textContent = name;

    super.open();
  }
}
