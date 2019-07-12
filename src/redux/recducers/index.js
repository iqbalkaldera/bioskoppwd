import {combineReducers} from 'redux'
import userRedusers from './user'

export default combineReducers({
    user : userRedusers
})