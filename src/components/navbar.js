import React from 'react'

import Navbaritem from './navbaritem'
// import Login from '../views/Login'

import { AuthConsumer} from '../main/provedorAutenticacao'



 function Navbar(props) {

    return (


        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
            <div className="container">
                <a href="#/home" className="navbar-brand">My Finances</a>
                <a href="#/login" className="navbar-brand">Login</a>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <Navbaritem render={props.isUsuarioAutenticado} href="#/home" label="Home"/>
                        <Navbaritem render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" label="Users"/>
                        <Navbaritem render={props.isUsuarioAutenticado} href="#/consulta-lancamentos" label="Releases"/>
                        <Navbaritem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" label="Logout"/>
                        
                    </ul>

                </div>
            </div>
        </div>
         
    )
}

export default () => (

    <AuthConsumer>
        {(context) => (
            <Navbar  isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}/>
        )


        }
    </AuthConsumer>
)