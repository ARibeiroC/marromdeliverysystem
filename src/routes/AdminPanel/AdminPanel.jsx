// IMPORT COMPONENTS
import {Input} from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'
import { LoadingModal } from "../../components/LoadingModal/LoadingModal"; // NOVO: Importar LoadingModal

// IMPORT STYLE CSS
import './style.css'

// IMPORT HOOKS
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from 'react'
import { MyRequest, useLoading } from '../../hooks/useFetch' // NOVO: Importar useLoading

// Lógica para determinar a URI da API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const uri = isLocalhost ? 'http://127.0.0.1:5000/' : import.meta.env.VITE_API_URL; // Use a URL do Render para produção

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

    const [totalSaidas, setTotalSaidas] = useState(0)
    const [totalValores, setTotalValores] = useState(0)
    const [saidasPeriodo, setSaidasPeriodo] = useState(0)

    const [dataStart, setDataStart] = useState('')
    const [dataEnd, setDataEnd] = useState('')

    const navigate = useNavigate()
    const isLoading = useLoading(); // NOVO: Usar o hook useLoading

    const handleFilter = async (e)=>{
        e.preventDefault()
        requestExits(dataStart, dataEnd, false); 
    }

    async function requestExits(startDate, endDate, showFeedback = false){
        const token = localStorage.getItem('access_token')

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
                localStorage.removeItem('access_token');
                navigate('/delivery/admin');
            } else {
                console.error('Erro na requisição de registros:', error);
            }
        }
    }

    async function requestOverallExits() {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setTotalSaidas(0);
            return;
        }

        const url = `${uri}api/v1/registros_saida/total`;

        try {
            const data = await req.getAll(url, token);
            setTotalSaidas(data.total_saidas);
        } catch (error) {
            console.error('Erro ao carregar o total geral de registros:', error);
            setTotalSaidas(0);
        }
    }

    function getInitialPeriodDates(){
        const start = formatedData(dia-1, mes, ano)
        const end = formatedData(dia, mes, ano)
        return {start, end}
    }

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/delivery/admin');
    };

    useEffect(()=>{
        const period = getInitialPeriodDates()

        if(localStorage.getItem('access_token') === null){
            navigate('/delivery/admin')
        } else {
            setDataStart(period.start)
            setDataEnd(period.end)
            requestExits(period.start, period.end, false)
            requestOverallExits(); 
        }
    },[])

    return (
        <div className="admin-panel">
            <h2 className="page-title">Dashboard</h2>
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Total de saídas</h3>
                    <p className="summary-value">{totalSaidas}</p>
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
                                        <p className="driver-name">{record.nome_do_motorista}</p>
                                        <p className="vehicle-plate">{record.placa_do_veiculo}</p>
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
            <LoadingModal show={isLoading} /> {/* NOVO: Renderiza o modal baseado no estado de carregamento */}
        </div>
    )
}
