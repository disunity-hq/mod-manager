import { ActionBuilderConstructor, TypeConstant } from 'typesafe-actions/dist/type-helpers';
import { createStandardAction } from 'typesafe-actions';

export interface AsyncMetaActionCreator<
  TRequest extends [T1, P1, M1],
  TSuccess extends [T2, P2, M2],
  TFailure extends [T3, P3, M3],
  TCancel extends [T4, P4, M4] = never,
  T1 extends TypeConstant = TRequest[0],
  P1 = TRequest[1],
  M1 = TRequest[2],
  T2 extends TypeConstant = TSuccess[0],
  P2 = TSuccess[1],
  M2 = TSuccess[2],
  T3 extends TypeConstant = TFailure[0],
  P3 = TFailure[1],
  M3 = TFailure[2],
  T4 extends TypeConstant = TCancel[0],
  P4 = TCancel[1],
  M4 = TCancel[2]
> {
  request: ActionBuilderConstructor<T1, P1, M1>;
  success: ActionBuilderConstructor<T2, P2, M2>;
  failure: ActionBuilderConstructor<T3, P3, M3>;
  cancel: TCancel extends [TypeConstant, any, any] ? ActionBuilderConstructor<T4, P4, M4> : never;
}
export interface AsyncMetaActionBuilder<
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
> {
  <
    TPayload1,
    TPayload2,
    TPayload3,
    TPayload4,
    TMeta1 = string,
    TMeta2 = TMeta1,
    TMeta3 = TMeta1,
    TMeta4 = TMeta1
  >(): AsyncMetaActionCreator<
    [TType1, TPayload1, TMeta1],
    [TType2, TPayload2, TMeta2],
    [TType3, TPayload3, TMeta3],
    [TType4, TPayload4, TMeta4]
  >;
  <
    TPayload1,
    TPayload2,
    TPayload3,
    TMeta1 = string,
    TMeta2 = TMeta1,
    TMeta3 = TMeta1
  >(): AsyncMetaActionCreator<
    [TType1, TPayload1, TMeta1],
    [TType2, TPayload2, TMeta2],
    [TType3, TPayload3, TMeta3]
  >;
}
/**
 * implementation
 */

export const createAsyncMetaAction = <
  TType1 extends TypeConstant,
  TType2 extends TypeConstant,
  TType3 extends TypeConstant,
  TType4 extends TypeConstant
>(
  requestType: TType1,
  successType: TType2,
  failureType: TType3,
  cancelType?: TType4
): AsyncMetaActionBuilder<TType1, TType2, TType3, TType4> => {
  const constructor = (<
    TPayload1,
    TPayload2,
    TPayload3,
    TPayload4,
    TMeta1,
    TMeta2,
    TMeta3,
    TMeta4
  >() => {
    if (cancelType) {
      return {
        request: createStandardAction(requestType)<TPayload1, TMeta1>(),
        success: createStandardAction(successType)<TPayload2, TMeta2>(),
        failure: createStandardAction(failureType)<TPayload3, TMeta3>(),
        cancel: createStandardAction(cancelType)<TPayload4, TMeta4>(),
      };
    } else {
      return {
        request: createStandardAction(requestType)<TPayload1, TPayload4>(),
        success: createStandardAction(successType)<TPayload2, TMeta1>(),
        failure: createStandardAction(failureType)<TPayload3, TMeta2>(),
      };
    }
  }) as AsyncMetaActionBuilder<TType1, TType2, TType3, TType4>;

  const api = Object.assign<AsyncMetaActionBuilder<TType1, TType2, TType3, TType4>, {}>(
    constructor,
    {
      // extension point for chain api
    }
  );

  return api;
};
