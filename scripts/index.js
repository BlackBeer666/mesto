const editButton = document.querySelector('.profile__editbutton');
const closePopup = document.querySelector('.popup__closebutton');
const popupProfile = document.querySelector('#popup-profile');
const profileName = document.querySelector('.profile__name'); 
const profileProfession = document.querySelector('.profile__profession'); 
const formProfile = document.querySelector('#form-profile');
const nameInput = document.querySelector('.form__field_type_name');
const professionInput = document.querySelector('.form__field_type_profession');

// Функция открытия попапа
function popupOpened(popupProfile) {
  popupProfile.classList.add('popup_opened');
}

//Слушатель клика на открытие и взять данные с сайта
editButton.addEventListener('click', () => {
  popupOpened(popupProfile)
  nameInput.value = profileName.textContent; // Забираем данные с сайта
  professionInput.value = profileProfession.textContent 
});

// Функция закрытия попапа 
function popupClose(popupProfile) {
  popupProfile.classList.remove('popup_opened');
}
//Слушатель клика на закрытие
closePopup.addEventListener('click', () => {
  popupClose(popupProfile)
});
// Отправка данные с профиля на сайт 
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupClose(popupProfile);
}

formProfile.addEventListener('submit', handleFormSubmit);


// 5 cпринт 
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


cardElements = document.querySelector('.cards__element');
cardTemplate = document.querySelector('.cards__template').content
cardsContainer = document.querySelector('.cards') // выбираем секцию Cards, где будут вставлять картинки
const formCards = document.querySelector('#form-cards');
popupCards = document.querySelector('#popup-cards');
countryInput = formCards.querySelector('#card-name');
urlInput = formCards.querySelector('#card-url');
addNewCard = document.querySelector('.profile__addbutton');
closePopupCards = document.querySelector('#close-cards');
popupPhoto = document.querySelector('#popup-image');
zoomPhoto = document.querySelector('.popup__image');
closePopupPhoto = document.querySelector('#close-photo');
description = document.querySelector('.popup__description');


addNewCard.addEventListener('click', () => {
  popupOpened(popupCards)
})

closePopupCards.addEventListener('click', () => {
  popupClose(popupCards)
})


function addCard(card) {
  const cardItems = cardTemplate.querySelector('.cards__element').cloneNode(true); //клонируем карточку
// Передаем значение в карточки
  cardItems.querySelector('.cards__text').textContent = card.name;
  cardItems.querySelector('.cards__photo').src = card.link;
  cardItems.querySelector('.cards__photo').alt = card.name;

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
  popupOpened(popupPhoto);
 }

 cardItems.querySelector('.cards__photo').addEventListener('click', zoom);

 closePopupPhoto.addEventListener('click', () => {
  popupClose(popupPhoto);
 });
  return cardItems;
}


function handleFormCardsSubmit(evt) {
  evt.preventDefault();
  
  const newCard = {   
      name: countryInput.value,
      link: urlInput.value

  };

  cardsContainer.prepend(addCard(newCard)); // Добавляем в контейнер вначале с функцией addCard, параметр новой переменной  
  popupClose(popupCards);
  evt.target.reset(); // сброс значений инпута
}
formCards.addEventListener('submit', handleFormCardsSubmit); // Отправка формы карточки


// Добавление автоматических карточек
function addInitialCards() {
  initialCards.forEach((card) => {
    const cardHtml = addCard(card)
    cardsContainer.append(cardHtml);  
  })
}
addInitialCards();