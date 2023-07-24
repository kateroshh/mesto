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

//Получаем текущего пользователя
api.getCurrentUser()
.then((currentUser) => {
  //Start Promise

  //Первоначальная загрузка карточек
  api.getInitialCards()
    .then((result) => {
      cardsList.renderItems(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

  //Создание карточки
  function createCard(item) {
    const card = new Card (
      item,
      '.gallery-item-template',
      handleCardClick,
      handleClickDelete,
      handleClickLike,
      currentUser
      );
    const cardElement = card.generate();
    cardsList.addItem(cardElement);
  }


  const cardsList = new Section(
    {
      renderer: (item) => createCard(item)
    },
    '.gallery-items',
  );

  //Закрытие модального окна для передачи в класс Card
  function handleCardClick(name, link) {
    popupPhoto.open(name, link);
  }

  //Функция сохраняет изменения в импутах в текстовые элементы
  function handleFormSubmitEdit (data, btnSubmit) {
    api.saveUserInfo(data)
    .then((result) => {
      userInfo.setUserInfo(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupEdit.close();
      btnSubmit.textContent = 'Сохранить';
    });
  }

  //Функция сохраняет изменения аватар
  function handleFormSubmitAvatar (data, btnSubmit) {
    api.saveUserAvatar(data.avatar)
    .then((result) => {
      userInfo.setUserAvatar(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAvatar.close();
      btnSubmit.textContent = 'Сохранить';
    });
  }

  //Функция создания новой карточки
  function handleFormSubmitCreate (objItem, btnSubmit) {

    api.createNewCard(objItem)
    .then((result) => {
      createCard(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupCreate.close();
      btnSubmit.textContent = 'Создать';
    });
  }

  //Функция открытие модального окна при нажатие на корзину
  function handleClickDelete(cardId, cardElement) {
    popupDeleteCard.open(cardId, cardElement);
  }

  //Функция удаления карточки
  function handleFormSubmitDeleteCard (cardId, cardElement, btnSubmit) {
    api.deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupDeleteCard.close();
      btnSubmit.textContent = 'Да';
    });
  }

  //Функция клик по сердечку Нравится (like)
  function handleClickLike(cardId, isLike, cardElement) {
    api.likeCard(cardId, isLike)
    .then((result) => {
      cardElement.closest('.gallery-item__like').querySelector('.gallery-item__textlikes').innerText = result.likes.length;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  const userInfo = new UserInfo({userName: '.profile-info__nametext', userInfo: '.profile-info__description', userAvatar: '.profile-info__avatar'});

  api.getUserInfo()
    .then((result) => {
      userInfo.setUserInfo(result);
      userInfo.setUserAvatar(result);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

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
    constants.avatarInput.value = userData.userAvatar;

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

  //End Promise
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});
