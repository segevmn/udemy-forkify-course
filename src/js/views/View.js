import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the recieved object to the dom
   * @param {(Object|Object[])} data- The data to be rendered(e.g. recipe)
   * @param {boolean} [render=true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View Instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._insertHtml('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._insertHtml('afterbegin', markup);
  }

  // 295. implementing error and success messages
  renderError(errMessage = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${errMessage}</p>
        </div>`;
    this._clear();
    this._insertHtml('afterbegin', markup);
  }

  renderMessage(sccsMessage = this._successMessage) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${sccsMessage}</p>
        </div>`;
    this._clear();
    this._insertHtml('afterbegin', markup);
  }

  update(data) {
    // 302. developing DOM updating algorithm
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // updates changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // updates changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = ''; //remove the meesage from the beginning
  }

  _insertHtml(location, markup) {
    this._parentEl.insertAdjacentHTML(location, markup);
  }
}
