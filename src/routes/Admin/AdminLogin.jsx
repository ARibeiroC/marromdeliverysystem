// IMPORT COMPONENTS
import { Logotipo } from "../../components/Logo/Logo"
import { Button } from "../../components/Button/Button"
import { Input } from "../../components/Input/Input"


// IMPORT STYLE CSS
import './style.css'


export function AdminLogin(){
    return (
        <div className="admin-login">
            <Logotipo />
            <form>
                <h1 className="golden-text title">LOGIN</h1>
                <Input type='email' placeholder={'E-mail'} required={true}/>
                <Input type='password' placeholder={'Senha'} required={true} />
                <Button text='Entrar' />
            </form>
        </div>
    )    
}