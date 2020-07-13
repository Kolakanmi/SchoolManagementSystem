
export default function noticeReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_NOTICE': {
      let notice = action.payload;
      if (action.payload === null) {
        return state;
      }
      return notice;
    }
    case 'ADD_NOTICE': {
      return state.concat(action.payload);
    }
    case 'DELETE_NOTICE': {
      //let id = action.payload.id;
      let notice = state.find(n => n.title === action.payload.title && n.details === action.payload.details
          && n.postedBy === action.payload.postedBy && n.datePosted === action.payload.datePosted);
      let index = state.indexOf(notice);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }
}