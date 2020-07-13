
export default function expenseReducer(state, action) {

    switch (action.type) {
        case 'FETCH_INIT_EXPENSES': {
            let expense = action.payload;
            if (action.payload === null) {
                return state;
            }
            return expense;
        }
        case 'ADD_EXPENSE': {
            return state.concat(action.payload);
        }
        default:
            return state;

    }

}

/* export const initialExpense = {
  expenseType: '',
  firstName: '',
  lastName: '',
  mobile: '',
  email: '',
  paymentDetails: [
    {
      amountPaid: '',
      amountDue: '',
      datePaid: '',
      description: '',
    }
  ]
} */