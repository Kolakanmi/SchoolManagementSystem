
export default function teacherReducer(state, action) {

  switch (action.type) {
    case 'FETCH_INIT_TEACHERS': {
      let teachers = action.payload;
      if (action.payload === null) {
        return state;
      }
      return teachers;
    }
    case 'ADD_TEACHER': {
      return state.concat(action.payload);
    }
    case 'EDIT_TEACHER': {
      //let id = action.payload.employmentNumber;
      let teacher = state.find(teach => teach.employmentNumber === action.payload.employmentNumber);
      let index = state.indexOf(teacher);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_TEACHER': {
      let id = action.payload;
      let teacher = state.find(teach => teach.employmentNumber === id);
      let index = state.indexOf(teacher);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }


}

/* export const initialTeacher = {
  employmentNo: 0,
  firstName: '',
  lastName: '',
  gender: '',
  mobile: '',
  email: '',
  dateOfBirth: '',
  religion: '',
  photo: '',
  class: '',
  section: '',
  subjects: [],
  defaultSalary: '',
  salaryPayment: [
    {
      session: '',
      monthOf: '',
      amountPaid: '',
      amountDue: '',
    }
  ]

} */