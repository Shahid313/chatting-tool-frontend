import { GETHOMEDATA, } from "../actions";


const initialState = {
    data: [],
   
  };
const HomeReducer =(state=initialState,action)=>{
    
   
    switch(action.type){
        
        case GETHOMEDATA:
           return {...state,data:action.payload}
        
        default:
            return state
    }
}
export default HomeReducer