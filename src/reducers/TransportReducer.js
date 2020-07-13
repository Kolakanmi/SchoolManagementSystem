
export default function transportReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_TRANSPORTS': {
      let transports = action.payload;
      if (action.payload === null) {
        return state;
      }
      return transports;
    }
    case 'ADD_TRANSPORT': {
      return state.concat(action.payload);
    }
    case 'EDIT_TRANSPORT': {
      let tran = state.find(t => t.driverName === action.payload.driverName && t.driverMobile === action.payload.driverMobile
        && t.routeName === action.payload.routeName);
      let index = state.indexOf(tran);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_TRANSPORT': {
      let id = action.payload.id;
      let tran = state.find(t => t.driverName === action.payload.driverName && t.driverMobile === action.payload.driverMobile
          && t.routeName === action.payload.routeName);
      let index = state.indexOf(tran);
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
  routeName: '',
  price: '',
} */