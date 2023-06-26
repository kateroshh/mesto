import Card from './Card.js';
import initialCards from './init-cards.js';
import FormValidator from './FormValidator.js';
import validationConfig from './validate.js';

//Добавление карточки на страницу
function renderCard(card) {
  galleryItems.prepend(card);
}

//Загрузка карточек при открытие сайта
function initGallery(items) {
  items.forEach(createCard);
}


function getCard(item) {
  //Создаём класс карточки
  const card = new Card (item, '.gallery-item-template', handleCardClick);
  //добавляем карточку в разметку
  const cardElement = card.generate();
  return cardElement;
}

//Создание карточки
function createCard(item) {
  const cardElement = getCard(item);
  //Добавляем её в разметку
  renderCard(cardElement);
}

//Закрытие модального окна
function handleClosePopup (popup) {
  //const openedPopup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOverlay);
}

//Функция закрытие модельного окна при клике на оверлей
const closePopupOverlay = (evt) => {
  if(evt.target === evt.currentTarget) {
    handleClosePopup(evt.target);
  }
}

//Слушатель на закрытие
function setEventListenerClosePopupClick (popup) {
  popup.addEventListener('click', closePopupOverlay);
}

//Функция закрытие модельного окна при нажатие Esc
const closePopupEsc = (evt) => {
  if (evt.code === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');

    handleClosePopup(openedPopup);
  }
}

//Слушатель на закрытие
function setEventListenerClosePopupEsc () {
  document.addEventListener('keydown', closePopupEsc);
}

//Функция при открытие модального окна
function openPopup (popupName) {
  popupName.classList.add('popup_opened');

  setEventListenerClosePopupClick(popupName); //закрытие по нажатию на овердай
  setEventListenerClosePopupEsc(); //закрытие при нажатие на ESC
}

function handleCardClick(name, link) {
  imgPhoto.src = link;
  imgPhoto.alt = name;
  descriptionTextPhoto.textContent = name;

  openPopup(popupPhoto);
}

//Функция при открытие модального окна перезает значения текстовых элементов в инпут
function handleOpenPopupEdit () {
  //Заполняем поля данными для корректной проверки валидации
  nameInputEdit.value = nameText.textContent;
  descriptionInputEdit.value = descriptionText.textContent;

  //Настройка формы при открытие
  validFormEdit.resetValidation();
  //Открываем модальное окно
  openPopup(popupEdit);
}

//Функция открытия модального окна создания карточки
function handleOpenPopupCreate () {
  //Настройка формы при открытие
  validFormCreate.resetValidation();
  //Открываем модальное окно
  openPopup(popupCreate);
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const nameInputNew = nameInputEdit.value;
  const descriptionInputNew = descriptionInputEdit.value;

  nameText.textContent = nameInputNew;
  descriptionText.textContent = descriptionInputNew;

  //Закрытие модального окна
  handleClosePopup(popupEdit);
}

//Функция создания новой карточки
function handleFormSubmitCreate (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const objItem = {
    name: titleInputCreate.value,
    link: linkInputCreate.value
  }

  createCard(objItem);

  //Закрытие модального окна
  handleClosePopup(popupCreate);

  formElementCreate.reset();
}

//Универсальный обработчик закрытия попапов на крестик
closeButtons.forEach((button) => {
  // находим ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => handleClosePopup(popup));
});

//Первоначальная загрузка карточек
initGallery(initialCards);

//Нажатие на кнопку редактировать
buttonEditProfile.addEventListener('click', handleOpenPopupEdit);

//Нажатие на кнопку Сохранить модального окна
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//Нажатие на кнопку (+)
buttonCreate.addEventListener('click', handleOpenPopupCreate);

//Нажатие на кнопку Создать модальное окно
formElementCreate.addEventListener('submit', handleFormSubmitCreate);

//Проверка валидности форм
const validFormEdit = new FormValidator(formElementEdit, validationConfig);
validFormEdit.enableValidation();

const validFormCreate = new FormValidator(formElementCreate, validationConfig);
validFormCreate.enableValidation();
