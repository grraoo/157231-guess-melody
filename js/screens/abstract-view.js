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
    const element = document.createElement(`div`);
    element.innerHTML = this.template;
    return element.firstChild;
  }

  bind() {
    // event hadlers if needed
  }
}

export default AbstractView;
