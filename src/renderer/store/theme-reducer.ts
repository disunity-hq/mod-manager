import { createStandardAction, createReducer } from "typesafe-actions";

import { SiderTheme } from "antd/lib/layout/Sider";

export const changeTheme = createStandardAction('CHANGE_THEME')<SiderTheme>();

const initialState: SiderTheme = "light";

const reducer = createReducer<SiderTheme>(initialState).handleAction(changeTheme, (_state, action: ReturnType<typeof changeTheme>) => (action.payload));

export default reducer;
