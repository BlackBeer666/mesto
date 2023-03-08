import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._zoomPhoto = this._popup.querySelector('.popup__image');
    this._description = this._popup.querySelector('.popup__description');
  }

  open(name, link) {
    super.open();

    this._zoomPhoto.src = link;
    this._zoomPhoto.alt = name;
    this._description.textContent = name;
  }

}
