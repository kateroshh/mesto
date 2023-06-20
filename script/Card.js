export default class Card {
	constructor(data, selector) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
	}

  //Получение шаблона разметки
  _getElement() {
  	const galleryElement = document
      .querySelector(this._selector)
      .content
      // .querySelector('.gallery-item')
      .cloneNode(true);

    return galleryElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListenersLike();
    this._setEventListenersDelete();
    this._setEventListenersPopup();

    this._element.querySelector('.gallery-item__text').innerText = this._name;
    const itemElementImg = this._element.querySelector('.gallery-item__img');
    itemElementImg.src = this._link;
    itemElementImg.alt = this._name;

  	return this._element;
  }

  //-------------- НРАВИТСЯ ---------------
  _setEventListenersLike() {
		this._element.querySelector('.gallery-item__like').addEventListener('click', (evt) => {
			this._handleGalleryLike(evt);
		});
	}
  _handleGalleryLike(evt) {
    evt.target.classList.toggle('gallery-item__like_active');
  }

  //-------------- УДАЛИТЬ ---------------
  _setEventListenersDelete() {
		this._element.querySelector('.gallery-item__delete').addEventListener('click', (evt) => {
			this._handleGalleryDelete(evt);
		});
	}
  _handleGalleryDelete(evt) {
    evt.target.closest('.gallery-item').remove();
  }

  //--------------- POPUP ----------------
  _setEventListenersPopup() {
		this._element.querySelector('.gallery-item__img').addEventListener('click', (evt) => {
			this._handleGalleryPhoto(evt);
		});
	}

  _handleGalleryPhoto(event) {
    imgPhoto.src = event.target.src;
    imgPhoto.alt = event.target.alt;
    descriptionTextPhoto.textContent = event.target.alt;

    this._openPopup(popupPhoto);
  }

  //Функция открытия модального окна
  _openPopup (popup) {
    popup.classList.add('popup_opened');

    this._setEventListenerClosePopupEsc(popupPhoto);
    this._setEventListenerClosePopupClick(popupPhoto);
    this._setEventListenerCloseButton(popupPhoto);
  }

  //Закрытие модального окна
  _handleClosePopup (popup) {
    popup.classList.remove('popup_opened');

    popup.removeEventListener('click', this._closePopupOverlay);
  }

  //Закрытие на крестик
  _setEventListenerCloseButton(popup) {
    popup.addEventListener('click', this._handleClosePopup.bind(this, popupPhoto));
  }


  //Функция закрытие модельного окна при клике на оверлей
  _closePopupOverlay = (evt) => {
    if(evt.target === evt.currentTarget) {
      this._handleClosePopup(evt.target);
    }
  }

  //Слушатель на закрытие
  _setEventListenerClosePopupClick(popup) {
    popup.addEventListener('click', this._closePopupOverlay);
  }

  //Функция закрытие модельного окна при нажатие Esc
  _closePopupEsc = (evt) => {
    const openedPopup = document.querySelector('.popup_opened');

    if (evt.code === "Escape" && openedPopup) {
      this._handleClosePopup(openedPopup);
    }
  }

  //Слушатель на закрытие
  _setEventListenerClosePopupEsc () {
    document.addEventListener('keydown', this._closePopupEsc);
  }


}
