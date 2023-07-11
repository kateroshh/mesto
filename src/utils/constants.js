export const galleryItemTemplate = document.querySelector('.gallery-item-template').content; //темплейт для карточки фото и подпись
export const galleryItems = document.querySelector('.gallery-items'); //место куда добавляем карточки

export const buttonEditProfile = document.querySelector('.profile-info__edit'); //кнопка редактирование профиля
export const nameText = document.querySelector('.profile-info__nametext'); //текстовый элемент имя
export const descriptionText = document.querySelector('.profile-info__description'); //текстовый элемент описание

export const popupEdit = document.querySelector('.popup-edit'); //модальное окно
export const formElementEdit = popupEdit.querySelector('.popup-form'); //форма редактирования профиля
export const nameInputEdit = formElementEdit.querySelector('#name'); //поле редактирования имени
export const descriptionInputEdit = formElementEdit.querySelector('#description'); //поле редактирования описания
export const buttonSaveEdit = popupEdit.querySelector('.popup-form__send'); //Кнопка Сохранить

export const buttonCreate = document.querySelector('.profile__add'); //кнопка создание новой карточки
export const popupCreate = document.querySelector('.popup-create'); //модальное окно создания карточки
export const formElementCreate = popupCreate.querySelector('.popup-form'); //форма создания карточки
export const titleInputCreate = formElementCreate.querySelector('#title-card'); //поле заголовка карточки
export const linkInputCreate = formElementCreate.querySelector('#link-card'); //поле ссылка на картинку

export const popupPhoto = document.querySelector('.popup-photo'); //модальное окно фото
export const imgPhoto = document.querySelector('.popup__img'); //картинка
export const descriptionTextPhoto = document.querySelector('.popup__description'); //текст описание картинки

export const inputListEdit = Array.from(formElementEdit.querySelectorAll('.popup-form__input')); //список полей ввода
export const closeButtons = document.querySelectorAll('.popup__close'); //Все крестики на попапах
