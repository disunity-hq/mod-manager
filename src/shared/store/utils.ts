import { createCustomAction, createAsyncAction } from 'typesafe-actions';
import {
  ActionBuilderConstructor,
  TypeConstant,
  ActionCreator,
  PayloadMetaAC,
} from 'typesafe-actions/dist/type-helpers';
import { createAliasedAction } from 'electron-redux';

interface LocalMeta {
  scope: 'local';
}

type LocalMetaType<M> = LocalMeta & M;

export interface LocalAction<
  TType extends TypeConstant = string,
  TPayload = undefined,
  TMeta extends {} = undefined
> {
  type: TType;
  payload: TPayload;
  meta: LocalMetaType<TMeta>;
}

export const createLocalAction = <TType extends TypeConstant>(type: TType) => <
  TPayload = undefined,
  TMeta extends {} = undefined
>() =>
  createCustomAction(type, type => (payload: TPayload, meta: TMeta): LocalAction<
    TType,
    TPayload,
    TMeta
  > => ({
    type,
    payload,
    meta: { scope: 'local', ...meta },
  })) as ActionBuilderConstructor<TType, TPayload, TMeta>;

export const createTypesafeAliasedAction = <T extends TypeConstant>(
  type: T,
  creator: ActionCreator<T>
) => {
  const action = createAliasedAction(type, creator);
  action.getType = () => type;
  return action;
};
