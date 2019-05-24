import { createStandardAction, createReducer } from "typesafe-actions";

import { SiderTheme } from "antd/lib/layout/Sider";

export const changeTheme = createStandardAction('CHANGE_THEME')<SiderTheme>();

const initialState: SiderTheme = "dark";

const reducer = createReducer(initialState).handleAction(changeTheme, (_state, action: any) => (action.payload));

export default reducer;
