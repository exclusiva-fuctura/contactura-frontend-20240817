import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  private _token = '';
  private _ondeEstou = 'dashboard';

  constructor() { }

  get ondeEstou(): string {
    return this._ondeEstou;
  }

  set ondeEstou(value: string) {
    this._ondeEstou = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: any) {
    this._token = value;
  }
}
