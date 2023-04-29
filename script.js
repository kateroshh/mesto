let editButtom = document.querySelector('.profile-info__edit');
let nameText = document.querySelector('.profile-info__nametext');
let descriptionText = document.querySelector('.profile-info__description');

let popup = document.querySelector('.popup');
let closeButtom = document.querySelector('.popup-content__close');
let nameInput = document.querySelector('#name');
let descriptionInput = document.querySelector('#description');
let sendButtom = document.querySelector('.popup-form__send');

function handleCloseForm () {
  popup.classList.remove('popup_active');
}

closeButtom.addEventListener('click', handleCloseForm);

function handleOpenForm () {
  popup.classList.add('popup_active');
  nameInput.value = nameText.textContent;
  descriptionInput.value = descriptionText.textContent;
}

editButtom.addEventListener('click', handleOpenForm);

function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  let nameInputNew = nameInput.value;
  let descriptionInputNew = descriptionInput.value;

  nameText.textContent = nameInputNew;
  descriptionText.textContent = descriptionInput.value;

  handleCloseForm();
}

sendButtom.addEventListener('click', handleFormSubmit);
