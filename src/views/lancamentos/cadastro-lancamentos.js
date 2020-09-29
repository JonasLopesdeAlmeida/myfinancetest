import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/formgroup'
import SelectMenu from '../../components/selectMenu'

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params
       
        if(params.id){
            this.service
                .obterPorId(params.id)
                .then(response => {
                    this.setState( {...response.data, atualizando: true} )
                })
                .catch(erros => {
                    messages.MensagemErro(erros.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };

        try{
            this.service.validar(lancamento)
        }catch(erro){
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.MensagemErro(msg));
            return false;
        }     

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.MensagemSucesso('the release was successfully registered!')
            }).catch(error => {
                messages.MensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, status, usuario, id } = this.state;

        const lancamento = { descricao, valor, mes, ano, tipo, usuario, status, id };
        
        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.MensagemSucesso('the release was successfully updated!')
            }).catch(error => {
                messages.MensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }

    CancelarCadastro = () => {

        this.props.history.push('/consulta-lancamentos')
    }
    render(){
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? 'Update release' : 'Register release'}>
            <div className="row">
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Description: *">
                        <input type="text"
                            className="form-control"
                            id="inputDescricao"
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Year: *">
                        <input type="text"
                            id="inputAno"
                            className="form-control"
                            name="ano"
                            value={this.state.ano}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Month: *">
                        <SelectMenu id="inputTipo" className="form-control" lista={meses}
                            name="mes"
                            value={this.state.mes}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Value: *">
                        <input type="text"
                            id="inputValor"
                            className="form-control"
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </div>

                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Release type: *">
                        <SelectMenu id="inputTipo" className="form-control" lista={tipos}
                            name="tipo"
                            value={this.state.tipo}
                            onChange={this.handleChange}
                        />


                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="State: ">
                        <input type="text"
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.handleChange}
                            disabled />

                    </FormGroup>
                </div>

            </div>
            {
                this.state.atualizando ?
                    (
                        <button onClick={this.atualizar} className="btn btn-success">
                            <i className="pi pi-refresh "></i>
                             Update</button>
                    ) : (
                    
                        <button onClick={this.submit} className="btn btn-success">
                            <i className="pi pi-save "></i>
                             Save</button>
                    )
            }

            <button onClick={this.CancelarCadastro} className="btn btn-danger">
            <i className="pi pi-times "></i>
                 Cancel</button>

        </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);