export default function attendanceReducer(state, action) {

    switch (action.type) {
        case 'FETCH_INIT_ATTENDANCE': {
            let attendanceArray = action.payload;
            if (action.payload === null) {
                return state;
            }
            return attendanceArray;
        }
        case 'EDIT_ATTENDANCE': {
            //let id = action.payload.hostelName;
            let attendanceArray = action.payload;
            for (let i = 0; i < attendanceArray.length; i++) {
                let aItem = attendanceArray[i];
                let attend = state.find(a => a.studentId === aItem.studentId && a.class === aItem.class && a.year === aItem.year
                    && a.month === aItem.month && a.section === aItem.section);
                let index = state.indexOf(attend);
                state = [...state.slice(0, index), ...state.slice(index + 1, state.length)].concat(aItem)
            }
            return state;
        }
        case 'DELETE_ATTENDANCE': {
            let attendanceArray = action.payload;
            for (let i = 0; i < attendanceArray.length; i++) {
                let aItem = attendanceArray[i];
                let attend = state.find(a => a.studentId === aItem.studentId && a.class === aItem.class && a.year === aItem.year
                    && a.month === aItem.month && a.section === aItem.section);
                let index = state.indexOf(attend);
                state = [...state.slice(0, index), ...state.slice(index + 1, state.length)]
            }
            return state;
        }
        default:
            return state;
    }
}