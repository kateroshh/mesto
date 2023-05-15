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

const galleryItemTemplate = document.querySelector('.gallery-item-template'); //темплейт для карточки фото и подпись


const editButton = document.querySelector('.profile-info__edit'); //кнопка редактирование профиля
const nameText = document.querySelector('.profile-info__nametext'); //текстовый элемент имя
const descriptionText = document.querySelector('.profile-info__description'); //текстовый элемент описание

const popup = document.querySelector('.popup'); //модальное окно
const closeButton = document.querySelector('.popup__close'); //кнопка крестик
const formElement = document.querySelector('.popup-form'); //форма редактирования профиля
const nameInput = formElement.querySelector('#name'); //поле редактирования имени
const descriptionInput = formElement.querySelector('#description'); //поле редактирования описания





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
