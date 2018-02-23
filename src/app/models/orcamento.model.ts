import { isArray, isNullOrUndefined } from "util";
import { Console } from "@angular/core/src/console";
import { EventEmitter } from "events";
import { Output } from "@angular/core";

export class orcamentoGeral {
    
    // #region Propriedades

    id : number
    descricao : string
    endereco : string
    cliente : string
    contrato : string
    dataBase : Date
    lsHora : number
    lsMes : number
    bdi : OrcamentoBdi[]

    // #endregion

    // #region Constructor function
    /**
     * Creates an instance of orcamentoGeral.
     * @param {*} params - parameter provided from the {@class orcamentoService}
     * 
     * @memberOf orcamentoGeral
     */
    constructor(params : any) {
        if (!isNullOrUndefined(params)) {
            this.inicializeOrcamento(params)
        } else {
            this.inicializeEmpty()
        }
    }

    // #endregion

    // #region Helper functions

    /**
     * Auxilia no preenchimento das propriedades da instancia a partir dos dados retornados pelo {@class orcamentoService}
     * 
     * @param {*} params - item retornado pelo serviço
     * 
     * @memberOf orcamentoGeral
     */
    public inicializeOrcamento(params:any) {

        console.log(params)

        this.id = params.id
        this.descricao = params.descricao
        this.endereco = params.endereco
        this.cliente = params.cliente
        this.contrato = params.contrato
        this.dataBase = params.data_base
        this.lsHora = params.ls_hora
        this.lsMes = params.ls_mes

        if (!isNullOrUndefined(params.bdi)) {
            let listaBdi = []
            params.bdi.map(bdi => listaBdi.push(new OrcamentoBdi(bdi)))
            this.bdi = listaBdi
        }

        console.log(this)

    }

    /**
     * Auxilia na criação de um instancia vázia
     * 
     * @memberOf orcamentoGeral
     */
    public inicializeEmpty() {
        this.id = null
        this.descricao = ""
        this.endereco = ""
        this.cliente = ""
        this.contrato = ""
        this.dataBase = new Date()
        this.lsHora = null
        this.lsMes = null
    }
    // #endregion

}

/**
 * Class utilizada para envio em POST
 * 
 * @export
 * @class OrcamentoPost
 */
export class OrcamentoPost {

    // #region Propriedades

    id : number
    descricao : string
    endereco : string
    cliente : string
    contrato : string
    data_base : Date
    ls_hora : number
    ls_mes : number

    //#endregion

    // #region Constructor

    constructor(item : orcamentoGeral) {
        this.id = item.id
        this.descricao = item.descricao
        this.endereco = item.endereco
        this.cliente = item.cliente
        this.contrato = item.contrato
        this.data_base  = item.dataBase
        this.ls_hora = item.lsHora
        this.ls_mes = item.lsMes

        console.log(this)
    }

    // #endregion

}

export class OrcamentoBdi {

    id : number
    descricao : string
    valor : number

    // #region Construtor

    /**
     * Creates an instance of orcamentoBdi.
     * 
     * @param {any} params - Dados vindo da consulta HTTP
     * 
     * @memberOf orcamentoBdi
     */
    constructor(params) {
        if (!isNullOrUndefined(params)) {
            this.inicialize(params)
        } else {
            this.inicializeEmpty()
        }
    }
    // #endregion


    // #region Helper functions

    /**
     * Inicializa a instancia com os dados vindo do array de parametros da consulta HTTP
     * 
     * @param {*} params 
     * 
     * @memberOf orcamentoBdi
     */
    public inicialize(params : any) {
        this.id = params.id
        this.descricao = params.descricao
        this.valor = params.valor
    }

    /**
     * Inicializa a instancia com valores nulos ou vazios
     * @memberOf orcamentoBdi
     */
    public inicializeEmpty() {
        this.id = null
        this.descricao = ""
        this.valor = null
    }
    // #endregion

}

class OrcamentoElementos {
    id : number
    sequencia : number
    nivel : number
    itemizacao : string
    descricao : string
    cst_unit : number
}

export class OrcamentoItem extends OrcamentoElementos {

    unidade : string
    quantidade : number
    tipo : number
    cst_unit : number
    cst_unit_mo : number
    cst_unit_outros : number
    bdi_id : number

    /**
     * Eventos utilizados para notificar mudanças
     */
    @Output() onQuantidadeChanged : EventEmitter
    @Output() onSequenciaChanged : EventEmitter
    @Output() onNivelChanged : EventEmitter

    /**
     * Construtor da classe
     */

}

export class OrcamentoNivel extends OrcamentoElementos {

    itens : OrcamentoElementos[]



}
