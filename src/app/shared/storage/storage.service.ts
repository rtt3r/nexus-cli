import { Injectable } from '@angular/core';

const APP_PREFIX = 'NEXUS-';

export abstract class StorageService {

  constructor(private storage: Storage) { }

  static loadStateFromSessionStorage() {
    return this.loadStateFromStorage(sessionStorage);
  }

  static loadStateFromLocalStorage() {
    return this.loadStateFromStorage(localStorage);
  }

  private static loadStateFromStorage(storage: Storage) {
    return Object.keys(storage)
      .filter(key => key.includes(APP_PREFIX))
      .reduce((state: any, storageKey) => {
        const stateKeys = storageKey
          .replace(APP_PREFIX, '')
          .toLowerCase()
          .split('.')
          .map(key =>
            key
              .split('-')
              .map((token, index) =>
                index === 0
                  ? token
                  : token.charAt(0).toUpperCase() + token.slice(1)
              )
              .join('')
          );

        let currentStateRef = state;

        stateKeys.forEach((key, index) => {
          if (index === stateKeys.length - 1) {
            const storageItem = storage.getItem(storageKey);

            if (!!storageItem && storageItem !== "undefined") {
              currentStateRef[key] = JSON.parse(storageItem);
              return;
            }
          }

          currentStateRef[key] = currentStateRef[key] || {};
          currentStateRef = currentStateRef[key];
        });

        return state;
      }, {});
  }

  setItem(key: string, value: any) {
    if (!Object.isNil(value)) {
      this.storage.setItem(`${APP_PREFIX}${key.toUpperCase()}`, JSON.stringify(value));
      return;
    }

    this.storage.removeItem(key);
  }

  getItem(key: string) {
    const value = this.storage.getItem(`${APP_PREFIX}${key.toUpperCase()}`);

    if (!Object.isNil(value)) {
      return JSON.parse(value);
    }

    return '';
  }

  getItemAs<T>(key: string) {
    return this.getItem(key) as T;
  }

  removeItem(key: string) {
    this.storage.removeItem(`${APP_PREFIX}${key.toUpperCase()}`);
  }
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService extends StorageService {
  constructor() {
    super(localStorage)
  }
}

@Injectable({ providedIn: 'root' })
export class SessionStorageService extends StorageService {
  constructor() {
    super(sessionStorage)
  }
}
