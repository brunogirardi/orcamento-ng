import { isArray, isNullOrUndefined } from "util";
import { Console } from "@angular/core/src/console";
import { Output, EventEmitter } from "@angular/core";

export class orcamentoGeral {

    // #region Propriedades

    id: number
    descricao: string
    endereco: string
    cliente: string
    contrato: string
    data_base: Date
    ls_hora: number
    ls_mes: number
    bdi: OrcamentoBdi[]

    // #endregion

    // #region Constructor function
    /**
     * Creates an instance of orcamentoGeral.
     * @param {*} params - parameter provided from the {@class orcamentoService}
     * 
     * @memberOf orcamentoGeral
     */
    constructor(params: any) {
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
    public inicializeOrcamento(params: any) {

        this.id = params.id
        this.descricao = params.descricao
        this.endereco = params.endereco
        this.cliente = params.cliente
        this.contrato = params.contrato
        this.data_base = params.data_base
        this.ls_hora = params.ls_hora
        this.ls_mes = params.ls_mes

        if (!isNullOrUndefined(params.bdi)) {
            let listaBdi = []
            params.bdi.map(bdi => listaBdi.push(new OrcamentoBdi(bdi)))
            this.bdi = listaBdi
        }

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
        this.data_base = new Date()
        this.ls_hora = null
        this.ls_mes = null
    }
    // #endregion

}

export class OrcamentoPost {

    // #region Propriedades

    id: number
    descricao: string
    endereco: string
    cliente: string
    contrato: string
    data_base: Date
    ls_hora: number
    ls_mes: number

    //#endregion

    // #region Constructor

    constructor(item: orcamentoGeral) {
        this.id = item.id
        this.descricao = item.descricao
        this.endereco = item.endereco
        this.cliente = item.cliente
        this.contrato = item.contrato
        this.data_base = item.data_base
        this.ls_hora = item.ls_hora
        this.ls_mes = item.ls_mes
    }

    // #endregion

}

export class OrcamentoBdi {

