import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { ILogin } from '../models/login.interface';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { AppSettings } from '../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private daoService: DaoService
  ) { }

  autenticacao(login: ILogin): Observable<HttpResponse<ILogin>>{
    return this.daoService.post<ILogin>(AppSettings.API_AUTENTICADOR,
      login,DaoService.MEDIA_TYPE_APP_JSON);
  }
}
