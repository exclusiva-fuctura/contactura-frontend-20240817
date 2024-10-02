import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DaoService } from './services/dao.service';
import { LoginService } from './services/login.service';
import { AppStateService } from './services/app-state.service';



@NgModule({
  declarations: [
    MenuComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MenuComponent,
    LogoutComponent
  ],
  providers: [
    DaoService,
    LoginService,
    AppStateService,
  ]
})
export class SharedModule { }
