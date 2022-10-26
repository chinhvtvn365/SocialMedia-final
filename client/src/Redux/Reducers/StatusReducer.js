import { GLOBALTYPE } from './../Actions/GlobalType';


const statusReducer = (state = false, action) => {
    switch (action.type){
        case GLOBALTYPE.STATUS:
            return action.payload;
        default:
            return state;
    }
}


export default statusReducer