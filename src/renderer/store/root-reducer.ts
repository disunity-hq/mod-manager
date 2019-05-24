import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import navBarReducer from '../components/window/NavBar/reducers';
import theme from './theme-reducer';
import history from './history';


const rootReducer = combineReducers({
  navBar: navBarReducer,
  theme: theme,
  router: connectRouter(history)
});

export default rootReducer;

