import * as constants from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import validationConfig from '../utils/validate.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '55fbd87c-5811-467f-8ed3-58886fd10369',
    'Content-Type': 'application/json'
  }
});

//Данные пользователя
const userInfo = new UserInfo({userName: '.profile-info__nametext', userInfo: '.profile-info__description', userAvatar: '.profile-info__avatar'});

//Список карточек
const cardsList = new Section(
  {
    renderer: (item, currentUserId) => {
      const card = createCard(item, currentUserId);
      cardsList.addItem(card);
    }
  },
  '.gallery-items',
);

Promise.all([ api.getUserInfo(), api.getInitialCards() ])
  .then(([ userData, cardData ]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);

    cardsList.renderItems(cardData, userData._id);
  })
  .catch((err) => {
    console.log('Ошибка получения данных пользователя и первоначального списка карточек', err);
  });

//Создание карточки
function createCard(item, currentUserId) {
  const card = new Card (
    item,
    currentUserId,
    '.gallery-item-template',
    handleCardClick,
    handleClickDelete,
    handleClickLike
    );
  //const cardElement = card.generate();
  //cardsList.addItem(cardElement);
  return card.generate();
}

//Закрытие модального окна для передачи в класс Card
function handleCardClick(name, link) {
  popupPhoto.open(name, link);
}

//Функция сохраняет изменения в импутах в текстовые элементы
function handleFormSubmitEdit (data, btnSubmit) {
  api.saveUserInfo(data)
  .then((result) => {
    userInfo.setUserInfo(result);
    popupEdit.close();
  })
  .catch((err) => {
    console.log('Ошибка сохранения данных пользователя', err);
  })
  .finally(() => {
    btnSubmit.textContent = 'Сохранить';
  });
}

//Функция сохраняет изменения аватар
function handleFormSubmitAvatar (data, btnSubmit) {
  api.saveUserAvatar(data.avatar)
  .then((result) => {
    userInfo.setUserAvatar(result.avatar);
    popupAvatar.close();
  })
  .catch((err) => {
    console.log('Ошибка сохранения аватара пользователя', err);
  })
  .finally(() => {
    btnSubmit.textContent = 'Сохранить';
  });
}

//Функция создания новой карточки
function handleFormSubmitCreate (objItem, btnSubmit) {

  api.createNewCard(objItem)
  .then((result) => {
    const card = createCard(result, result.owner._id);
    cardsList.addItemNew(card);
    popupCreate.close();
  })
  .catch((err) => {
    console.log('Ошибка создания новой карточки', err);
  })
  .finally(() => {
    btnSubmit.textContent = 'Создать';
  });
}

//Функция открытие модального окна при нажатие на корзину
function handleClickDelete(cardId, cardElement, cardClass) {
  popupDeleteCard.open(cardId, cardElement, cardClass);
}

//Функция удаления карточки
function handleFormSubmitDeleteCard (cardId, cardElement, cardClass, btnSubmit) {
  api.deleteCard(cardId)
  .then(() => {
    cardClass.deleteItem(cardElement);
    popupDeleteCard.close();
  })
  .catch((err) => {
    console.log('Ошибка при удаление карточки', err); // выведем ошибку в консоль
  })
  .finally(() => {
    btnSubmit.textContent = 'Да';
  });
}

//Функция клик по сердечку Нравится (like)
function handleClickLike(cardId, isLike, cardElement, cardClass) {
  api.likeCard(cardId, isLike)
  .then((result) => {
    cardClass.setLikeCount(cardElement, result.likes.length);
    cardClass.likeItem(cardElement);
  })
  .catch((err) => {
    console.log('Ошибка ставим мне нравится', err); // выведем ошибку в консоль
  });
}

//Нажатие на кнопку редактировать
const popupEdit = new PopupWithForm(constants.popupEdit, handleFormSubmitEdit);
popupEdit.setEventListeners();

constants.buttonEditProfile.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  constants.nameInputEdit.value = userData.userName;
  constants.descriptionInputEdit.value = userData.userInfo;

  validFormEdit.resetValidation();
  popupEdit.open();
});

//Нажатие на аватар
const popupAvatar = new PopupWithForm(constants.popupAvatar, handleFormSubmitAvatar);
popupAvatar.setEventListeners();

constants.buttonEditAvatar.addEventListener('click', () => {
  const userData = userInfo.getUserAvatar();

  validFormAvatar.resetValidation();
  popupAvatar.open();
});

//Модальное окно с картинкой
const popupPhoto = new PopupWithImage(constants.popupPhoto);
popupPhoto.setEventListeners();

//Нажатие на кнопку (+)
const popupCreate = new PopupWithForm(constants.popupCreate, handleFormSubmitCreate);
popupCreate.setEventListeners();

constants.buttonCreate.addEventListener('click', () => {
  validFormCreate.resetValidation();
  popupCreate.open();
});

//Нажатие на корзину (кнопка удалить на карточке)
const popupDeleteCard = new PopupDeleteCard(constants.popupDeleteCard, handleFormSubmitDeleteCard);
popupDeleteCard.setEventListeners();

//Проверка валидности форм
const validFormEdit = new FormValidator(constants.formElementEdit, validationConfig);
validFormEdit.enableValidation();

const validFormCreate = new FormValidator(constants.formElementCreate, validationConfig);
validFormCreate.enableValidation();

const validFormAvatar = new FormValidator(constants.formElementAvatar, validationConfig);
validFormAvatar.enableValidation();
