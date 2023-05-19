//Создание карточки и событий на карточки
function createCard(name, link) {
  const itemElement = galleryItemTemplate.cloneNode(true);
  itemElement.querySelector('.gallery-item__text').innerText = name;
  itemElement.querySelector('.gallery-item__img').src = link;
  itemElement.querySelector('.gallery-item__img').alt = name;
  itemElement.querySelector('.gallery-item__img').addEventListener('click', handleGalleryPhoto);
  itemElement.querySelector('.gallery-item__like').addEventListener('click', handleGalleryLike);
  itemElement.querySelector('.gallery-item__delete').addEventListener('click', handleGalleryDelete);
  renderCard(itemElement);
  return itemElement;
}

//Добавление карточки на страницу
function renderCard(card) {
  galleryItems.prepend(card);
}

//Загрузка карточек при открытие сайта
function initGallery(items) {
  items.forEach(item => {
    createCard(item.name, item.link);
  });
}


//Закрытие модального окна
function handleClosePopup () {
  popup.classList.remove('popup_opened');
}

//Функция открытия модального окна
function handleOpenPopup (typeModal) {
  if(typeModal === 'edit') {
    popupTitle.textContent = 'Редактировать профиль';
    popupTitle.classList.add('popup__text_active');

    errorText.classList.remove('popup__error_active');

    inputFormName.value = nameText.textContent;
    inputFormDescription.value = descriptionText.textContent;
    inputFormName.classList.add('popup-form__input_active');
    inputFormDescription.classList.add('popup-form__input_active');
    inputFormTitleCard.classList.remove('popup-form__input_active');
    inputLinkCard.classList.remove('popup-form__input_active');

    buttonSubmit.classList.add('popup-form__send_active');
    buttonSubmit.textContent = 'Сохранить';

    imgPhoto.classList.remove('popup__img_active');
    descriptionTextPhoto.classList.remove('popup__description_active');
    popup.classList.remove('popup_photo');
    popupContainer.classList.remove('popup__container_photo');
    buttonClosePopup.classList.remove('popup__close_photo');
  } else if(typeModal === 'create') {
    popupTitle.textContent = 'Новое место';
    popupTitle.classList.add('popup__text_active');

    errorText.classList.remove('popup__error_active');

    inputFormTitleCard.classList.add('popup-form__input_active');
    inputLinkCard.classList.add('popup-form__input_active');
    inputFormName.classList.remove('popup-form__input_active');
    inputFormDescription.classList.remove('popup-form__input_active');

    buttonSubmit.classList.add('popup-form__send_active');
    buttonSubmit.textContent = 'Создать';

    imgPhoto.classList.remove('popup__img_active');
    descriptionTextPhoto.classList.remove('popup__description_active');
    popup.classList.remove('popup_photo');
    popupContainer.classList.remove('popup__container_photo');
    buttonClosePopup.classList.remove('popup__close_photo');
  } else if(typeModal === 'photo') {
    popupTitle.classList.remove('popup__text_active');

    errorText.classList.remove('popup__error_active');

    inputFormTitleCard.classList.remove('popup-form__input_active');
    inputLinkCard.classList.remove('popup-form__input_active');
    inputFormName.classList.remove('popup-form__input_active');
    inputFormDescription.classList.remove('popup-form__input_active');

    buttonSubmit.classList.remove('popup-form__send_active');

    imgPhoto.classList.add('popup__img_active');
    descriptionTextPhoto.classList.add('popup__description_active');
    popup.classList.add('popup_photo');
    popupContainer.classList.add('popup__container_photo');
    buttonClosePopup.classList.add('popup__close_photo');
  }
  popup.classList.add('popup_opened');
}

//Функция обработки Создания карточки и редактирования профиля
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  if(evt.target.textContent.trim() === 'Сохранить') {
    handleFormSubmitEdit(evt);
  } else if(evt.target.textContent.trim() === 'Создать') {
    handleFormSubmitCreate(evt);
  }
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (evt) {
  if(inputFormName.value.trim() != '' && inputFormName.value != null) {
    let nameInputNew = inputFormName.value;
    let descriptionInputNew = inputFormDescription.value;

    nameText.textContent = nameInputNew;
    descriptionText.textContent = descriptionInputNew;

    //Закрытие модального окна
    handleClosePopup();
  } else {
    //Проверка на заполнение полей
    errorText.classList.add('popup__error_active');
    inputFormName.classList.add('popup-form__input_error');
  }
}

//Функция создания новой карточки
function handleFormSubmitCreate (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  if(inputFormTitleCard.value != null && inputFormTitleCard.value.trim() != '' && inputLinkCard.value != null && inputLinkCard.value.trim() != '')
  {
    createCard(inputFormTitleCard.value, inputLinkCard.value);

    //Закрытие модального окна
    handleClosePopup();

    //Очистка полей формы
    formElementCreate.reset();

  } else {
    //Проверка на заполнение полей
    errorText.classList.add('popup__error_active');

    if((inputFormTitleCard.value === null || inputFormTitleCard.value.trim() === '') && (inputLinkCard.value === null || inputLinkCard.value.trim() === '')){
      inputFormTitleCard.classList.add('popup-form__input_error');
      inputLinkCard.classList.add('popup-form__input_error');
    } else if(inputLinkCard.value === null || inputLinkCard.value.trim() === '') {
      inputLinkCard.classList.add('popup-form__input_error');
      inputFormTitleCard.classList.remove('popup-form__input_error');
    } else if (inputFormTitleCard.value === null || inputFormTitleCard.value.trim() === '') {
      inputFormTitleCard.classList.add('popup-form__input_error');
      inputLinkCard.classList.remove('popup-form__input_error');
    }
  }
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

  handleOpenPopup('photo');
}

//Первоначальная загрузка карточек
initGallery(initialCards);

//Закрытие при нажатие на крестик
buttonClosePopup.addEventListener('click', handleClosePopup);

//Нажатие на кнопку редактировать
buttonEditProfile.addEventListener('click', handleOpenPopup.bind(this, 'edit'));

//Нажатие на кнопку Сохранить модального окна
formElementCreate.addEventListener('submit', handleFormSubmit);

//Нажатие на кнопку (+)
buttonCreate.addEventListener('click', handleOpenPopup.bind(this, 'create'));
