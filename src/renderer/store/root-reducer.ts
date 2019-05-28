import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import navBarReducer from '../components/window/NavBar/reducers';
import packageDetailsReducer from '../components/pages/ModDetails/reducer';
import themeReducer from './theme-reducer';
import history from './history';


const rootReducer = combineReducers({
  navBar: navBarReducer,
  theme: themeReducer,
  router: connectRouter(history),
  packageDetails: packageDetailsReducer
});

export default rootReducer;

