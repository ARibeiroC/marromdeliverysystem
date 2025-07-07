// IMPORT COMPONENTS
import { Logotipo } from '../../components/Logo/Logo'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'


// IMPORT STYLE CSS
import './style.css'

export function RegisterExit(){
    return (
        <div className="register-exit">
            <Logotipo />
            <form>
                <h1>REGISTRAR SAÍDA</h1>
                <Input type='text' placeholder={'Nome completo do motorista'} minLenght={20} maxLenght={80} required={true} />
                <Input type='text' placeholder={'Placa do Veículo'} />
                <Button text='Registrar' required={true} />
            </form>
        </div>
    )
}