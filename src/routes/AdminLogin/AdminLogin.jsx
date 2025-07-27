// IMPORT COMPONENTS
import { Logotipo } from "../../components/Logo/Logo"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"


// IMPORT STYLE CSS
import './style.css'

// IMPORT HOOKS
import { MyRequest } from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from '../../context/AuthContext'; // Importar useAuth para usar o Context de Autenticação

const uri = 'http://127.0.0.1:5000' || import.meta.env.VITE_API_URL
console.log('API URL:', uri) // Verifica se a URL da API está correta
const req = new MyRequest()

export function AdminLogin(){
    // O estado de login agora é gerenciado pelo AuthContext, não mais localmente.
    // const [isLogged, setIsLogged] = useState(null) // Removido
    const [errorMessage, setErrorMessage] = useState('') // Estado para mensagens de erro
    const navigate = useNavigate()
    const { login, isLoggedIn } = useAuth(); // Obter a função 'login' e o estado 'isLoggedIn' do Context

    const token_validate = async (user)=>{
        setErrorMessage(''); // Limpa mensagens de erro anteriores
        try {
            const data = await req.post(`${uri}api/v1/auth/login`, user)

            // Verifica se a resposta contém o token de acesso
            if (data && data.access_token) {
                login(data.access_token); // Chama a função 'login' do AuthContext para armazenar o token e atualizar o estado global
                navigate('/delivery/admin-dashboard'); // Redireciona para o dashboard após login bem-sucedido
                return true
            } else {
                // Se o backend retornou uma mensagem de erro (ex: "Credenciais inválidas")
                setErrorMessage(data.message || 'Erro desconhecido ao validar token.');
                // Não é necessário chamar setIsLogged(false) aqui, pois o Context já gerencia isso.
                return false
            }
        } catch (error) {
            setErrorMessage(error.message || 'Erro na requisição de login.');
            // Não é necessário chamar setIsLogged(false) aqui, o Context já gerencia isso.
            console.error('Erro na requisição de login:', error);
            return false;
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)
        const element = e.target; // O 'e.target' aqui é o formulário
        const user = {
            username: element.username.value, // Acessa o valor do campo 'username' pelo seu atributo 'name'
            password: element.password.value  // Acessa o valor do campo 'password' pelo seu atributo 'name'
        }

        await token_validate(user); // Chama a função de validação do token
    }

    // Este useEffect agora lida com o redirecionamento se o usuário já estiver logado
    // ao tentar acessar a página de login diretamente.
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/delivery/admin-dashboard');
        }
    }, [isLoggedIn, navigate]); // Depende de 'isLoggedIn' (do Context) e 'navigate'

    return (
        <div className="admin-login">
            <Logotipo />
            <form onSubmit={handleSubmit}> {/* O onSubmit do formulário chama handleSubmit */}
                <h1 className="golden-text title">LOGIN</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro, se houver */}
                <Input type='text' placeholder={'E-mail'} required={true} name='username'/> {/* Campo de entrada para o e-mail */}
                <Input type='password' placeholder={'Senha'} required={true} name='password'/> {/* Campo de entrada para a senha */}
                <Button text='Entrar'/> {/* Botão de submissão do formulário (type='submit' por padrão) */}
            </form>
        </div>
    )
}
