import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root', useClass: StorageManageService
})
export class StorageManageService {

  constructor() { }

  set(key: string, value: any): any {
    return localStorage.setItem(key, value);
  }
  get(key: string): any {
    return localStorage.getItem(key);
  }
  clearAll(): any {
    localStorage.clear();
  }
  clear(key: string): any {
    localStorage.removeItem(key);
  }

}
