export * from './PackageDetails';

export interface ValueChange<T> {
  oldValue: T;
  newValue: T;
}