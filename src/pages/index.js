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

//Создание карточки
function createCard(item) {
  const card = new Card (item, '.gallery-item-template', handleCardClick);
  const cardElement = card.generate();
  cardsList.addItem(cardElement);
}

const cardsList = new Section(
  {
    renderer: (item) => createCard(item)
  },
  '.gallery-items',
);

cardsList.renderItems(initialCards);

//Закрытие модального окна для передачи в класс Card
function handleCardClick(name, link) {
  popupPhoto.open(name, link);
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (data) {
  userInfo.setUserInfo(data);
  popupEdit.close();
}

//Функция создания новой карточки
function handleFormSubmitCreate (objItem) {
  createCard(objItem);
  popupCreate.close();
}

const userInfo = new UserInfo({userName: '.profile-info__nametext', userInfo: '.profile-info__description'});

//Нажатие на кнопку редактировать
const popupEdit = new PopupWithForm(constants.popupEdit, handleFormSubmitEdit);
popupEdit.setEventListeners();

constants.buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  constants.nameInputEdit.value = userData.userName;
  constants.descriptionInputEdit.value = userData.userInfo;

  popupEdit.open();
});

//Модальное окно с картинкой
const popupPhoto = new PopupWithImage(constants.popupPhoto);
popupPhoto.setEventListeners();

//Нажатие на кнопку (+)
const popupCreate = new PopupWithForm(constants.popupCreate, handleFormSubmitCreate);
popupCreate.setEventListeners();

constants.buttonCreate.addEventListener('click', () => {
  popupCreate.open();
});

//Проверка валидности форм
const validFormEdit = new FormValidator(constants.formElementEdit, validationConfig);
validFormEdit.enableValidation();

const validFormCreate = new FormValidator(constants.formElementCreate, validationConfig);
validFormCreate.enableValidation();
