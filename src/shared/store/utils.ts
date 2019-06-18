import { createCustomAction } from 'typesafe-actions';
import { ActionBuilderConstructor, TypeConstant } from 'typesafe-actions/dist/type-helpers';

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
