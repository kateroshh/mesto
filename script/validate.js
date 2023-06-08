const validationConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__send',
  inactiveButtonClass: 'popup-form__send_inactive',
  inputErrorClass: 'popup-form__input_error',
  errorClass: 'popup-form__error_active'
}

//Проверка валидности полей ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  // Если есть хотя бы одино невалидное поле ввода
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

//добавление слушателя на все поля ввода
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  //провека валидности полей ввода
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);

      //провека валидности полей ввода
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

//Находит все формы и вешает на поля ввода слушатель событий
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// Вызовем функцию
enableValidation(validationConfig);


//Добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

//Удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Проверяет валидность поля ввод
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    //Показывает ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    //Скрывает ошибку
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const removeValidationErrors = (inputList, formElement, validationConfig) => {
  inputList.forEach(item => {
    hideInputError(formElement, item, validationConfig);
  });
}

//Активируем кнопку при открытие Модального окна
const enableSubmitButton = (buttonItem, validationConfig) => {
  buttonItem.removeAttribute('disabled');
  buttonItem.classList.remove(validationConfig.inactiveButtonClass);
}
