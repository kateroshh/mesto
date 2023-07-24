export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach(item => {
      //для теста
      //if(item.owner._id === '381eb7a7e0a4faf6ee0010f1') {
        this._renderer(item);
      //}
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
