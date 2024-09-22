import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MenuComponent } from './components/menu/menu.component';
import { LogoutComponent } from './components/logout/logout.component';
import { DaoService } from './services/dao.service';
import { AppState } from '../app.state';



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
    AppState
  ]
})
export class SharedModule { }
