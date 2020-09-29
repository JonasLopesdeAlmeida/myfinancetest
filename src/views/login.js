import React, { Component } from 'react'

import Card from '../components/card'
import Formgroup from '../components/formgroup'
// o decorator withRouter permite rotas dentro do componente pela acao do clique de um botao por exemplo.
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import {MensagemErro} from '../components/toastr'

import { AuthContext } from '../main/provedorAutenticacao'

class Login extends Component {

    state = {
        email: '',
        senha: ''
    
    }

     //para fazer a instancia do usuario service eu vou colocar um construtor.
     constructor(){
         super();
         //instanciando o meu  UsuarioService();
         this.service = new UsuarioService();
     }
    

    entrar = () => {
        this.service.autenticar({
           email: this.state.email,
           senha: this.state.senha
      
        //se as credenciais estiverem corretas eu passo para a tela home.
        }).then(response => {
            //usando o local storage para recuperar o usuario logado
            //ele define os intens : uma variavel _usuario_logado, junto com minha resposta tranformada de objeto JSON para String utilizando o stringify.
            this.context.iniciarSessao(response.data)

            //a reposta nesse caso foi permitir o acesso atela home 
           this.props.history.push('/home')

       })//caso não tenha sucesso ele PEGA uma mensagem de erro que foi definida no backend 
       .catch( erro => {
           
           //erro.response.data o response aponta para o data que é a propridade que vem com a mensagem de erro do servidor backend.
         MensagemErro(erro.response.data)
       })
    }
    //quando eu clicar no botao cadastrar ele vai prepar o formulario de cadastro navegando para ele.
    prepareCadastrar = () => {
        // a propriedade history recebe uma funcao push que dis qual a rota que eu quero navegar.
        this.props.history.push('/cadastro-usuarios')
    }

    render() {
        return (

            <div className="row">
                {/* no jsx o style é passado como objeto. */}
                <div className="col-md-6" style={{ position: 'relative', left: '300px'}}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                          

                            <div className="row"></div>
                            <div className="col-lg-12"></div>
                            <div className="bs-component"></div>

                            <fieldset>

                                <Formgroup label="Email *" htmlFor="exampleInputEmail1">
                                    {/* esse e o children do fromgroup */}
                                    <input type="email" className="form-control"
                                        //passando o value para pegar o stado na propriedade email que sera digitada.
                                        value={this.state.email}
                                        //passando o onChange para pegar a mudanca stado na propriedade senha que foi digitada.
                                        onChange={e => this.setState({ email: e.target.value })}
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o Email" />
                                </Formgroup>

                                {/* Campo de senha */}
                                {/* Obs: aqui eu nao preciso criar uma outra propriedade label filho para senha */}
                                {/* pois eu preciso ter apenas ter uma unica propriedade criada e eu so replico para labels diferentes */}
                                <Formgroup label="Password *">
                                    {/* esse e o children do fromgroup */}
                                    <input type="password" className="form-control"
                                        //  passando o value para pegar stado na propriedade senha que sera digitada. 
                                        value={this.state.senha}
                                        // passando o onChange para pegar a mudanca stado na propriedade senha que foi digitada. 
                                        onChange={e => this.setState({ senha: e.target.value })}
                                        id="exampleInputPassword1"
                                        placeholder="Password" />

                                </Formgroup>
                               
                                <button onClick={this.entrar} className="btn btn-success">
                                <i className="pi pi-sign-in "></i>
                                    Enter</button>
                                <button onClick={this.prepareCadastrar} className="btn btn-danger">
                                <i className="pi pi-plus"></i>
                                    Create user</button>

                            </fieldset>

                        </Card>
                    </div>
                </div>
            </div>

        )
    }


}

Login.contextType = AuthContext

//withRoute ele decora o componente como parametro e retorna ele com novas funcionalidades. No caso navegar para outros componentes.
export default withRouter(Login)