    id: number
    descricao: string
    valor: number

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
    public inicialize(params: any) {
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

export interface IOrcamentoItem {

    id: number
    agrupador: boolean
    sequencia: number
    nivel: number
    itemizacao: string
    insumos_id: number
    descricao: string
    unidade: string
    tipos_id: number
    cst_unit_mo: number
    cst_unit_outros: number
    cst_unit: number
    quantidade: number
    bdi: number
    bdi_id: number

}

export interface IOrcamentoItemPost {

    sequencia: number
    nivel: number
    itemizacao: string
    insumos_id: number
    quantidade: number
    bdi_id: number

}

export interface IOrcamentoSubitemPost {

    sequencia: number
    nivel: number
    itemizacao: string
    descricao: string

}

export class OrcamentoItem {

    constructor() {
    }

    @Output() onQuantidadeChanged = new EventEmitter
    @Output() onSequenciaChanged = new EventEmitter
    @Output() onNivelChanged = new EventEmitter

    id: number
    agrupador: boolean
    sequencia: number
    nivel: number
    itemizacao: string
    insumos_id: number
    descricao: string
    unidade: string
    tipos_id: number
    cst_unit_mo: number
    cst_unit_outros: number
    bdi: number
    bdi_id: number
    visivel: boolean = true
    expandido: boolean = true

    private _quantidade: number
    get quantidade(): number {
        return this._quantidade
    }
    set quantidade(val: number) {
        this._quantidade = Number(val)
        this.calcularCstTotal()
        this.onQuantidadeChanged.emit();
    }

    private _cst_unit: number
    get cst_unit(): number {
        return this._cst_unit
    }
    set cst_unit(val: number) {
        this._cst_unit = Number(val)
        this.calcularCstTotal()
    }

    private _cst_total: number
    get cst_total(): number {
        return this._cst_total
    }
    set cst_total(val: number) {
        this._cst_total = val
    }
    calcularCstTotal() {
        this._cst_total = Number((this._cst_unit * this._quantidade).toFixed(2))
    }

    /**
     * Construtor da classe
     */

}


export class OrcamentoItemLista {

    private _lista: OrcamentoItem[] = []

    constructor(lista: IOrcamentoItem[]) {
        this.converterInterface(lista)
        this.calcularSubtotal()
    }

    get lista(): OrcamentoItem[] {
        return this._lista
    }


    // #region Manupular Itens
    adicionarItem(item: OrcamentoItem, seq : number) {
        item.onQuantidadeChanged.subscribe(evento => {
            this.calcularSubtotal()
        })
        this.lista.splice(seq -  1, 0, item)
        this.corrigirSequencia()
        this.calcularSubtotal()
        this.corrigirItemizacao()
    }

    adicionarNivel(item: OrcamentoItem, seq : number) {
        item.onQuantidadeChanged.subscribe(evento => {
            this.calcularSubtotal()
        })
        this.lista.splice(seq -  1, 0, item)
        this.corrigirSequencia()
        this.calcularSubtotal()
        this.corrigirItemizacao()
    }

    deletarItem(item: OrcamentoItem) {
        item.onQuantidadeChanged.unsubscribe()
        this.lista.splice(item.sequencia-1, 1)
        this.corrigirSequencia();
        this.corrigirItemizacao();
    }

    // #endregion

    // #region Manipular Visibilidade

    expandirGrupo(seq : number) {
        let itemIdentificado : boolean = false
        let nivelReferencia : number

        this._lista.forEach((item, i) => {
            if (item.sequencia == seq) {
                itemIdentificado = true
                item.expandido = true
                nivelReferencia = item.nivel
            }
            if (item.sequencia > seq && itemIdentificado == true) {
                if (item.nivel > nivelReferencia) {
                    item.visivel = true
                } else {
                    itemIdentificado = false
                }
            }
        })
    }

    recolherGrupo(seq : number) {
        let itemIdentificado : boolean = false
        let nivelReferencia : number

        this._lista.forEach((item, i) => {
            if (item.sequencia == seq) {
                itemIdentificado = true
                item.expandido = false
                nivelReferencia = item.nivel
            }
            if (item.sequencia > seq && itemIdentificado == true) {
                if (item.nivel > nivelReferencia) {
                    item.visivel = false
                } else {
                    itemIdentificado = false
                }
            }
        })
    }

    // #endregion

    // #region Manipular Niveis

    listarNiveis(seq? : number) : OrcamentoItem[] {
        let nivel : OrcamentoItem[] = []

        if (seq) {
            let verificador = true
            let i = seq - 1
            do {
                if (this._lista[i].nivel == 1) {
                    verificador = false
                }
                if (this._lista[i].agrupador == true) {
                    nivel.push(this._lista[i])
                }
                i--
            } while (verificador == true)
        } else {
            this._lista.forEach(item => {
                if (item.agrupador == true) {
                    nivel.push(item)
                }
            })
        }

        return nivel

    }

    // #endregion 

    // #region Utilitários

    corrigirSequencia() {
        this.lista.forEach((item, i) => {
            item.sequencia = i + 1
        });
    }

    /**
     * Atualiza os subtotais do orçamento
     */
    calcularSubtotal() {
        let subtotais : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let posicoes : number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let ultimaPosicao : number = 0

        this._lista.forEach((item, i) => {
            if (item.agrupador == true) {
                let y = item.nivel - 1
                while (y < subtotais.length) {
                    if (subtotais[y] > 0) {
                        this._lista[posicoes[y]].cst_total = subtotais[y]
                    }
                    subtotais[y] = 0
                    posicoes[y] = i
                    y++                  
                }

            } else {
                let x = item.nivel - 1
                while (x >= 1) {
                    subtotais[x - 1] += item.cst_total
                    x--
                } 
            }
        })

        let y = 0
        while (y < subtotais.length) {
            if (subtotais[y] > 0) {
                this._lista[posicoes[y]].cst_total = subtotais[y]
            }
            y++                  
        }
    }

    // calcularSubtotal2() {
    //     let indexGrupo: OrcamentoItem = null
    //     let subtotal: number = 0
    //     this._lista.forEach((item, index) => {
    //         if (item.nivel == 1) {
    //             if (indexGrupo != null) {
    //                 indexGrupo.cst_total = subtotal
    //             }
    //             indexGrupo = item;
    //             subtotal = 0
    //         } else {
    //             subtotal += item.cst_total
    //         }
    //         indexGrupo.cst_total = subtotal
    //     })
    // }


    private converterInterface(data: IOrcamentoItem[]) {

        data.forEach(item => {

            let novoItem: OrcamentoItem = new OrcamentoItem()

            novoItem.id = item.id
            novoItem.agrupador = item.agrupador
            novoItem.sequencia = item.sequencia
            novoItem.nivel = item.nivel
            novoItem.itemizacao = item.itemizacao
            novoItem.insumos_id = item.insumos_id
            novoItem.descricao = item.descricao
            novoItem.unidade = item.unidade
            novoItem.quantidade = item.quantidade
            novoItem.tipos_id = item.tipos_id
            novoItem.cst_unit = item.cst_unit
            novoItem.cst_unit_mo = item.cst_unit_mo
            novoItem.cst_unit_outros = item.cst_unit_outros
            novoItem.bdi = item.bdi
            novoItem.bdi_id = item.bdi_id

            this.adicionarItem(novoItem, 5000)

        })

        this.corrigirItemizacao()
    }

    private corrigirItemizacao() {
        let pos_niveis: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let ultimo_nivel: number = 1

        this._lista.forEach(item => {

            // Reinicia numeração de posições maiores que o nível atual
            if (ultimo_nivel > item.nivel) {
                for (let i = item.nivel; i < pos_niveis.length; i++) {
                    pos_niveis[i] = 0;
                }
            }
            // Salva o valor do nivel atual como ultimo nivel
            ultimo_nivel = item.nivel;
            pos_niveis[item.nivel - 1] = pos_niveis[item.nivel - 1] + 1
            item.itemizacao = this.formatarItemizacao(pos_niveis);

        });
    }

    private formatarItemizacao(itemizacao: number[]): string {

        let formatado: string = ""

        itemizacao.forEach((item, i) => {
            if (item > 0) {
                if (item > 9) {
                    formatado += (i > 0 ? "." : "") + item
                } else {
                    formatado += (i > 0 ? ".0" : "0") + item
                }
            }
        });

        return formatado
    }

    // #endregion
}
