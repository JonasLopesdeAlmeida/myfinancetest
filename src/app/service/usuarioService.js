import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'


class UsuarioService extends ApiService {

   constructor() {

      //pegando diretamente da classe mae os endpoint com a url
      //${this.apiurl}${url} 
      super('api/usuarios')
   }


   autenticar(credenciais) {

      //no final ficara assim: http://localhost:8081/api/usuarios/autenticar
      //e no componente de login eu passo as minhas credenciais de são: email e senha.
      return this.post('/autenticar', credenciais)

   }

   obterSaldoPorUsuario(id) {

      return this.get(`/${id}/saldo`)

   }


   salvar(usuario) {
      return this.post('/', usuario);
   }

   validar(usuario) {

      const erros = [];

      if (!usuario.nome) {
         erros.push('field name is required.')
      }

      if (!usuario.email) {
         erros.push('field email is required.')
      } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
         erros.push('enter a valid email.')
      }


      if (!usuario.senha || !usuario.senhaRepeticao) {
         erros.push('enter the password twice')

      } else if (usuario.senha !== usuario.senhaRepeticao) {

         erros.push('the passawords are differents')
      }

      if (erros && erros.length > 0) {
         throw new ErroValidacao(erros);
      }

   }

}

//agora eu só preciso importar o meu usuarioservice no meu componente de login.
export default UsuarioService;