
export default function subjectReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_SUBJECTS': {
      let subjects = action.payload;
      if (action.payload === null) {
        return state;
      }
      return subjects;
    }
    case 'ADD_SUBJECT': {
      return state.concat(action.payload);
    }
    case 'EDIT_SUBJECT': {

      let sub = state.find(s => s.title === action.payload.title && s.class === action.payload.class);
      let index = state.indexOf(sub);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_SUBJECT': {
      //let id = action.payload.subjectCode;
      let sub = state.find(s => s.title === action.payload.title && s.class === action.payload.class);
      let index = state.indexOf(sub);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }
}