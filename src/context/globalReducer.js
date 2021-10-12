// const globalReducer = (state, action)=>{
//     switch(action.type){
//         case GET_USER_AUTH:
//             return{
//                 ...state,
//                 authInfo:action.payload
//             }
//         default:
//             return state
//     }
// }
import {CHANGE_INPUT} from "./actionType"
import set from "loadsh/set"

export const builderReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return set({...state}, action.payload.key, action.payload.value)
        
        // [action.payload.key]:action.payload.value
        
      

    default:
      return {...state};
  }
};
