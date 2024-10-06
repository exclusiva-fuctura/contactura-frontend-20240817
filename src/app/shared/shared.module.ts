import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DaoService } from './services/dao.service';
import { LoginService } from './services/login.service';
import { AppStateService } from './services/app-state.service';
import { DinheiroDirective } from './directives/dinheiro.directive';
import { MaiusculoDirective } from './directives/maiusculo.directive';

import {LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

const components = [
  MenuComponent,
  LogoutComponent,
  DinheiroDirective,
  MaiusculoDirective
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    components
  ],
  providers: [
    DaoService,
    LoginService,
    AppStateService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide:  DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ]
})
export class SharedModule { }
