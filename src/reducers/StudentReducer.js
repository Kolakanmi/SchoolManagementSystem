export default function studentReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT_STUDENTS': {
      let students = action.payload;
      if (action.payload === null) {
        return state;
      }
      return students;
    }
    case 'ADD_STUDENT': {
      return state.concat(action.payload);
    }
    case 'EDIT_STUDENT': {
      let student = state.find(stud => stud.admissionNumber === action.payload.admissionNumber);
      let index = state.indexOf(student);
      let oldState = [...state.slice(0, index), ...state.slice(index + 1, state.length)];
      return oldState.concat(action.payload);
    }
    case 'DELETE_STUDENT': {
      let id = action.payload;
      let student = state.find(stud => stud.admissionNumber === id);
      let index = state.indexOf(student);
      return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

    }
    default: 
      return state;

  }

}

/* {
  admissionNo: 1,
  firstName: '',
  lastName: '',
  class: '',
  section: '',
  gender: '',
  dateOfBirth: '',
  religion: '',
  photo: '',
  fatherName: '',
  fatherMobile: '',
  fatherEmail: '',
  fatherOccupation: '',
  motherName: '',
  motherMobile: '',
  motherEmail: '',
  motherOccupation: '',
  address: '',
  discount: '',
  fees: [
    {
      session: '',
      term: '',
      payments: [
        {
          amountToBePaid: '',
          amountPaid: '',
          amountDue: '',
          paymentDate: '',
        }
      ]
    }
  ]

} */