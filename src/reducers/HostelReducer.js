
export default function hostelReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_HOSTELS': {
      let hostels = action.payload;
      if (action.payload === null) {
        return state;
      }
      return hostels;
    }
    case 'ADD_HOSTEL': {
      return state.concat(action.payload);
    }
    case 'EDIT_HOSTEL': {
      //let id = action.payload.hostelName;
      let host = state.find(h => h.name === action.payload.name && h.roomNumber === action.payload.roomNumber);
      let index = state.indexOf(host);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_HOSTEL': {
      //let id = action.payload.id;
      let host = state.find(h => h.name === action.payload.name && h.roomNumber === action.payload.roomNumber);
      let index = state.indexOf(host);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }

}