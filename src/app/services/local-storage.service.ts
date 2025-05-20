import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public $savedData!: BehaviorSubject<any>;

  private breakfreeData: any;

  public saveData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.breakfreeData = data;
    this.$savedData = new BehaviorSubject(this.breakfreeData);
  }

  public restoreData(key: string) {
    const localData = JSON.parse(localStorage.getItem(key) || 'null');
    this.breakfreeData = localData ? localData : { debts: [] };
    this.$savedData = new BehaviorSubject(this.breakfreeData);
  }
}