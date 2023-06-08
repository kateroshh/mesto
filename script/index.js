//Создание карточки и событий на карточки
function createCard(name, link) {
  const itemElement = galleryItemTemplate.cloneNode(true);
  const itemElementImg = itemElement.querySelector('.gallery-item__img');

  itemElement.querySelector('.gallery-item__text').innerText = name;
  itemElementImg.src = link;
  itemElementImg.alt = name;
  itemElementImg.addEventListener('click', handleGalleryPhoto);
  itemElement.querySelector('.gallery-item__like').addEventListener('click', handleGalleryLike);
  itemElement.querySelector('.gallery-item__delete').addEventListener('click', handleGalleryDelete);

  return itemElement;
}

//Добавление карточки на страницу
function renderCard(card) {
  galleryItems.prepend(card);
}

//Загрузка карточек при открытие сайта
function initGallery(items) {
  items.forEach(item => {
    //Создаём карточку
    const card = createCard(item.name, item.link)
    //Добавляем её в разметку
    renderCard(card);
  });
}

//Закрытие модального окна
function handleClosePopup (popup) {
  //const openedPopup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');

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
  const openedPopup = document.querySelector('.popup_opened');

  if (evt.code === "Escape" && openedPopup) {
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

//Функция при открытие модального окна перезает значения текстовых элементов в инпут
function handleOpenPopupEdit () {
  //Заполняем поля данными для корректной проверки валидации
  nameInputEdit.value = nameText.textContent;
  descriptionInputEdit.value = descriptionText.textContent;

  removeValidationErrors (inputListEdit, formElementEdit, validationConfig);

  //Активируем кнопку сохранить при открытие Модального окна
  enableSubmitButton(buttonSaveEdit, validationConfig);

  //Открываем модальное окно
  openPopup(popupEdit);
}

//Функция открытия модального окна создания карточки
function handleOpenPopupCreate () {
  openPopup(popupCreate);
}

//Функция открытия модального окна фото
function handleOpenPopupPhoto () {
  openPopup(popupPhoto);
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

  renderCard(createCard(titleInputCreate.value, linkInputCreate.value));

  //Закрытие модального окна
  handleClosePopup(popupCreate);

  formElementCreate.reset();
}

//Нажатие на кнопку Нравится
function handleGalleryLike (event) {
  event.target.classList.toggle('gallery-item__like_active');
}

//Кнопка удаления карточки (мусорка)
function handleGalleryDelete (event) {
  event.target.closest('.gallery-item').remove();
}

function handleGalleryPhoto(event) {
  imgPhoto.src = event.target.src;
  imgPhoto.alt = event.target.alt;
  descriptionTextPhoto.textContent = event.target.alt;

  handleOpenPopupPhoto();
}

//Первоначальная загрузка карточек
initGallery(initialCards);

//Закрытие при нажатие на крестик
buttonCloseEdit.addEventListener('click', handleClosePopup.bind(this, popupEdit));
buttonCloseCreate.addEventListener('click', handleClosePopup.bind(this, popupCreate));
buttonClosePhoto.addEventListener('click', handleClosePopup.bind(this, popupPhoto));

//Нажатие на кнопку редактировать
buttonEditProfile.addEventListener('click', handleOpenPopupEdit);

//Нажатие на кнопку Сохранить модального окна
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//Нажатие на кнопку (+)
buttonCreate.addEventListener('click', handleOpenPopupCreate);

//Нажатие на кнопку Создать модальное окно
formElementCreate.addEventListener('submit', handleFormSubmitCreate);
