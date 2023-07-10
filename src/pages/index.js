import * as constants from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import initialCards from '../utils/init-cards.js';
import FormValidator from '../components/FormValidator.js';
import validationConfig from '../utils/validate.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card (item, '.gallery-item-template', handleCardClick);
      const cardElement = card.generate();
      cardsList.addItem(cardElement);
    },
  },
  '.gallery-items',
);

cardsList.renderItems();

//Закрытие модального окна для передачи в класс Card
function handleCardClick(name, link) {
  const popupPhoto = new PopupWithImage(constants.popupPhoto, name, link);
  popupPhoto.open();
  popupPhoto.setEventListeners();
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit () {
  const nameInputEdit = document.querySelector('#name'); //поле редактирования имени
  const descriptionInputEdit = document.querySelector('#description'); //поле редактирования описания

  userInfo.setUserInfo(nameInputEdit.value, descriptionInputEdit.value);
}

//Функция создания новой карточки
function handleFormSubmitCreate (objItem) {
  //Создание новой карточки через класс Section
  const newCard = new Section(
    {
      items: objItem,
      renderer: (item) => {
        const card = new Card (item, '.gallery-item-template', handleCardClick);
        const cardElement = card.generate();
        cardsList.addItem(cardElement);
      },
    },
    '.gallery-items',
  );

  newCard.renderItems();
}

const userInfo = new UserInfo({userName: '.profile-info__nametext', userInfo: '.profile-info__description'});

//Нажатие на кнопку редактировать
const popupEdit = new PopupWithForm(constants.popupEdit, handleFormSubmitEdit);

constants.buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  constants.nameInputEdit.value = userData.userName;
  constants.descriptionInputEdit.value = userData.userInfo;

  popupEdit.open();
  popupEdit.setEventListeners();
});

//Нажатие на кнопку (+)
const popupCreate = new PopupWithForm(constants.popupCreate, handleFormSubmitCreate);
constants.buttonCreate.addEventListener('click', () => {
  popupCreate.open();
  popupCreate.setEventListeners();
});

//Проверка валидности форм
const validFormEdit = new FormValidator(constants.formElementEdit, validationConfig);
validFormEdit.enableValidation();

const validFormCreate = new FormValidator(constants.formElementCreate, validationConfig);
validFormCreate.enableValidation();
