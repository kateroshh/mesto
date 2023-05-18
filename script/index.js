//Исходный массив фото с подписями
const initialCards = [
  {
    name: 'Islands of NEOM, Saudi Arabia',
    link: 'https://images.unsplash.com/photo-1682687982107-14492010e05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Египет',
    link: 'https://plus.unsplash.com/premium_photo-1661841439995-1706237c83dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Италия',
    link: 'https://images.unsplash.com/photo-1683654968102-da4bf0d2d179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80'
  },
  {
    name: 'Al Noor Island in Sharjah on DJI Mavic 2 // Sharjah, UAE',
    link: 'https://images.unsplash.com/photo-1683491184388-7e8ebb14ac31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
  },
  {
    name: 'Китай',
    link: 'https://images.unsplash.com/photo-1684033705603-32a9bf9b7ddf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Индонезия',
    link: 'https://images.unsplash.com/photo-1542548124-c0a04217fcbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
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
const errorTextEdit = popupEdit.querySelector('.popup__error'); //сообщение об ошибке

const closeButtonCreate = document.querySelector('.popup__close_create'); //кнопка крестик
const createButton = document.querySelector('.profile__add'); //кнопка создание новой карточки
const popupCreate = document.querySelector('.popup-create'); //модальное окно создания карточки
const formElementCreate = popupCreate.querySelector('.popup-form'); //форма создания карточки
const titleInputCreate = formElementCreate.querySelector('#title-card'); //поле заголовка карточки
const linkInputCreate = formElementCreate.querySelector('#link-card'); //поле ссылка на картинку
const errorTextCreate = popupCreate.querySelector('.popup__error'); //сообщение об ошибке


const popupPhoto = document.querySelector('.popup-photo'); //модальное окно фото
const closeButtonPhoto = document.querySelector('.popup-photo__close'); //кнопка крестик
const imgPhoto = document.querySelector('.popup-photo__img'); //картинка
const descriptionTextPhoto = document.querySelector('.popup-photo__description'); //текст описание картинки

//Отображение карточки и событий на карточки
function renderCard(name, link) {
  const itemElement = galleryItemTemplate.cloneNode(true);
  itemElement.querySelector('.gallery-item__text').innerText = name;
  itemElement.querySelector('.gallery-item__img').src = link;
  itemElement.querySelector('.gallery-item__img').alt = name;
  itemElement.querySelector('.gallery-item__img').addEventListener('click', handlegalleryPhoto);
  itemElement.querySelector('.gallery-item__like').addEventListener('click', handlegalleryLike);
  itemElement.querySelector('.gallery-item__delete').addEventListener('click', handlegalleryDelete);
  galleryItems.prepend(itemElement);
}

//Загрузка карточек при открытие сайта
function initGallery(items) {
  items.forEach(item => {
    renderCard(item.name, item.link);
  });
}


//Закрытие модального окна
function handleClosePopup () {
  popupEdit.classList.remove('popup_opened');
  popupCreate.classList.remove('popup_opened');
  popupPhoto.classList.remove('popup-photo_opened');
  titleInputCreate.classList.remove('popup-form__input_error');
  linkInputCreate.classList.remove('popup-form__input_error');
  errorTextCreate.classList.remove('popup__error_active');
  errorTextEdit.classList.remove('popup__error_active');
  nameInputEdit.classList.remove('popup-form__input_error');
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

//Функция открытия модального окна фото
function handleOpenPopupPhoto () {
  popupPhoto.classList.add('popup-photo_opened');
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  if(nameInputEdit.value.trim() != '' && nameInputEdit.value != null) {
    let nameInputNew = nameInputEdit.value;
    let descriptionInputNew = descriptionInputEdit.value;

    nameText.textContent = nameInputNew;
    descriptionText.textContent = descriptionInputNew;

    //Закрытие модального окна
    handleClosePopup();
  } else {
    //Проверка на заполнение полей
    errorTextEdit.classList.add('popup__error_active');
    nameInputEdit.classList.add('popup-form__input_error');
  }


}

//Функция создания новой карточки
function handleFormSubmitCreate (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  if(titleInputCreate.value != null && titleInputCreate.value.trim() != '' && linkInputCreate.value != null && linkInputCreate.value.trim() != '')
  {
    renderCard(titleInputCreate.value, linkInputCreate.value);

    //Закрытие модального окна
    handleClosePopup();

    titleInputCreate.value = '';
    linkInputCreate.value = '';
  } else {
    //Проверка на заполнение полей
    errorTextCreate.classList.add('popup__error_active');

    if((titleInputCreate.value === null || titleInputCreate.value.trim() === '') && (linkInputCreate.value === null || linkInputCreate.value.trim() === '')){
      titleInputCreate.classList.add('popup-form__input_error');
      linkInputCreate.classList.add('popup-form__input_error');
    } else if(linkInputCreate.value === null || linkInputCreate.value.trim() === '') {
      linkInputCreate.classList.add('popup-form__input_error');
      titleInputCreate.classList.remove('popup-form__input_error');
    } else if (titleInputCreate.value === null || titleInputCreate.value.trim() === '') {
      titleInputCreate.classList.add('popup-form__input_error');
      linkInputCreate.classList.remove('popup-form__input_error');
    }
  }

}

//Нажатие на кнопку Нравится
function handlegalleryLike (event) {
  event.target.classList.toggle('gallery-item__like_active');
}

//Кнопка удаления карточки (мусорка)
function handlegalleryDelete (event) {
  event.target.closest('.gallery-item').remove();
}

function handlegalleryPhoto(event) {
  imgPhoto.src = event.target.src;
  imgPhoto.alt = event.target.alt;
  descriptionTextPhoto.textContent = event.target.alt;

  handleOpenPopupPhoto();
}

//Первоначальная загрузка карточек
initGallery(initialCards);

//Закрытие при нажатие на крестик
closeButtonEdit.addEventListener('click', handleClosePopup);
closeButtonCreate.addEventListener('click', handleClosePopup);
closeButtonPhoto.addEventListener('click', handleClosePopup);

//Нажатие на кнопку редактировать
editButton.addEventListener('click', handleOpenPopupEdit);

//Нажатие на кнопку Сохранить модального окна
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//Нажатие на кнопку (+)
createButton.addEventListener('click', handleOpenPopupCreate);

//Нажатие на кнопку Создать модальное окно
formElementCreate.addEventListener('submit', handleFormSubmitCreate);
