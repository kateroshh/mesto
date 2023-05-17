//Исходный массив фото с подписями
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const galleryItemTemplate = document.querySelector('.gallery-item-template').content; //темплейт для карточки фото и подпись
const galleryItems = document.querySelector('.gallery-items'); //место куда добавляем карточки

const editButton = document.querySelector('.profile-info__edit'); //кнопка редактирование профиля
const nameText = document.querySelector('.profile-info__nametext'); //текстовый элемент имя
const descriptionText = document.querySelector('.profile-info__description'); //текстовый элемент описание

const popup = document.querySelector('.popup'); //модальное окно
const closeButtonEdit = document.querySelector('.popup__close_edit'); //кнопка крестик
const popupEdit = document.querySelector('.popup-edit'); //модальное окно
const formElementEdit = popupEdit.querySelector('.popup-form'); //форма редактирования профиля
const nameInputEdit = formElementEdit.querySelector('#name'); //поле редактирования имени
const descriptionInputEdit = formElementEdit.querySelector('#description'); //поле редактирования описания

const closeButtonCreate = document.querySelector('.popup__close_create'); //кнопка крестик
const createButton = document.querySelector('.profile__add'); //кнопка создание новой карточки
const popupCreate = document.querySelector('.popup-create'); //модальное окно создания карточки
const formElementCreate = popupCreate.querySelector('.popup-form'); //форма создания карточки
const titleInputCreate = formElementCreate.querySelector('#title-card'); //поле заголовка карточки
const linkInputCreate = formElementCreate.querySelector('#link-card'); //поле ссылка на картинку


//Загрузка карточек при открытие сайта
function initGallery(items) {
  items.forEach(item => {
    const itemElement = galleryItemTemplate.cloneNode(true);
    itemElement.querySelector('.gallery-item__text').innerText = item.name;
    itemElement.querySelector('.gallery-item__img').src = item.link;
    itemElement.querySelector('.gallery-item__img').alt = item.name;
    itemElement.querySelector('.gallery-item__like').addEventListener('click', handlegalleryLike);
    galleryItems.append(itemElement);
  });
}


//Закрытие модального окна
function handleClosePopup () {
  popupEdit.classList.remove('popup_opened');
  popupCreate.classList.remove('popup_opened');
}

//Функция при открытие модального окна перезает значения текстовых элементов в инпут
function handleOpenPopupEdit () {
  popupEdit.classList.add('popup_opened');
  nameInputEdit.value = nameText.textContent;
  descriptionInputEdit.value = descriptionText.textContent;
}

//Функция открытия модального окна создания карточки
function handleOpenPopupCreate () {
  popupCreate.classList.add('popup_opened');
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let nameInputNew = nameInputEdit.value;
  let descriptionInputNew = descriptionInputEdit.value;

  nameText.textContent = nameInputNew;
  descriptionText.textContent = descriptionInputNew;
  //Закрытие модального окна
  handleClosePopup();
}

//Функция создания новой карточки
function handleFormSubmitCreate (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const itemElement = galleryItemTemplate.cloneNode(true);
  itemElement.querySelector('.gallery-item__text').innerText = titleInputCreate.value;
  itemElement.querySelector('.gallery-item__img').src = linkInputCreate.value;
  itemElement.querySelector('.gallery-item__img').alt = titleInputCreate.value;
  itemElement.querySelector('.gallery-item__like').addEventListener('click', handlegalleryLike);
  galleryItems.prepend(itemElement);

  //Закрытие модального окна
  handleClosePopup();
}

//Нажатие на кнопку Нравится
function handlegalleryLike (event) {
  event.target.classList.toggle('gallery-item__like_active');
}



//Первоначальная загрузка карточек
initGallery(initialCards);

//Закрытие при нажатие на крестик
closeButtonEdit.addEventListener('click', handleClosePopup);
closeButtonCreate.addEventListener('click', handleClosePopup);

//Нажатие на кнопку редактировать
editButton.addEventListener('click', handleOpenPopupEdit);

//Нажатие на кнопку Сохранить модального окна
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//Нажатие на кнопку (+)
createButton.addEventListener('click', handleOpenPopupCreate);

//Нажатие на кнопку Создать модальное окно
formElementCreate.addEventListener('submit', handleFormSubmitCreate);
