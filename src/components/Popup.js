export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closingBtn = this._popup.querySelector('.popup__closebutton');
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener("keyup", this._handleEscClose);
  }


  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener("keyup", this._handleEscClose);
    
  }

  _handleEscClose = (evt) => {
    if(evt.key === "Escape") this.close();
  }

  _closeByOverlay = (evt) => {
    if(evt.target.classList.contains('popup')) this.close();
  }
  

  setEventListeners() {
    this._closingBtn.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._closeByOverlay);
  }
}