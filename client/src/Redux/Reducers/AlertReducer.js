import { GLOBALTYPE } from './../Actions/GlobalType';


const alertReducer = (state = {}, action) => {
    switch (action.type){
        case GLOBALTYPE.ALERT:
            return action.payload;
        default:
            return state;
    }
}


export default alertReducer