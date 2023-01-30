const objValidation = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submitbutton',
  inactiveButtonClass: 'form__submitbutton_inactive', //
  inputErrorClass: 'form_type-error',
  errorClass: 'form__field-error_active'
};

// Добавить ошибку валидации
const showInputError = (formElement, inputElement, errorMessage, objValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objValidation.inputErrorClass);
  errorElement.classList.add(objValidation.errorClass);
  errorElement.textContent = errorMessage;
};

// Убрать ошибку валидации

const hideInputError = (formElement, inputElement, objValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objValidation.inputErrorClass);
  errorElement.classList.remove(objValidation.errorClass);
  errorElement.textContent = '';
};

// Функция проверки валидности инпута 

const checkInputValidity = (formElement, inputElement, objValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objValidation);
  } else {
    hideInputError(formElement, inputElement, objValidation);
  }
}

//Есть ли здесь хотя бы одно поле, которое не прошло валидацию?
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
};

//Функция которая отвечат за блокировку кнопки
const toggleButtonState = (inputList, buttonElement, objValidation) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(objValidation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');

  } else {
    buttonElement.classList.remove(objValidation.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };
};

// Отключить кнопку при открытии формы
const disableButton = (formElement, objValidation) => {
  const disable = formElement.querySelector(objValidation.submitButtonSelector);
    disable.classList.add(objValidation.inactiveButtonClass);
    disable.setAttribute('disabled', 'disabled');
}


const setEventListeners = (formElement, objValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(objValidation.inputSelector));
  const buttonElement = formElement.querySelector(objValidation.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objValidation);
  disableButton(formElement, objValidation);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, objValidation);
        toggleButtonState(inputList, buttonElement, objValidation);
     });
  });
};

const enableValidation = (objValidation) => {
  const formList = Array.from(document.querySelectorAll(objValidation.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement, objValidation);
    });
}


enableValidation(objValidation);




