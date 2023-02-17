class Card {
  constructor(card, templateSelector, zoom) {
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._cardImage =  this._element.querySelector('.cards__photo');
    this._cardName = this._element.querySelector('.cards__text');
    this._likeCard = this._element.querySelector('.cards__likebutton');
    this._trashCard = this._element.querySelector('.cards__trashbutton');
    
    this._zoomCard = zoom;
    console.log(this._zoomCard);
  }

// Получить шаблон
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.cards__element').cloneNode(true);
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;

  }

  _setLike() {
    this._likeCard.classList.toggle('cards__likebutton_active');
  }

  _deleteCard() {
    this._element.remove();
  }
  _setEventListeners() {
    this._likeCard.addEventListener('click', () => this._setLike());
    this._trashCard.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', () => this._zoomCard(this._name, this._link));
  }
}

export default Card