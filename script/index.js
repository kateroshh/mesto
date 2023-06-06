//Создание карточки и событий на карточки
function createCard(name, link) {
  const itemElement = galleryItemTemplate.cloneNode(true);
  itemElement.querySelector('.gallery-item__text').innerText = name;
  itemElement.querySelector('.gallery-item__img').src = link;
  itemElement.querySelector('.gallery-item__img').alt = name;
  itemElement.querySelector('.gallery-item__img').addEventListener('click', handleGalleryPhoto);
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
function handleClosePopup (popupName) {
  popupName.classList.remove('popup_opened');
}

//Функция закрытие модельного окна при клике на оверлей
function closePopupOverlay (popupName) {
  popupName.addEventListener('click', function(evt){
    if(evt.target === evt.currentTarget) {
      handleClosePopup(popupName);
    }
  });
}

//Функция закрытие модельного окна при нажатие Esc
function closePopupEsc(popupName) {
  document.addEventListener('keydown', (evt) => {
    if (evt.code === "Escape" && popupName.classList.contains('popup_opened')) {
      handleClosePopup(popupName);
    }
  });
}

//Функция при открытие модального окна
function openPopup (popupName) {
  popupName.classList.add('popup_opened');

  //Проверяем валидность полей ввода
  enableValidation(validationConfig);
}

//Функция при открытие модального окна перезает значения текстовых элементов в инпут
function handleOpenPopupEdit () {
  //Заполняем поля данными для корректной проверки валидации
  nameInputEdit.value = nameText.textContent;
  descriptionInputEdit.value = descriptionText.textContent;

  const inputListEdit = Array.from(formElementEdit.querySelectorAll('.popup-form__input'));

  inputListEdit.forEach(item => {
    hideInputError(formElementEdit, item, validationConfig);
  });

  //Открываем модальное окно
  openPopup(popupEdit);

  closePopupOverlay(popupEdit); //закрытие по нажатию на овердай
  closePopupEsc(popupEdit); //закрытие при нажатие на ESC
}

//Функция открытия модального окна создания карточки
function handleOpenPopupCreate () {
  openPopup(popupCreate);
  closePopupOverlay(popupCreate); //закрытие по нажатию на овердай
  closePopupEsc(popupCreate); //закрытие при нажатие на ESC
}

//Функция открытия модального окна фото
function handleOpenPopupPhoto () {
  openPopup(popupPhoto);
  closePopupOverlay(popupPhoto); //закрытие по нажатию на овердай
  closePopupEsc(popupPhoto); //закрытие при нажатие на ESC
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.


  let nameInputNew = nameInputEdit.value;
  let descriptionInputNew = descriptionInputEdit.value;

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
