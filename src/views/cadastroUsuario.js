import React, { Component } from 'react'

import Card from '../components/card'
import Formgroup from '../components/formgroup'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import * as messages from '../components/toastr'

class Cadastrousuario extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''


    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }
    
   

    cadastrar = () => {
         

        const usuario = {

            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            senhaRepeticao: this.state.senhaRepeticao
        }

        try{
            
            this.service.validar(usuario);


        }catch(erro){
            
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.MensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
               messages.MensagemSucesso('The user was successfully registered! Now you are able to access the system.')
                this.props.history.push('/login')
            })
            .catch(error => {
               messages.MensagemErro(error.response.data)
            })
    }

    cancelar = () => {

        this.props.history.push('/login')
    }


    render() {

        return (

            <Card title="Register User">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <Formgroup label="Name: *" htmlFor="inputNome">
                                <input type="text" id="inputNome" className="form-control" name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </Formgroup>

                            <Formgroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" id="inputEmail" className="form-control" name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </Formgroup>

                            <Formgroup label="Password: *" htmlFor="inputSenha">
                                <input type="password" id="inputSenha" className="form-control" name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </Formgroup>


                            <Formgroup label="Type the password again: *" htmlFor="inputsenhaRepeticao">
                                <input type="password" id="inputsenhaRepeticao" className="form-control" name="senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </Formgroup>
                            {/* //enviando o que foi digitado onClick={this.cadastrar} */}
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">
                            <i className="pi pi-save"></i>
                                Save</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">
                            <i className="pi pi-times"></i>
                                Cancel</button>

                        </div>
                    </div>
                </div>

            </Card>



        )
    }

}
export default withRouter(Cadastrousuario)