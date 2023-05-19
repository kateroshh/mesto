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
    createCard(titleInputCreate.value, linkInputCreate.value);

    //Закрытие модального окна
    handleClosePopup();

    //Очистка полей формы
    formElementCreate.reset();

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
buttonCloseEditForm.addEventListener('click', handleClosePopup);
buttonCloseCreateForm.addEventListener('click', handleClosePopup);
buttonClosePhoto.addEventListener('click', handleClosePopup);

//Нажатие на кнопку редактировать
buttonEditProfile.addEventListener('click', handleOpenPopupEdit);

//Нажатие на кнопку Сохранить модального окна
formElementEdit.addEventListener('submit', handleFormSubmitEdit);

//Нажатие на кнопку (+)
buttonCreate.addEventListener('click', handleOpenPopupCreate);

//Нажатие на кнопку Создать модальное окно
formElementCreate.addEventListener('submit', handleFormSubmitCreate);
