// IMPORT COMPONENTS
import { Logotipo } from '../../components/Logo/Logo'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'


// IMPORT STYLE CSS
import './style.css'


// IMPORT HOOKS
import { useState } from 'react'
import { MyRequest } from '../../hooks/useFetch'

const uri = import.meta.env.VITE_API_URL
const req = new MyRequest()

export function RegisterExit(){
    const [driverName, setDriverName] = useState()
    const [vehiclePlate, setvehiclePlate] = useState()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const forData = {
            'nome_do_motorista': driverName,
            'placa_do_veiculo': vehiclePlate,
            'timestamp_saida': timestampSaida || undefined
        }
        console.log(forData)
        await req.post(`${uri}api/v1/registros_saida`, forData)
    }


    return (
        <div className="register-exit">
            <Logotipo />
            <h1>REGISTRAR SAÍDA</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <Input type='text' placeholder={'Nome completo do motorista'} minLenght={20} maxLenght={80} required={true} name='driver-name' onChange={(e)=> setDriverName(e.target.value)}/>
                <Input type='text' placeholder={'Placa do Veículo'} maxLenght={9} name='vehicle-plate' onChange={(e)=> setvehiclePlate(e.target.value)}/>
                <Button text='Registrar' required={true} />
            </form>
        </div>
    )
}