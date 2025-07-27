// IMPORT COMPONENTS
import { Logotipo } from '../../components/Logo/Logo'
import { Input } from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'


// IMPORT STYLE CSS
import './style.css'


// IMPORT HOOKS
import { useState } from 'react'
import { MyRequest } from '../../hooks/useFetch'

// Lógica para determinar a URI da API (mantida)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const uri = isLocalhost ? 'http://127.0.0.1:5000/' : import.meta.env.VITE_API_URL; // Use a URL do Render para produção

const req = new MyRequest()

export function RegisterExit(){
    // Estados baseados na sua versão fornecida, mas com nomes mais descritivos para o backend
    const [nomeDoMotorista, setNomeDoMotorista] = useState(''); // Usando nomeDoMotorista
    const [placaDoVeiculo, setPlacaDoVeiculo] = useState(''); // Usando placaDoVeiculo
    const [timestampSaida, setTimestampSaida] = useState(''); // Estado para data/hora de saída (mantido)
    const [message, setMessage] = useState(''); // Estado para mensagens de feedback (mantido)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setMessage(''); // Limpa mensagens anteriores

        const forData = {
            'nome_do_motorista': nomeDoMotorista, // Usando nomeDoMotorista
            'placa_do_veiculo': placaDoVeiculo, // Usando placaDoVeiculo
            'timestamp_saida': timestampSaida || undefined // Se vazio, o backend usará datetime.now()
        };

        console.log('Enviando dados para registro de saída:', forData);

        try {
            const response = await req.post(`${uri}api/v1/registros_saida`, forData);

            if (response && response.error) {
                setMessage(`Erro: ${response.error}`);
            } else if (response && response.message) {
                setMessage(`Sucesso: ${response.message}`);
                // Limpa os campos do formulário após o sucesso
                setNomeDoMotorista('');
                setPlacaDoVeiculo('');
                setTimestampSaida('');
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
                    minLength={20} // Corrigido para minLength
                    maxLength={80} // Corrigido para maxLength
                    required={true}
                    name='driver-name'
                    value={nomeDoMotorista} // Vinculado ao estado nomeDoMotorista
                    onChange={(e)=> setNomeDoMotorista(e.target.value)} // Atualiza nomeDoMotorista
                />
                <Input
                    type='text'
                    placeholder={'Placa do Veículo'}
                    maxLength={9} // Corrigido para maxLength
                    required={true} // Adicionado required para consistência
                    name='vehicle-plate'
                    value={placaDoVeiculo} // Vinculado ao estado placaDoVeiculo
                    onChange={(e)=> setPlacaDoVeiculo(e.target.value)} // Atualiza placaDoVeiculo
                />
                {/* Input para Data e Hora de Saída (mantido) */}
                <Input
                    type='datetime-local'
                    placeholder={'Data e Hora da Saída (Opcional)'}
                    name='timestamp-saida'
                    value={timestampSaida}
                    onChange={(e)=> setTimestampSaida(e.target.value)}
                />
                <Button text='Registrar' /> {/* 'required' removido, não é uma prop padrão para Button */}
            </form>
            {message && <p className="message">{message}</p>} {/* Exibe a mensagem de feedback (mantido) */}
        </div>
    )
}
