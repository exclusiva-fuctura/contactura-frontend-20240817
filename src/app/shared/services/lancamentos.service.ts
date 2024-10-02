import { Injectable } from '@angular/core';
import { DaoService } from './dao.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ILancamento } from '../models/lancamento.interface';
import { AppSettings } from '../../app-settings';
import { IDespesa } from '../models/despesa.interface';
import { OperacaoTypeEnum } from '../enums/operacao-type.enum';

@Injectable({
  providedIn: 'root'
})
export class LancamentosService {

  private _modoEdicao = OperacaoTypeEnum.SALVAR;
  private _despesaSelecionada!: IDespesa;
  
  constructor(
    private daoService: DaoService
  ) { }

  get modoEdicao(): boolean {
    return this._modoEdicao === OperacaoTypeEnum.EDITAR;
  }

  set modoEdicao(ehEdicao: boolean) {
    if (ehEdicao) {
      this._modoEdicao = OperacaoTypeEnum.EDITAR;
    } else {
      this._modoEdicao = OperacaoTypeEnum.SALVAR;
    }
  }

  get despesaSelecionada(): IDespesa {
    return this._despesaSelecionada;
  }

  set despesaSelecionada(value: IDespesa) {
    this._despesaSelecionada = value;
  }

  /**
   * listar despesas criadas
   * @returns retorna lista de lancamentos
   */
  listarLancamentos(): Observable<HttpResponse<ILancamento[]>>{
    return this.daoService.get<ILancamento[]>(AppSettings.API_LANCAMENTOS, 
      DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * criar uma nova despesa
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento criada
   */
   criarDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.daoService.post<ILancamento>(AppSettings.API_LANCAMENTOS,
      this.despesaToLancamento(despesa), DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * atualiza uma despesa existente
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento alterada
   */
  atualizarDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.daoService.put<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`,
    this.despesaToLancamento(despesa), DaoService.MEDIA_TYPE_APP_JSON);
  }


  listaLancamentos(): Observable<HttpResponse<ILancamento[]>> {
    return this.daoService.get<ILancamento[]>(AppSettings.API_LANCAMENTOS, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * recupera a despesa do id informado
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento
   */
  obterDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.daoService.get<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * reove uma despesa existe
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento removida
   */
  removerDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.daoService.delete<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * Converter IDespesa em Lancamento
   * @param despesa Recebe uma Receita
   * @returns Um lançamento
   */
  private despesaToLancamento(despesa: IDespesa): ILancamento {
    const lancamento: ILancamento = {
      data: despesa.data,
      descricao: despesa.descricao,
      ehFixo: despesa.ehFixo,
      tipo: despesa.tipo,
      valor: despesa.valor,
      ehReceita: false,
      id: despesa.id
    };
    return lancamento;
  }


}
