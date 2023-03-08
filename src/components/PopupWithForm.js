import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSumbit) {
    super(popupSelector)
    this._form = this._popup.querySelector('.form');
    this._handleSumbit = handleSumbit;
    this._inputList = Array.from(this._form.querySelectorAll('.form__field'));
    
  }

  _getInputValues() {
    return this._inputList.reduce((objValue,input) => {
      objValue[input.name] = input.value;
      return objValue;
    }, {}) 
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSumbit(this._getInputValues());
      this.close();
    });

  }

  close() {
    super.close();
    this._form.reset();
    
  }
}
  

