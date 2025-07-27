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
import { useAuth } from '../../context/AuthContext';

// Lógica para determinar a URI da API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const uri = isLocalhost ? 'http://127.0.0.1:5000/' : import.meta.env.VITE_API_URL; // Use a URL do Render para produção

const req = new MyRequest()

export function AdminLogin(){
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const { login, isLoggedIn } = useAuth();

    const token_validate = async (user)=>{
        setErrorMessage('');
        try {
            const data = await req.post(`${uri}api/v1/auth/login`, user)

            if (data && data.access_token) {
                login(data.access_token);
                navigate('/delivery/admin-dashboard');
                return true
            } else {
                setErrorMessage(data.message || 'Erro desconhecido ao validar token.');
                return false
            }
        } catch (error) {
            setErrorMessage(error.message || 'Erro na requisição de login.');
            console.error('Erro na requisição de login:', error);
            return false;
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const element = e.target;
        console.log('Formulário submetido:', element);
        const user = {
            username: element.username.value,
            password: element.password.value
        }

        await token_validate(user);
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/delivery/admin-dashboard');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="admin-login">
            <Logotipo />
            <form onSubmit={handleSubmit}>
                <h1 className="golden-text title">LOGIN</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Input type='text' placeholder={'E-mail'} required={true} name='username'/>
                <Input type='password' placeholder={'Senha'} required={true} name='password'/>
                <Button text='Entrar'/>
            </form>
        </div>
    )
}
