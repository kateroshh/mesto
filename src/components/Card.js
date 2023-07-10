export default class Card {
	constructor(data, selector, handleCardClick) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
	}

  //Получение шаблона разметки
  _getElement() {
  	const galleryElement = document
      .querySelector(this._selector)
      .content
      .cloneNode(true);

    return galleryElement;
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.gallery-item__text').innerText = this._name;
    const itemElementImg = this._element.querySelector('.gallery-item__img');
    itemElementImg.src = this._link;
    itemElementImg.alt = this._name;

  	return this._element;
  }

  _setEventListeners() {
    //Нравится
    this._element.querySelector('.gallery-item__like').addEventListener('click', (evt) => {
			this._handleGalleryLike(evt);
		});

    //Удаление
    this._element.querySelector('.gallery-item__delete').addEventListener('click', (evt) => {
			this._handleGalleryDelete(evt);
		});

    //Popup картинка
    this._element.querySelector('.gallery-item__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
	}

  //-------------- НРАВИТСЯ ---------------
  _handleGalleryLike(evt) {
    evt.target.classList.toggle('gallery-item__like_active');
  }

  //-------------- УДАЛИТЬ ---------------
  _handleGalleryDelete(evt) {
    evt.target.closest('.gallery-item').remove();
  }
}
