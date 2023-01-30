const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submitbutton',
  inactiveButtonClass: 'form__submitbutton_inactive', //
  inputErrorClass: 'form_type-error',
  errorClass: 'form__field-error_active'
};

// Добавить ошибку валидации
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

// Убрать ошибку валидации

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности инпута 

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

//Есть ли здесь хотя бы одно поле, которое не прошло валидацию?
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

//Функция которая отвечат за блокировку кнопки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');

  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};


// Переберем все формы на страницы и каждой форме вызоваем setEventListeners! На вход дадим элемент(инпут) формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
     });
  });
};

// Отключить кнопку при открытии формы
const disableButton = (formElement, validationConfig) => {
  const disable = formElement.querySelector(validationConfig.submitButtonSelector);
    disable.classList.add(validationConfig.inactiveButtonClass);
    disable.setAttribute('disabled', 'disabled');
}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        disableButton(formElement, validationConfig);
      });
      setEventListeners(formElement, validationConfig);
    });
}


enableValidation(validationConfig);




