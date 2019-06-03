export * from './PackageDetails';

export * from './GameData';

export interface ValueChange<T> {
  oldValue: T;
  newValue: T;
}

export interface Loadable {
  loading?: boolean;
  error?: Error;
}
