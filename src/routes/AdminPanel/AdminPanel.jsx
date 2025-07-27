// IMPORT COMPONENTS
import {Input} from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'

// IMPORT STYLE CSS
import './style.css'

// IMPORT HOOKS
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { MyRequest } from '../../hooks/useFetch'

const uri = import.meta.env.VITE_API_URL

const data = new Date()
const dia = data.getDate()
const mes = data.getMonth() + 1
const ano = data.getFullYear()

const formatedData = (dia, mes, ano)=>{
    if (mes < 10){
        mes = `0${mes}`
    }
    return `${ano}-${mes}-${dia}`
}

export function AdminPanel(){
    const req = new MyRequest();
    const [records, setRecords] = useState([]);

    const [totalValores, setTotalValores] = useState(0)
    const [saidasPeriodo, setSaidasPeriodo] = useState(0)

    const [dataStart, setDataStart] = useState('')
    const [dataEnd, setDataEnd] = useState('')

    const navigate = useNavigate()

    const handleFilter = async (e)=>{
        e.preventDefault()

        requestExits(dataStart, dataEnd); // Passa true para exibir feedback de sucesso/erro
    }

    async function requestExits(startDate, endDate){
        const token = sessionStorage.getItem('access_token')

        if (!token) {
            navigate('/delivery/admin');
            return;
        }

        const url = `${uri}api/v1/registros_saida/periodo?start_date=${startDate}&end_date=${endDate}`;

        try {
            const data = await req.getAll(url, token);
            setRecords(data);
            setSaidasPeriodo(data.length);

            const sumValues = data.reduce((sum, record) => sum + (record.valor_atual || 0), 0);
            setTotalValores(sumValues);
        } catch (error) {
            if (error.status === 401) {
                sessionStorage.removeItem('access_token');
                showFeedbackMessage('Sessão expirada ou inválida. Faça login novamente.', 'error');
                navigate('/delivery/admin');
            } else {
                console.error('Erro na requisição de registros:', error);
            }
        }
    }

    function getInitialPeriodDates(){
        const start = formatedData(dia-1, mes, ano)
        const end = formatedData(dia, mes, ano)
        return {start, end}
    }

    // Função para logout (apenas no frontend) - Mantida para referência, mas o botão foi removido
    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        showFeedbackMessage('Sessão encerrada. Redirecionando para o login...', 'success');
        navigate('/delivery/admin');
    };

    useEffect(()=>{
        const period = getInitialPeriodDates()

        if(sessionStorage.getItem('access_token') === null){
            navigate('/delivery/admin')
        } else {
            setDataStart(period.start)
            setDataEnd(period.end)
            // Chamada inicial sem exibir feedback para o usuário
            requestExits(period.start, period.end, false)
        }
        
    },[])

    return (
        <div className="admin-panel">
            <h2 className="page-title">Dashboard</h2>
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Total de saídas</h3>
                    <p className="summary-value">{saidasPeriodo}</p>
                </div>
                <div className="summary-card">
                    <h3>Soma dos Valores</h3>
                    <p className="summary-value">R$ { totalValores.toFixed(2) }</p>
                </div>
                <div className="summary-card">
                    <h3>Saídas no período</h3>
                    <p className="summary-value">{saidasPeriodo}</p>
                </div>
            </div>
            <div className="filter-section">
                <div className="filters">
                    <label>
                        Data de Início:
                        <Input type={'date'} placeholder='' name='dataStart' value={dataStart} onChange={(e)=> setDataStart(e.target.value)}/>
                    </label>
                    <label>
                        Data Final:
                        <Input type={'date'} placeholder='' name='dataEnd' value={dataEnd} onChange={(e)=> setDataEnd(e.target.value)} />
                    </label>
                </div>
                <Button text={'Aplicar Filtros'} action={handleFilter} />
            </div>
            <div className="list-exit">
                <h2>Lista de Saídas</h2>
                {records.length > 0 ? (
                    <ul>
                        {records.map(record => {
                            const departureDate = new Date(record.timestamp_saida);
                            const date = departureDate.toLocaleDateString();
                            const time = departureDate.toLocaleTimeString();

                            return (
                                <li key={record._id} className="record-card">
                                    <div className="card-header">
                                        <p className="driver-name"><span>Motorista: </span>{record.nome_do_motorista}</p>
                                        <p className="vehicle-plate"><span>Veículo: </span>{record.placa_do_veiculo}</p>
                                    </div>
                                    <div className="card-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Data:</span>
                                            <span className="detail-value">{date}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Hora:</span>
                                            <span className="detail-value">{time}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Valor:</span>
                                            <span className="detail-value">R$ { (record.valor_atual || 0).toFixed(2) }</span>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>Nenhum registro de saída encontrado para o período.</p>
                )}
            </div>
            {/* REMOVIDO: Seção do botão de logout */}
        </div>
    )
}
