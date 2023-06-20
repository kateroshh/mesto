export default class FormValidator {
	constructor(form, config) {
    this._config = config;
    this._form = form;
	}

  //Проверка валидности полей ввода
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState = (inputList, buttonElement, validationConfig) => {
    // Если есть хотя бы одино невалидное поле ввода
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  //добавление слушателя на все поля ввода
  _setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    //провека валидности полей ввода
    this._toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, validationConfig);

        //провека валидности полей ввода
        this._toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };

  //Находит все формы и вешает на поля ввода слушатель событий
  enableValidation = () => {
    this._setEventListeners(this._form, this._config);
  }

  //Добавляет класс с ошибкой
  _showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  }

  //Удаляет класс с ошибкой
  _hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  }

  // Проверяет валидность поля ввод
  _isValid = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      //Показывает ошибку
      this._showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      //Скрывает ошибку
      this._hideInputError(formElement, inputElement, validationConfig);
    }
  }

  _removeValidationErrors = (inputList, formElement, validationConfig) => {
    inputList.forEach(item => {
      this._hideInputError(formElement, item, validationConfig);
    });
  }

  //Активируем кнопку при открытие Модального окна
  _enableSubmitButton = (buttonItem, validationConfig) => {
    buttonItem.removeAttribute('disabled');
    buttonItem.classList.remove(validationConfig.inactiveButtonClass);
  }
}
