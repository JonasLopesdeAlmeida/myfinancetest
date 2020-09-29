import React, { Component } from 'react'

import UsuarioService from '../app/service/usuarioService'

import {AuthContext} from '../main/provedorAutenticacao'

class Home extends Component {

    state = {
        nome: '',
        saldo: 0
    }

    constructor() {
        super()
        this.usuarioservice = new UsuarioService();
    }

    //componentDidMount() é um callback responsavel pelo ciclo de vida dos componentes.
    //quando o meu componente estiver montado na tela, ele vai chamar as instruções que estiverem dentro dele.
    //tb usadado para fazer as operacoes ouvir os eventos. Ou seja, ele será usado toda vez
    //que houver a necessidade de carregar alguma informação que desejamos mostrar na tela.
    //EX: assim que abrir a tela home, ele vai carregar a informação que vem do servidor para atualizar o saldo do meu state. 
    componentDidMount() {
        //aqui eu estou recuperando a informação do usuario logado no local storage obtendo com getintem a chave que eu defini no meu componente de Login
        //essa chave é a variavel _usuario_logado
        //como antes eu transformei de JSON objeto para String para armazenar, agora eu terei que transformar de string para objeto para obter o ID.
        const usuarioLogadoObjeto =  this.context.usuarioAutenticado
        

        //o endpoint definido no meu backend para acessar o valor de saldo foi id/saldo
        //a minha chave _usuario_logado esta sendo recebida pela variavel usuarioLogadoObjeto que assim acessará o id.
        this.usuarioservice
        .obterSaldoPorUsuario(usuarioLogadoObjeto.id)
            .then(response => {
        
                this.setState({ saldo: response.data })
               
            })
            .catch(error => {
                console.error(error.response)
            })
    }
    
    CadastrarLancamento = () => {
        // a propriedade history recebe uma funcao push que dis qual a rota que eu quero navegar.
        this.props.history.push('/cadastro-lancamentos')
      }

    render() {

        return (

            <div className="jumbotron">
                <h1 className="display-3">Welcome!</h1>

                <p className="lead">This is your financial system.</p>
                <p className="lead">Here is your balance for the current month £ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>This is the administrative area, choose one of the menus and buttons below to navigate the system.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button"><i className="pi pi-users"></i> Create User</a>
                    <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos" role="button"><i className="pi pi-money-bill"></i>  Register Release</a>
                </p>
            </div>

        )
    }


}

Home.contextType = AuthContext;
export default Home;