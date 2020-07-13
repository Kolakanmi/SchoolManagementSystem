
export default function profileReducer(state, action) {

  switch(action.type) {
    case 'ADD_PROFILE': {
      let prof = action.payload;
      //return Object.assign(state, prof)

      return {...prof}
    }
    case 'DELETE_PROFILE': {
      return {}
    }
    default:
      return state;
  }

}