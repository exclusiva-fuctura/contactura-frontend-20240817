import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// libs javascript
import moment from 'moment';
import Swal from 'sweetalert2';
// Modules
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
// services
import { LancamentosService } from '../../shared/services/lancamentos.service';
import { AppStateService } from '../../shared/services/app-state.service';
// enums
import { MenuTypeEnum } from '../../shared/enums/menu-type.enum';
import { IDespesa } from '../../shared/models/despesa.interface';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-despesas',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule, SharedModule, CommonModule],
  templateUrl: './despesas.component.html',
  styleUrl: './despesas.component.scss'
})
export class DespesasComponent {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private state: AppStateService,
    private activatedRoute: ActivatedRoute,
    private lancamentosService: LancamentosService
  ) { 
    this.state.ondeEstou = MenuTypeEnum.LANCAMENTO_DESPESA;
    this.iniciarFormulario();

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.verificarModoEdicao();
    } else {
      this.lancamentosService.modoEdicao = false;
    }
  }

  /**
   * label do botão dinâmico
   */
  get buttonLabel(): string {
    return this.lancamentosService.modoEdicao ? 'Atualizar' : 'Salvar';
  }

  /**
   * listagem dos tipos
   */
  get tipos(): string[] {
    return ['Alimentação','Habitação','Transporte','Educação','Lazer','Viagem'];
  }

  /**
   * iniciar os campos do formulario
   */
  private iniciarFormulario(): void {
    const hoje = moment().format();
    this.formulario = this.formBuilder.group({
      tipo: ['', Validators.required],
      ehFixo: false,
      data: hoje,
      descricao: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  /**
   * Carregar o formulario com a despesa enviada
   * @param despesa dado enviado para carregar o formulario
   */
  private carregarFormulario(despesa: IDespesa): void {
    if (despesa) {
      const valor = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(despesa.valor);
      this.formulario.patchValue({
        tipo: despesa.tipo,
        descricao: despesa.descricao,
        ehFixo: despesa.ehFixo,
        data: despesa.data,
        valor: valor
      });
    }
  }

  /**
   * verificar se a chamada está no modo de ediçao e carregar o formulario com os dados da despesa
   */
  private verificarModoEdicao(): void {
    if (this.lancamentosService.modoEdicao) {
      const despesa = this.lancamentosService.despesaSelecionada;
      this.carregarFormulario(despesa);
    }
  }

  /**
   * Criar uma despesa
   * @param despesa objeto para ser criado
   */
  private salvar(despesa: IDespesa): void {
    this.lancamentosService.criarDespesa(despesa).subscribe({
      next: (resp) => {
        const despesaStored = resp.body;
        Swal.fire(
          'SUCESSO: Criar Despesa',
          `Despesa criada com sucesso. Código: '${despesaStored?.id}'`,
          'success'
          );
        // limpar os campos do formulario
        this.onLimpar();
      },
      error: (err: HttpErrorResponse) => {
        let msg = err.error.error;
        if (err.status === HttpStatusCode.BadRequest && err.error.error.includes('Bad Request')) {
          msg = 'Usuario não autenticado';
        }
        Swal.fire(
          'ALERTA: Criar Despesa',
          err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + msg + ' ]',
          'warning'
          );
      }
    });
  }

  /**
   * Realizar atualização da despesa
   * @param despesa objeto para ser atualizado
   */
  private atualizar(despesa: IDespesa): void {
    this.lancamentosService.atualizarDespesa(despesa).subscribe({
      next: (resp) => {
        if (resp.status === HttpStatusCode.Ok){
          // limpar o formulario
          this.formulario.reset();
          // mensagem
          Swal.fire(
            'Atualizar Despesa',
            'Despesa atualizada com sucesso!',
            'success'
            );
        }
      },
      error: (err) => {
        Swal.fire(
          'ALERTA: Atualizar Despesa',
          err.error.mensagem ? err.error.mensagem : 'Ocorreu um erro inesperado. [ ' + err.error.error + ' ]',
          'warning'
          );
      }
    });
  }

  /**
   * evento do botao salvar
   */
  onSalvar(): void {
    const despesa: IDespesa = this.formulario.value;
    // formatar o valor
    despesa.valor = +(despesa.valor.toString().replace('.','').replace(',','.'));
    // formatar a data
    despesa.data = moment(despesa.data).format('YYYY-MM-DD');
    // verificar se o formulário esta em modo de edição
    if (this.lancamentosService.modoEdicao) {
      despesa.id = this.lancamentosService.despesaSelecionada.id;
      this.atualizar(despesa);
    } else {
      this.salvar(despesa);
    }
  }

  /**
   * evento do botao limpar
   */
  onLimpar(): void {
    this.formulario.reset();
    this.formulario.patchValue({
      data: moment().format(),
      ehFixo: false
    });
  }
}
