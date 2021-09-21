import {GET_USER_AUTH} from "./type"

const globalReducer = (state, action)=>{
    switch(action.type){
        case GET_USER_AUTH:
            return{
                ...state,
                authInfo:action.payload
            }
        default:
            return state
    }
}

export default globalReducer