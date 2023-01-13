const editButton = document.querySelector('.profile__editbutton');
const closeButtons = document.querySelectorAll('.popup__closebutton');
const popupProfile = document.querySelector('#popup-profile');
const profileName = document.querySelector('.profile__name'); 
const profileProfession = document.querySelector('.profile__profession'); 
const formProfile = document.querySelector('#form-profile');
const nameInput = document.querySelector('.form__field_type_name');
const professionInput = document.querySelector('.form__field_type_profession');

// Функция открытия попапа
function openPopup(popupProfile) {
  popupProfile.classList.add('popup_opened');
}

//Слушатель клика на открытие и взять данные с сайта
editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent; // Забираем данные с сайта
  professionInput.value = profileProfession.textContent 
});

// Функция закрытия попапа 
function closePopup(popupProfile) {
  popupProfile.classList.remove('popup_opened');
}
// Универсальный слушатель клика закрытие попапа 
closeButtons.forEach(btn => {    //forEach перебираем все элементы с кнопкой
  const popup = btn.closest('.popup');  // ко всем родителям .popup используем функцию на закрытие
  btn.addEventListener('click', () => closePopup(popup)); 
}) 

// Отправка данные с профиля на сайт 
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', handleFormSubmit);


// 5 cпринт 
const cardTemplate = document.querySelector('.cards__template').content
const cardElement = document.querySelector('.cards__element');
const cardsContainer = document.querySelector('.cards') // выбираем секцию Cards, где будут вставлять картинки
const formCard = document.querySelector('#form-cards');
const popupCards = document.querySelector('#popup-cards');
const countryInput = formCard.querySelector('#card-name');
const urlInput = formCard.querySelector('#card-url');
const buttonOpenPopup = document.querySelector('.profile__addbutton'); 
const popupPhoto = document.querySelector('#popup-image');
const zoomPhoto = document.querySelector('.popup__image');
const description = document.querySelector('.popup__description');


buttonOpenPopup.addEventListener('click', () => {
  openPopup(popupCards)
})

function addCard(card) {
  const cardItems = cardTemplate.querySelector('.cards__element').cloneNode(true); //клонируем карточку
  const cardPhoto = cardItems.querySelector('.cards__photo');
// Передаем значение в карточки
  cardPhoto.src = card.link;
  cardPhoto.alt = card.name;
  cardItems.querySelector('.cards__text').textContent = card.name;

  // delete Card button
 cardItems.querySelector('.cards__trashbutton').addEventListener('click', function(deleteCard) {
  deleteCard.target.closest('.cards__element').remove();
 })

//add Like / delete Like 
cardItems.querySelector('.cards__likebutton').addEventListener('click', function(like) {
  like.target.classList.toggle('cards__likebutton_active');
})

//увеличение картинки
function zoom() {
  zoomPhoto.src = card.link;
  zoomPhoto.alt = card.name;
  description.textContent = card.name;
  openPopup(popupPhoto);
 }
 cardPhoto.addEventListener('click', zoom);
  return cardItems;
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {   
      name: countryInput.value,
      link: urlInput.value

  };

  cardsContainer.prepend(addCard(newCard)); // Добавляем в контейнер вначале с функцией addCard, параметр новой переменной  
  closePopup(popupCards); 
  evt.target.reset(); // сброс значений инпута
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