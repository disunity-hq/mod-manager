import Store from 'electron-store';
import { Observable } from 'rxjs';
import { ValueChange } from '../models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PreferencesSchema {}

type PreferencesKey = keyof PreferencesSchema;

type PreferencesValue = PreferencesSchema[PreferencesKey];

export interface PreferencesOptions {
  name: string;
}

const defaults: Partial<PreferencesSchema> = {};

export class Preferences {
  private store: Store<PreferencesValue>;

  public constructor(opts: PreferencesOptions) {
    this.store = new Store({ ...opts, defaults });
  }

  public get<K extends PreferencesKey, V extends PreferencesSchema[K]>(key: K): V {
    // Convert to unknown to make compiler happy
    return (this.store.get(key) as unknown) as V;
  }

  public set<K extends PreferencesKey, V extends PreferencesSchema[K]>(
    key: K | Partial<PreferencesSchema>,
    value?: V
  ): void {
    if (typeof key === 'string') {
      this.store.set(key, value);
    } else {
      this.store.set(key);
    }
  }

  public delete<K extends PreferencesKey>(key: K): void {
    this.store.delete(key);
  }

  public onDidChange<K extends PreferencesKey>(
    key: K
  ): Observable<ValueChange<PreferencesSchema[K]>> {
    return new Observable(
      (observer): void => {
        this.store.onDidChange(
          key,
          (newValue, oldValue): void => {
            observer.next({ newValue, oldValue });
          }
        );
      }
    );
  }
}

const prefs = new Preferences({ name: 'user-prefs' });

export default prefs;
