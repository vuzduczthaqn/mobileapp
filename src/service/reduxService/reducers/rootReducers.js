import {combineReducers} from 'redux';
import appReducer from './appReducer';
import loginReducer from './loginReducer';
const rootReduces = combineReducers({
    appReducer:appReducer,
    loginReducer:loginReducer,
});
export default rootReduces;