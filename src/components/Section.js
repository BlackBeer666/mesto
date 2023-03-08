export default class Section {
  constructor({items, renderer}, containterSelector ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containterSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  }

  renderItems() {
    this._items.reverse().forEach((item) => {
      this.addItem(this._renderer(item))
    })
  }
}