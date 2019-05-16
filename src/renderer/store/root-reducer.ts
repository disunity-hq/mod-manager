import { combineReducers } from 'redux';

import navBarReducer from '../components/window/reducers';

const rootReducer = combineReducers({
    navBar: navBarReducer
});

export default rootReducer;
