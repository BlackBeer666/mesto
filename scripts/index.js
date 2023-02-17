import Card from "./Card.js"
import FormValidator from "./FormValidator.js";

// Массив с автоматическими карточками  
const initialCards = [
  {
    name: 'Турция',
    link: './images/turkey.jpg'
  },
  {
    name: 'Таллин',
    link: './images/tallin.jpg'
  },
  {
    name: 'Кипр',
    link: './images/kipr.jpg'
  },
  {
    name: 'Швеция',
    link: './images/swe.jpg'
  },
  {
    name: 'Испания',
    link: './images/ispanion.jpg'
  },
  {
    name: 'Карачаево-Черкесская Республика',
    link: './images/karachaevsk.jpg'
  }
];  

const editButton = document.querySelector('.profile__editbutton');
const closeButtons = document.querySelectorAll('.popup__closebutton');
const popupProfile = document.querySelector('#popup-profile');
const profileName = document.querySelector('.profile__name'); 
const profileProfession = document.querySelector('.profile__profession'); 
const formProfile = document.querySelector('#form-profile');
const nameInput = document.querySelector('.form__field_type_name');
const professionInput = document.querySelector('.form__field_type_profession');
// 5 cпринт 
const cardsContainer = document.querySelector('.cards') // выбираем секцию Cards, где будут вставлять картинки
const formCard = document.querySelector('#form-cards');
const popupCards = document.querySelector('#popup-cards');
const countryInput = formCard.querySelector('#card-name');
const urlInput = formCard.querySelector('#card-url');
const buttonOpenPopup = document.querySelector('.profile__addbutton'); 
const popupPhoto = document.querySelector('#popup-image');
const zoomPhoto = document.querySelector('.popup__image');
const description = document.querySelector('.popup__description');


// validation 

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submitbutton',
  inactiveButtonClass: 'form__submitbutton_inactive', //
  inputErrorClass: 'form_type-error',
  errorClass: 'form__field-error_active'
};


const profileFormValidator = new FormValidator(validationConfig, formProfile)
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, formCard)
cardFormValidator.enableValidation();


//Закрытие нажатием кнпоки ESC 

const closeEscape = (evt) => {
  evt.preventDefault();
  if(evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//Закрытие по оверлею 

const closeOverlay = Array.from(document.querySelectorAll('.popup'));
  closeOverlay.forEach((popupItem) => {
    popupItem.addEventListener('click', function (evt) {
      if(evt.target.classList.contains('popup')) {
      closePopup(popupItem);
    };
  });
  });

// Функция открытия попапа(универсальный)
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keyup", closeEscape);

}
// Функция закрытия попапа(универсальный)
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keyup", closeEscape);
}

//Слушатель клика на открытие и взять данные с сайта
editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent; // Забираем данные с сайта
  professionInput.value = profileProfession.textContent 
  profileFormValidator.resetInpit();
});


// Универсальный слушатель клика закрытие попапа 
closeButtons.forEach(btn => {    //forEach перебираем все элементы с кнопкой
  const popup = btn.closest('.popup');  // ко всем родителям .popup используем функцию на закрытие
  btn.addEventListener('click', () => closePopup(popup)); 
}) 

// Отправка данные с профиля на сайт 
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', submitEditProfileForm);


buttonOpenPopup.addEventListener('click', () => {
  cardFormValidator.resetInpit();
  formCard.reset();
  openPopup(popupCards)
})

function addCard(card) {
  const newCard = new Card(card, '.card-template', zoom);
  return newCard.generateCard();
}

function zoom(name, link) {
  zoomPhoto.src = link;
  zoomPhoto.alt = name;
  description.textContent = name;
  openPopup(popupPhoto);
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {   
      name: countryInput.value,
      link: urlInput.value

  };

  cardsContainer.prepend(addCard(newCard)); // Добавляем в контейнер вначале с функцией addCard, параметр новой переменной  
  closePopup(popupCards); // сброс значений инпута
}
formCard.addEventListener('submit', handleFormCardSubmit); // Отправка формы карточки


// Добавление автоматических карточек
function addInitialCards() {
  initialCards.forEach((card) => {
    const cardHtml = addCard(card)
    cardsContainer.append(cardHtml);  
  })
}
addInitialCards();