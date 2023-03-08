import "../pages/index.css";
import Card from "../components/Card.js";
import initialCards from "../utils/cards";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {
  buttonEditProfile,
  formProfile,
  nameInput,
  professionInput,
  formCard,
  buttonOpenPopup,
  validationConfig
}
from "../utils/constanst.js";


const profileFormValidator = new FormValidator(validationConfig, formProfile);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(validationConfig, formCard)
cardFormValidator.enableValidation();


const section = new Section({items: initialCards, renderer: (item) => createCard(item) }, '.cards');
const popupProfile = new PopupWithForm('#popup-profile', submitEditProfileForm);
popupProfile.setEventListeners();
const popupWithImage = new PopupWithImage('#popup-image');
popupWithImage.setEventListeners();
const popupCards = new PopupWithForm('#popup-cards', handleFormCardSubmit);
popupCards.setEventListeners();

const userInfo = new UserInfo('.profile__name','.profile__profession');

const handleCardClick = (name, link) => {
  popupWithImage.open(name, link);
}

//Слушатель клика на открытие и взять данные с сайта
buttonEditProfile.addEventListener('click', () => {
  popupProfile.open();
  const info = userInfo.getUserInfo();
  nameInput.value =  info.name // Забираем данные с сайта
  professionInput.value = info.about
  profileFormValidator.resetInput();
});


// Отправка данные с профиля на сайт 
function submitEditProfileForm(data) {
 userInfo.setUserInfo(data);
}

buttonOpenPopup.addEventListener('click', () => {
  popupCards.open();
  cardFormValidator.resetInput();
  formCard.reset();
})

function createCard(card) {
  const newCard = new Card(card, '.card-template', handleCardClick);
  return newCard.generateCard();
}

function handleFormCardSubmit(newCard) {
  section.addItem(createCard(newCard)); // Добавляем в контейнер вначале с функцией createCard, параметр новой переменной  
}

section.renderItems();