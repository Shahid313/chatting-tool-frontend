import { GETMESSAGESDATA, } from "../actions";


const initialState = {
    data: [],
   
  };
const MessagesReducer =(state=initialState,action)=>{
    
   
    switch(action.type){
        
        case GETMESSAGESDATA:
           return {...state,data:action.payload}
        
        default:
            return state
    }
}
export default MessagesReducer