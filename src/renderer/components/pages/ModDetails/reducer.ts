import { createReducer } from "typesafe-actions";
import { IPackageDetails } from "../../../../models";
import { setFocusedPackage } from "./actions";
import { combineReducers } from "redux";

export type FocusedState = IPackageDetails;

const initialState: IPackageDetails = null;

const focused = createReducer(initialState).handleAction(setFocusedPackage,
  (state, action: ReturnType<typeof setFocusedPackage>): FocusedState => action.payload);


const packageDetailsReducer = combineReducers({
  focused
});

export default packageDetailsReducer;
