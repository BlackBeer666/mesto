const editButton = document.querySelector('.profile__editButton');
const closePopup = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name'); 
const profileProfession = document.querySelector('.profile__profession'); 
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__field_type_name');
const professionInput = document.querySelector('.form__field_type_profession');

// Функция открытия попапа и слушатель клика
function popupOpened() {
  popup.classList.add('popup_opened');
  nameInput.value = ProfileName.textContent; // Забираем данные с профиля
  professionInput.value = ProfileProfession.textContent // Забираем данные с профиля

}
editButton.addEventListener('click', popupOpened);


// Функция закрытия попапа и слушатель клика
function popupClose() {
  popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', popupClose);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);