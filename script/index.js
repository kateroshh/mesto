let editButton = document.querySelector('.profile-info__edit'); //кнопка редактирование профиля
let nameText = document.querySelector('.profile-info__nametext'); //текстовый элемент имя
let descriptionText = document.querySelector('.profile-info__description'); //текстовый элемент описание

let popup = document.querySelector('.popup'); //модальное окно
let closeButton = document.querySelector('.popup__container__close'); //кнопка крестик
let formElement = document.querySelector('.popup-form'); //форма редактирования профиля
let nameInput = formElement.querySelector('#name'); //поле редактирования имени
let descriptionInput = formElement.querySelector('#description'); //поле редактирования описания

//Закрытие модального окна
function handleClosePopup () {
  popup.classList.remove('popup_opened');
}

//Функция при открытие модального окна перезает значения текстовых элементов в инпут
function handleOpenPopup () {
  popup.classList.add('popup_opened');
  nameInput.value = nameText.textContent;
  descriptionInput.value = descriptionText.textContent;
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let nameInputNew = nameInput.value;
  let descriptionInputNew = descriptionInput.value;

  nameText.textContent = nameInputNew;
  descriptionText.textContent = descriptionInput.value;
  //Закрытие модального окна
  handleClosePopup();
}

//Закрытие при нажатие на крестик
closeButton.addEventListener('click', handleClosePopup);

//Нажатие на кнопку редактировать
editButton.addEventListener('click', handleOpenPopup);

//Нажатие на кнопку Сохранить модального окна
formElement.addEventListener('submit', handleFormSubmit);
