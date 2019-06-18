import { StateType, ActionType } from 'typesafe-actions';
import { rootAction, rootReducer, configureStore } from '.';

export type Store = StateType<ReturnType<typeof configureStore>>;

export type RootState = StateType<typeof rootReducer>;

export type RootAction = ActionType<typeof rootAction>;

export type StoreScope = 'main' | 'renderer';

interface Types {
  RootAction: RootAction;
}
