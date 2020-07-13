
export default function feeReducer(state, action) {

    switch (action.type) {
        case 'FETCH_INIT_FEES': {
            let fees = action.payload;
            if (action.payload === null) {
                return state;
            }
            return fees;
        }
        case 'ADD_FEE': {
            return state.concat(action.payload);
        }
        case 'DELETE_FEE': {
            //let id = action.payload.id;
            let fee = state.find(f => f.studentId === action.payload.studentId && f.session === action.payload.session
                && f.termId === action.payload.termId);
            let index = state.indexOf(fee);
            return [...state.slice(0, index), ...state.slice(index + 1, state.length)];

        }
        default:
            return state;

    }

}

/* export const initialFee = {
  admissionNo: '',
  firstName: '',
  lastName: '',
  class: '',
  section: '',
  paymentDetails: [
    {
      amountpaid: '',
      paidBy: '',
      datePaid: ''
    }
  ]
} */