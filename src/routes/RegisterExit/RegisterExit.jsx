// IMPORT COMPONENTS
import { Logotipo }from '../../components/Logo/Logo'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { LoadingModal } from "../../components/LoadingModal/LoadingModal";


// IMPORT STYLE CSS
import './style.css'


// IMPORT HOOKS
import { useState } from 'react'
import { MyRequest, useLoading } from '../../hooks/useFetch'

// Lógica para determinar a URI da API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const uri = isLocalhost ? 'http://127.0.0.1:5000/' : import.meta.env.VITE_API_URL;

const req = new MyRequest()

export function RegisterExit(){
    const [nomeDoMotorista, setNomeDoMotorista] = useState('');
    const [placaDoVeiculo, setPlacaDoVeiculo] = useState('');
    const [message, setMessage] = useState('');
    const isLoading = useLoading();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMessage('');

        const forData = {
            'nome_do_motorista': nomeDoMotorista,
            'placa_do_veiculo': placaDoVeiculo,
        };

        console.log('Enviando dados para registro de saída:', forData);

        try {
            const response = await req.post(`${uri}api/v1/registros_saida`, forData);

            if (response && response.error) {
                setMessage(`Erro: ${response.error}`);
            } else if (response && response.message) {
                setMessage(`Sucesso: ${response.message}`);
                setNomeDoMotorista('');
                setPlacaDoVeiculo('');
            } else {
                setMessage('Resposta inesperada do servidor.');
            }
        } catch (error) {
            setMessage(`Erro na requisição: ${error.message || 'Erro desconhecido'}`);
            console.error('Erro na requisição:', error);
        }
    };


    return (
        <div className="register-exit">
            <Logotipo />
            <h1>REGISTRAR SAÍDA</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <Input
                    type='text'
                    placeholder={'Nome completo do motorista'}
                    minLength={20}
                    maxLength={80}
                    required={true}
                    name='nome-motorista'
                    value={nomeDoMotorista}
                    onChange={(e)=> setNomeDoMotorista(e.target.value)}
                />
                <Input
                    type='text'
                    placeholder={'Placa do Veículo'}
                    maxLength={9}
                    required={true}
                    name='placa-veiculo'
                    value={placaDoVeiculo}
                    onChange={(e)=> setPlacaDoVeiculo(e.target.value)}
                />
                <Button text='Registrar' />
            </form>
            {message && <p className="message">{message}</p>}
            <LoadingModal show={isLoading} />
        </div>
    )
}
