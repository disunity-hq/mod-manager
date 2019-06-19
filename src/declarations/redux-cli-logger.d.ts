declare module 'redux-cli-logger' {
  import { Action } from 'typesafe-actions';
  import { Middleware } from 'redux';

  export interface LoggerOptions {
    downArrow?: string;
    rightArrow?: string;
    messageColor?: string;
    prevColor?: string;
    actionColor?: string;
    nextColor?: string;
    log?: typeof console.log;
    // when non-null, only prints if predicate(getState, action) is truthy
    predicate?: null;
    // useful to trim parts of the state atom that are too verbose
    stateTransformer?: (state: any) => any;
    // useful to censor private messages (containing password, etc.)
    actionTransformer?: (action: any) => any;
  }
  const createLogger: (opts: LoggerOptions) => Middleware;

  export default createLogger;
}
