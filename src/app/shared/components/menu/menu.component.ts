import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/app-state.service';
import { MenuTypeEnum } from '../../enums/menu-type.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(
    private router: Router,
    private state: AppStateService
  ){}

  get estouRelatorioReceita(): boolean {
    return this.state.ondeEstou === MenuTypeEnum.RELATORIO_RECEITA;
  }

  get estouRelatorioDespesa(): boolean {
    return this.state.ondeEstou === MenuTypeEnum.RELATORIO_DESPESA;
  }

  get estouDashboard(): boolean {
    return this.state.ondeEstou === MenuTypeEnum.DASHBOARD;
  }

  get estouLancamentoReceita(): boolean {
    return this.state.ondeEstou === MenuTypeEnum.LANCAMENTO_RECEITA;
  }

  get estouLancamentoDespesa(): boolean {
    return this.state.ondeEstou === MenuTypeEnum.LANCAMENTO_DESPESA;
  }

  onNavigate(path: string){
    this.router.navigate([path]);
  }
}
