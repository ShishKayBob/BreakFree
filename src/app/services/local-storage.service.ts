import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public restoreData(key: string): any {
    console.log(localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key) || 'null');
  }
}