import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/card'
import FormGroup from '../../components/formgroup'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'

import * as messages from '../../components/toastr'

import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';



class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos : []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if(!this.state.ano){
            messages.MensagemErro('The year field must be filled.')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta => {
                const lista = resposta.data;
                
                if(lista.length < 1){
                    messages.MensagemAlerta("No results were found.");
                }
                this.setState({ lancamentos: lista })
            }).catch( error => {
                console.log(error)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog : true, lancamentoDeletar: lancamento  })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog : false, lancamentoDeletar: {}  })
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar)
                lancamentos.splice(index, 1);
                this.setState( { lancamentos: lancamentos, showConfirmDialog: false } )
                messages.MensagemSucesso('The release was successfully deleted!')
            }).catch(error => {
                messages.MensagemErro('The release cannot be deleted!')
            })
    }

    CadastrarLancamento = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                if(index !== -1){
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento
                    this.setState({lancamento});
                }
                messages.MensagemSucesso("The state was successfully updated!")
            })
    }

    render(){
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} 
                        className="p-button-secondary" />
            </div>
        );

        return (
            <Card title='Release check'>
            <div className="row">
              <div className="col-md-12">
                <div className="bs-component">
    
    
                  <FormGroup htmlFor="inputAno" label="Year: *">
                    <input type="text"
                      class="form-control"
                      id="inputAno"
                      value={this.state.ano}
                      onChange={e => this.setState({ ano: e.target.value })}
                      placeholder="type the year" />
                  </FormGroup>
    
                  <FormGroup htmlFor="inputMes" label="Month: ">
                    <SelectMenu id="inputMes"
                      value={this.state.mes}
                      onChange={e => this.setState({ mes: e.target.value })}
                      className="form-control"
                      lista={meses} />
                  </FormGroup>
    
    
                  <FormGroup htmlFor="inputDescricao" label="Description: ">
                    <input type="text"
                      class="form-control"
                      id="inputDescricao"
                      value={this.state.descricao}
                      onChange={e => this.setState({ descricao: e.target.value })}
                      placeholder="type the description" />
                  </FormGroup>
    
                  <FormGroup htmlFor="inputTipo" label="Release type: ">
                    <SelectMenu id="inputTipo"
                      value={this.state.tipo}
                      onChange={e => this.setState({ tipo: e.target.value })}
                      className="form-control"
                      lista={tipos} />
                  </FormGroup>
                  <button onClick={this.buscar}  type="button" className="btn btn-success">
                  <i className="pi pi-search"></i>Search</button>
                 
                  <button onClick={this.CadastrarLancamento}  type="button" className="btn btn-danger">
                  <i className="pi pi-plus"></i>Registrer</button>
    
                </div>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-md-12">
                <div className="bs-component">
                  <LancamentosTable lancamentos={this.state.lancamentos}
                    deleteAction={this.abrirConfirmacao}
                    editAction={this.editar}
                    alterarStatus={this.alterarStatus}
                  />
                </div>
    
              </div>
            </div>
            <div>
              <Dialog header="Confirmation" visible={this.state.showConfirmDialog} style={{ width: '50vw' }} footer={confirmDialogFooter} modal={true} onHide={() => this.setState({ showConfirmDialog: false })}>
            
                Are you sure you want to delete this release?
            </Dialog>
    
            </div>
    
    
          </Card>

        )
    }
}

export default withRouter(ConsultaLancamentos);