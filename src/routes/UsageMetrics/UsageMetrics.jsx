import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyRequest, useLoading } from '../../hooks/useFetch'; // NOVO: Importar useLoading
import { useAuth } from '../../context/AuthContext';
import { LoadingModal } from "../../components/LoadingModal/LoadingModal"; // NOVO: Importar LoadingModal
import './style.css';

// Lógica para determinar a URI da API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const uri = isLocalhost ? 'http://127.0.0.1:5000/' : import.meta.env.VITE_API_URL;

const req = new MyRequest();

export function UsageMetrics() {
    const [generalCounts, setGeneralCounts] = useState([]);
    const [loading, setLoading] = useState(true); // Manter este estado para o carregamento inicial/erros específicos do componente
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const isLoading = useLoading(); // NOVO: Usar o hook useLoading

    useEffect(() => {
        const fetchUsageMetrics = async () => {
            setLoading(true); // Inicia o carregamento específico do componente
            setError('');

            const token = localStorage.getItem('access_token');

            if (!token) {
                navigate('/delivery/admin');
                return;
            }

            try {
                const data = await req.getAll(`${uri}api/v1/admin/usage_counts/general`, token);
                setGeneralCounts(data);
            } catch (err) {
                console.error('Erro ao buscar métricas de uso:', err);
                if (err.status === 401 || err.status === 403) {
                    localStorage.removeItem('access_token');
                    navigate('/delivery/admin');
                    setError('Acesso não autorizado ou sessão expirada. Faça login como superadministrador.');
                } else {
                    setError(`Erro ao carregar métricas: ${err.message || 'Erro desconhecido'}`);
                }
            } finally {
                setLoading(false); // Finaliza o carregamento específico do componente
            }
        };

        if (isLoggedIn) {
            fetchUsageMetrics();
        } else {
            setLoading(false);
            navigate('/delivery/admin');
        }
    }, [isLoggedIn, navigate]);

    // O modal global de carregamento será exibido/ocultado pelo `isLoading` do `useLoading`
    // O `loading` local pode ser usado para renderizar um placeholder específico da página, se desejar.
    if (error) {
        return <div className="usage-metrics-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="usage-metrics-container">
            <h2 className="page-title">Métricas de Uso Gerais</h2>
            {/* Você pode usar o 'loading' local para mostrar um esqueleto ou mensagem específica */}
            {loading ? (
                <p>Carregando métricas...</p>
            ) : generalCounts.length > 0 ? (
                <ul className="metrics-list">
                    {generalCounts.map((item, index) => (
                        <li key={index} className="metric-item">
                            <div className="metric-header">
                                <span className="metric-type">{item.action_type.replace(/_/g, ' ').toUpperCase()}</span>
                            </div>
                            <div className="metric-details">
                                <span className="metric-count">Total: {item.count}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma métrica de uso geral encontrada.</p>
            )}
            <LoadingModal show={isLoading} /> {/* NOVO: Renderiza o modal baseado no estado de carregamento */}
        </div>
    );
}
