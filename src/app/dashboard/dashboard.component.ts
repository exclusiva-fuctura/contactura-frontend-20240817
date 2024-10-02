import { Component } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
// libs javascript
import Swal from 'sweetalert2';
// Modules
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
// Services
import { LancamentosService } from '../shared/services/lancamentos.service';
// Models
import { IDespesa } from '../shared/models/despesa.interface';
import { ILancamento } from '../shared/models/lancamento.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule,SharedModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dataSourceDespesas: any[] = [];
  dataSourceReceitas: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];

  
  constructor(
    private lancamentosService: LancamentosService,
    private router: Router
  ){
    this.listarLancamentos();
  }

  private imputarLancamentos(lancamentos: ILancamento[]){
    this.dataSourceDespesas = lancamentos.filter(lanc => lanc.ehReceita === false).slice(0, 5);
    this.dataSourceReceitas = lancamentos.filter(lanc => lanc.ehReceita === true).slice(0, 5);
  }
  private listarLancamentos(): void {
    this.lancamentosService.listarLancamentos().subscribe({
      next: (response) => {
        if (response.status === HttpStatusCode.Ok) {
          const lancamentos = response.body || [];
          this.imputarLancamentos(lancamentos);
        }
      }
    });
  }

  private removeDespesa(item: IDespesa) : void {
    if (item) {
      this.lancamentosService.removerDespesa(item).subscribe({
        next: (response) => {
          if (response.status === HttpStatusCode.Ok) {
            Swal.fire(
              'SUCESSO: Remover Despesa',
              `Despesa removida com sucesso.`,
              'success'
              );
            // nova consulta
            this.listarLancamentos();
          }
        },
        error: (err) => {
          Swal.fire(
            'ALERTA: Remover Despesa',
            err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + err.error.error + ' ]',
            'warning'
            );
        }
      });
    }
  }

  onDeleteDespesa(item: IDespesa): void {
    if (item) {
      Swal.fire({
        title: 'Remover Despesa',
        text: `Deseja remover a despesa '${item.descricao.toUpperCase()}'?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remova!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.removeDespesa(item)
        }
      });
    }
  }

  onEditDespesa(item: IDespesa): void {
    if (item) {
      this.lancamentosService.modoEdicao = true;
      this.lancamentosService.despesaSelecionada = item;
      this.router.navigate(['lancamentos/despesa/'+item.id]);
    }
  }

  onDeleteReceita(elem: any){

  }

  onEditReceita(elem: any){

  }
}
