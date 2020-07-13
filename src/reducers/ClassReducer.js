
export default function classReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_CLASS': {
      let classes = action.payload;
      if (action.payload === null) {
        return state;
      }
      return classes;
    }
    case 'ADD_CLASS': {
      return state.concat(action.payload);
    }
    case 'EDIT_CLASS': {
      let id = action.payload;
      let clas = state.find(c => c.classId === id.classId && c.section === id.section);
      let index = state.indexOf(clas);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_CLASS': {
      let id = action.payload;
      let clas = state.find(c => c.classId === id.classId && c.section === id.section);
      let index = state.indexOf(clas);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }
}