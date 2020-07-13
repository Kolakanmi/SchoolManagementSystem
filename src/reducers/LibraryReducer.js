
export default function libraryReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_BOOKS': {
      let books = action.payload;
      if (action.payload === null) {
        return state;
      }
      return books;
    }
    case 'ADD_BOOK': {
      return state.concat(action.payload);
    }
    case 'EDIT_BOOK': {

      let book = state.find(b => b.bookId === action.payload.bookId);
      let index = state.indexOf(book);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_BOOK': {
      let id = action.payload;
      let book = state.find(b => b.bookId === id);
      let index = state.indexOf(book);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }

}

/* export const initialLibrary = {
  title: '',
  subject: '',
  edition: '',
  author: '',
  class: '',
  publishedBy: '',
  publishingYear: '',
  supplierName: '',
  supplierNumber: '',
  uploadDate: '',
  bookId: '',
  price: '',
} */