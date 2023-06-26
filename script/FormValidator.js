export default class FormValidator {
	constructor(form, config) {
    this._config = config;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
	}

  //Проверка валидности полей ввода
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  resetValidation() {
    this._toggleButtonState(); //уплавление кнопкой

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) //очищаем ошибки
    });

  }

  _toggleButtonState = () => {
    // Если есть хотя бы одино невалидное поле ввода
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      // иначе сделай кнопку активной
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  //добавление слушателя на все поля ввода
  _setEventListeners = () => {
    //провека валидности полей ввода
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);

        //провека валидности полей ввода
        this._toggleButtonState();
      });
    });
  };

  //Находит все формы и вешает на поля ввода слушатель событий
  enableValidation = () => {
    this._setEventListeners();
  }

  //Добавляет класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  //Удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  // Проверяет валидность поля ввод
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      //Показывает ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      //Скрывает ошибку
      this._hideInputError(inputElement, this._config);
    }
  }
}
