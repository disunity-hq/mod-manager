import { createReducer } from "typesafe-actions";
import { PackageDetails } from "../../../../models";
import { setFocusedPackage } from "./actions";
import { combineReducers } from "redux";

export type FocusedState = PackageDetails;

const initialState: PackageDetails = null;

const focused = createReducer(initialState).handleAction(setFocusedPackage,
  (state, action: ReturnType<typeof setFocusedPackage>): FocusedState => action.payload);


const packageDetailsReducer = combineReducers({
  focused
});

export default packageDetailsReducer;
