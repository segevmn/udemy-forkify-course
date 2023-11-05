import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handlerFunc) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handlerFunc(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    // 299. implementing paginaton 2
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `${this._generateMarkupNextButton(currPage)}`;
    }
    // last page
    if (currPage === numPages && numPages > 1) {
      return `${this._generateMarkupPrevButton(currPage)}`;
    }
    // other page
    if (currPage < numPages) {
      return `
      ${this._generateMarkupPrevButton(currPage)}
      ${this._generateMarkupNextButton(currPage)}
    `;
    }
    // Page 1, and there are no other pages
    return '';
  }

  _generateMarkupPrevButton(page) {
    return `
        <button data-goto="${
          page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${page - 1}</span>
        </button>`;
  }

  _generateMarkupNextButton(page) {
    return `
    <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
`;
  }
}
export default new PaginationView();
