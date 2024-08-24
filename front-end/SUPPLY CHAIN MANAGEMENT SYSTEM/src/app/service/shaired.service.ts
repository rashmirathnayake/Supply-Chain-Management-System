import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShairedService {

 public UserId:string ='asd'
 private _dataStream = new BehaviorSubject("");
  constructor() { }

  getDataStream() {
    return this._dataStream.asObservable();
}

putDataToStream(data: string) {
  this._dataStream.next(data)
  console.log("data updated")

}

public saveData(key: string, value: string) {
  localStorage.setItem(key, value);
}

public getData(key: string) {
  return localStorage.getItem(key)
}
public removeData(key: string) {
  localStorage.removeItem(key);
}

public clearData() {
  localStorage.clear();}

}