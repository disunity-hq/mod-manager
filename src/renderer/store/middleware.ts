import { Middleware } from "redux";
import { RootState } from "./types";
import { setNavBar1Expanded, setNavBar2Expanded } from "../components/window/NavBar/actions";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const navbarClose: Middleware = ({ dispatch, getState }) => next => action => {
  const returnValue = next(action);
  if (action.type === "@@router/LOCATION_CHANGE") {
    const state: RootState = getState();
    const segments = state.router.location.pathname.split('/').filter(s => s);
    console.log(segments);
    switch (segments.length) {
      case 0:
        dispatch(setNavBar1Expanded(true));
        break;
      case 1:
        dispatch(setNavBar1Expanded(false));
        dispatch(setNavBar2Expanded(true));
        break;
      default:
        break;
    }
  }
  return returnValue;
}
