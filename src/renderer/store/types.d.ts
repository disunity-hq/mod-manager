import { StateType, ActionType } from 'typesafe-actions';
import { rootAction, rootReducer } from './root';


export type Store = StateType<typeof import('./index').default>;

export type RootState = StateType<typeof rootReducer>;

export type RootAction = ActionType<typeof rootAction>;

interface Types {
  RootAction: RootAction;
}
