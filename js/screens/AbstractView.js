import getElementFromTemplate from "../utils/getElementFromTemplate";

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't create Abstract view, need concrete one!`);
    }
  }

  get template() {
    throw new Error(`Template is required!`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }
  render() {
    return getElementFromTemplate(this.template);
  }

  bind(element) {
    return element;
    // event hadlers if needed
  }
}

export default AbstractView;
