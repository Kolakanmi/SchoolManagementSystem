
export default function gradeReducer(state, action){

  switch (action.type) {
    case 'FETCH_INIT_GRADES': {
      let gradesArray = action.payload;
      if (action.payload === null) {
        return state;
      }
      return gradesArray;
    }
    case 'EDIT_GRADES': {
      let gradesArray = action.payload;
      for (let i = 0; i < gradesArray.length; i++) {
        let aItem = gradesArray[i];
        let grade = state.find(g => g.studentId === aItem.studentId && g.class === aItem.class && g.year === aItem.year
            && g.term === aItem.term);
        let index = state.indexOf(grade);
        state = [...state.slice(0, index), ...state.slice(index + 1, state.length)].concat(aItem)
      }
      return state;
    }
    case 'DELETE_GRADE': {
      let gradeArray = action.payload;
      for (let i = 0; i < gradeArray.length; i++) {
        let aItem = gradeArray[i];
        let grade = state.find(g => g.studentId === aItem.studentId && g.class === aItem.class && g.year === aItem.year
            && g.term === aItem.term);
        let index = state.indexOf(grade);
        state = [...state.slice(0, index), ...state.slice(index + 1, state.length)]
      }
      return state;

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