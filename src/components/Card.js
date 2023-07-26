export default class Card {
	constructor(data, currentUserId, selector, handleCardClick, handleClickDelete, handleClickLike) {
    this._selector = selector;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerID = data.owner._id
    this._likes = data.likes ? data.likes.length : 0;
    this._likesArray = data.likes;
    this._isLike = false;
    this.data = data;
    this._handleCardClick = handleCardClick;
    this._handleClickDelete = handleClickDelete;
    this._handleClickLike = handleClickLike;
    this._currentUserId = currentUserId;
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

    this._getIsLike();
    this.likeItem(this._element.querySelector('.gallery-item__btnlike'));
    this._element.querySelector('.gallery-item__text').innerText = this._name;
    this._element.querySelector('.gallery-item__textlikes').innerText = this._likes;
    const itemElementImg = this._element.querySelector('.gallery-item__img');
    itemElementImg.src = this._link;
    itemElementImg.alt = this._name;

    if(this._ownerID != this._currentUserId) {
      this._element.querySelector('.gallery-item__delete').remove();
    }

  	return this._element;
  }

  _getIsLike() {
    this._likesArray.forEach(item => {
      this._isLike = item._id === this._currentUserId ? true : false;
    });
  }

  _setEventListeners() {
    //Нравится
    this._element.querySelector('.gallery-item__btnlike').addEventListener('click', (evt) => {
      this._isLike = !this._isLike;

      this._handleClickLike(this._id, this._isLike, evt.target);
		});

    //Удаление
    this._element.querySelector('.gallery-item__delete').addEventListener('click', (evt) => {
      this._handleClickDelete(this._id, evt.target.closest('.gallery-item'));
		});

    //Popup картинка
    this._element.querySelector('.gallery-item__img').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
	}

  //-------------- НРАВИТСЯ ---------------
  likeItem(item) {
    if(this._isLike) {
      item.classList.add('gallery-item__btnlike_active');
    } else {
      item.classList.remove('gallery-item__btnlike_active');
    }
  }

  setLikeCount(item, count) {
    item.closest('.gallery-item__like').querySelector('.gallery-item__textlikes').innerText = count;
  }

}
