
import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService {

    constructor() {

        super('api/lancamentos')
    }

    obterListaMeses() {

        return [
            { label: 'Select...', value: '' },
            { label: 'January', value: '1' },
            { label: 'February', value: '2' },
            { label: 'March', value: '3' },
            { label: 'April', value: '4' },
            { label: 'May', value: '5' },
            { label: 'June', value: '6' },
            { label: 'July', value: '7' },
            { label: 'August', value: '8' },
            { label: 'September', value: '9' },
            { label: 'October', value: '10' },
            { label: 'November', value: '11' },
            { label: 'December', value: '12' },
        ]
    }

    obterListaTipos() {

        return [
            { label: 'Select...', value: '' },
            { label: 'Expense', value: 'EXPENSE' },
            { label: 'Income', value: 'INCOME' },


        ]
    }

    obterPorId(id){

        return this.get(`/${id}`);
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, {status})
    }


    validar(lancamento){
        const erros = [];

       if(!lancamento.ano){
        erros.push("Enter the release year.")
       }
       if(!lancamento.mes){
        erros.push("Enter the month year.")
       }
       if(!lancamento.descricao){
        erros.push("Enter the description.")
       }
       if(!lancamento.valor){
        erros.push("Enter the release value.")
       }
       if(!lancamento.tipo){
        erros.push("Enter the release type.")
       }
       if(erros && erros.length > 0){
        throw new ErroValidacao(erros);
       }
    }


    salvar(lancamento){

        return this.post('/', lancamento);
    }

    atualizar(lancamento){

        return this.put(`/${lancamento.id}`, lancamento);
    }

    consultar(lancamentoFiltro) {

        let params = `?ano=${lancamentoFiltro.ano}`

        if (lancamentoFiltro.mes) {
            params = `${params}&mes=${lancamentoFiltro.mes}`
        }

        if (lancamentoFiltro.tipo) {
            params = `${params}&tipo=${lancamentoFiltro.tipo}`
        }

        if (lancamentoFiltro.status) {
            params = `${params}&status=${lancamentoFiltro.status}`
        }

        if (lancamentoFiltro.usuario) {
            params = `${params}&usuario=${lancamentoFiltro.usuario}`
        }

        if (lancamentoFiltro.descricao) {
            params = `${params}&descricao=${lancamentoFiltro.descricao}`
        }


        return this.get(params);
    }


    deletar(id) {
        return this.delete(`/${id}`)
    }
}
