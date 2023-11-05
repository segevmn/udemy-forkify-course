import View from './View.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage = '';

  addHandlerRender(handlerFunc) {
    window.addEventListener('load', handlerFunc);
  }

  // 304. implementing bookmarks 2
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarkView();
