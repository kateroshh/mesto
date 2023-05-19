// const galleryItemTemplate = document.querySelector('.gallery-item-template').content; //темплейт для карточки фото и подпись
// const galleryItems = document.querySelector('.gallery-items'); //место куда добавляем карточки

// const buttonEditProfile = document.querySelector('.profile-info__edit'); //кнопка редактирование профиля
// const nameText = document.querySelector('.profile-info__nametext'); //текстовый элемент имя
// const descriptionText = document.querySelector('.profile-info__description'); //текстовый элемент описание

// const popup = document.querySelector('.popup'); //модальное окно
// const buttonCloseEditForm = document.querySelector('.popup__close_edit'); //кнопка крестик
// const popupEdit = document.querySelector('.popup-edit'); //модальное окно
// const formElementEdit = popupEdit.querySelector('.popup-form'); //форма редактирования профиля
// const nameInputEdit = formElementEdit.querySelector('#name'); //поле редактирования имени
// const descriptionInputEdit = formElementEdit.querySelector('#description'); //поле редактирования описания
// const errorTextEdit = popupEdit.querySelector('.popup__error'); //сообщение об ошибке

// const buttonCloseCreateForm = document.querySelector('.popup__close_create'); //кнопка крестик
// const buttonCreate = document.querySelector('.profile__add'); //кнопка создание новой карточки
// const popupCreate = document.querySelector('.popup-create'); //модальное окно создания карточки
// const formElementCreate = popupCreate.querySelector('.popup-form'); //форма создания карточки
// const titleInputCreate = formElementCreate.querySelector('#title-card'); //поле заголовка карточки
// const linkInputCreate = formElementCreate.querySelector('#link-card'); //поле ссылка на картинку
// const errorTextCreate = popupCreate.querySelector('.popup__error'); //сообщение об ошибке


// const popupPhoto = document.querySelector('.popup-photo'); //модальное окно фото
// const buttonClosePhoto = document.querySelector('.popup-photo__close'); //кнопка крестик
// const imgPhoto = document.querySelector('.popup-photo__img'); //картинка
// const descriptionTextPhoto = document.querySelector('.popup-photo__description'); //текст описание картинки


const galleryItemTemplate = document.querySelector('.gallery-item-template').content; //темплейт для карточки фото и подпись
const galleryItems = document.querySelector('.gallery-items'); //место куда добавляем карточки

const buttonEditProfile = document.querySelector('.profile-info__edit'); //кнопка редактирование профиля
const nameText = document.querySelector('.profile-info__nametext'); //текстовый элемент имя
const descriptionText = document.querySelector('.profile-info__description'); //текстовый элемент описание

const buttonCreate = document.querySelector('.profile__add'); //кнопка создание новой карточки

const popup = document.querySelector('.popup'); //модальное окно
const popupContainer = document.querySelector('.popup__container'); //контейнер модального окна
const popupTitle = document.querySelector('.popup__text'); //Заголовок модального окна
const buttonClosePopup = document.querySelector('.popup__close'); //кнопка закрытия модального окна
const buttonSubmit = document.querySelector('.popup-form__send'); //кнопка создание новой карточки
const formElementCreate = popup.querySelector('.popup-form'); //форма
const inputFormName = document.querySelector('#name'); //Поле ввода Имя
const inputFormDescription = document.querySelector('#description'); //Поле ввода описание профиля
const inputFormTitleCard = document.querySelector('#title-card'); //Поле ввода заголовок (место) карточки
const inputLinkCard = document.querySelector('#link-card'); //Поле ввода ссылка на картинку
const imgPhoto = document.querySelector('.popup__img'); //картинка
const descriptionTextPhoto = document.querySelector('.popup__description'); //текст описание картинки
const errorText = popup.querySelector('.popup__error'); //сообщение об ошибке
