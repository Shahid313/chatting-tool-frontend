import {combineReducers} from 'redux'
import HomeReducer from './home_reducer'
import MessagesReducer from './messages_reducer'
const allReducers =combineReducers({
    homeData:HomeReducer,
    messagesData:MessagesReducer
 
})

export default allReducers