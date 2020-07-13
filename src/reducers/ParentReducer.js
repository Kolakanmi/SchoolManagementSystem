export default function parentReducer(state, action){

  switch(action.type){
    case 'FETCH_INIT_PARENTS': {
      let parents = action.payload;
      if (action.payload === null) {
        return state;
      }
      return parents
    }
    case 'ADD_PARENT': {
      let siblingPar = state.find(sp => sp.parentId === action.payload.parentId);
        //let siblingPar = state.find(sp => sp.gender === action.payload.gender && sp.childrenId.includes(action.payload.childId));
      if (siblingPar) {
        let index = state.indexOf(siblingPar);
        let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
        return oldState.concat(siblingPar);
      } else{
        return state.concat(action.payload);
      }

    }
    case 'EDIT_PARENT': {
      let parent = state.find(par => par.parentId === action.payload.parentId);
      let index = state.indexOf(parent);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(parent);
    }
    case 'DELETE_PARENT': {
      let id = action.payload;
      let parent = state.find(par => par.parentId === id);
      let index = state.indexOf(parent);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default:
      return state;

  }

}

/* export const initialParent = {
  id: 0,
  firstName: '',
  lastName: '',
  gender: '',
  mobile: '',
  email: '',
  occupation: '',
  numberOfChildren: 0,
  totalFees: 0,
  address: ''
} */
