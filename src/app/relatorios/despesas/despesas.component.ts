import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppStateService } from '../../shared/services/app-state.service';
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LancamentosService } from '../../shared/services/lancamentos.service';
import { HttpStatusCode } from '@angular/common/http';
import { ILancamento } from '../../shared/models/lancamento.interface';
import moment from 'moment';

@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [SharedModule, MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent {
  formulario!: FormGroup;

  dataSource: any[] = [];
  displayedColumns = ['data','valor','tipo','fixo','descricao','acoes'];
  
  constructor(
    private state: AppStateService,
    private fb: FormBuilder,
    private lancamentosService: LancamentosService
  ) {
      // notificar ao menu em qual componente estou
      this.state.ondeEstou = MenuTypeEnum.RELATORIO_DESPESA;
      this.initForm();
      this.onPequisar();
    }

    get valorTotal(): number {
      let total = 0
      this.dataSource.forEach(element => {
        total = total + element.valor
      });
      return total;
    }

    private imputarLancamentos(lancamentos: ILancamento[]){
      const {data} = this.formulario.value;
      const dataSelec = moment(data).format('YYYY-MM-DD');
      this.dataSource = lancamentos
      .filter(lanc => lanc.ehReceita === false && lanc.data === dataSelec);
    }

    private initForm(): void {
      const hoje = moment().format();
      this.formulario = this.fb.group({
        data: hoje
      });
    }

    onPequisar(): void {
      this.lancamentosService.listarLancamentos().subscribe({
        next: (response) => {
          if (response.status === HttpStatusCode.Ok) {
            const lancamentos = response.body || [];
            this.imputarLancamentos(lancamentos);
          }
        }
      });
    }  
}
