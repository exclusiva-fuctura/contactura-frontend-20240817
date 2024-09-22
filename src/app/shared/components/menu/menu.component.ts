import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../../../app.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(
    private router: Router,
    private state: AppState
  ){}

  get estouRelatorioReceita(): boolean {
    return this.state.ondeEstou === 'relatorios-receita';
  }

  get estouRelatorioDespesa(): boolean {
    return this.state.ondeEstou === 'relatorios-despesa';
  }

  get estouDashboard(): boolean {
    return this.state.ondeEstou === 'dashboard';
  }

  get estouLancamentoReceita(): boolean {
    return this.state.ondeEstou === 'lancamento-receita';
  }

  get estouLancamentoDespesa(): boolean {
    return this.state.ondeEstou === 'lancamento-despesa';
  }

  onNavigate(path: string){
    this.router.navigate([path]);
  }
}
