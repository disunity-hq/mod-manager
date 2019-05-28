import * as navBarActions from '../components/window/NavBar/actions';
import * as packageDetailsActions from '../components/pages/ModDetails/actions';
import { changeTheme } from './theme-reducer';

export default {
  navBar: navBarActions,
  theme: changeTheme,
  packageDetails: packageDetailsActions
};
