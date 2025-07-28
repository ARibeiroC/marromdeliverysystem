import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyRequest } from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import './style.css';

// Lógica para determinar a URI da API
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const uri = isLocalhost ? 'http://127.0.0.1:5000/' : import.meta.env.VITE_API_URL;

const req = new MyRequest();

export function UsageMetrics() {
    const [generalCounts, setGeneralCounts] = useState([]); // Renomeado para generalCounts
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const fetchUsageMetrics = async () => {
            setLoading(true);
            setError('');

            const token = sessionStorage.getItem('access_token');

            if (!token) {
                navigate('/delivery/admin');
                return;
            }

            try {
                // Rota para métricas gerais
                const data = await req.getAll(`${uri}api/v1/admin/usage_counts/general`, token);
                setGeneralCounts(data); // Define em generalCounts
            } catch (err) {
                console.error('Erro ao buscar métricas de uso:', err);
                if (err.status === 401 || err.status === 403) {
                    sessionStorage.removeItem('access_token');
                    navigate('/delivery/admin');
                    setError('Acesso não autorizado ou sessão expirada. Faça login como superadministrador.');
                } else {
                    setError(`Erro ao carregar métricas: ${err.message || 'Erro desconhecido'}`);
                }
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            fetchUsageMetrics();
        } else {
            setLoading(false);
            navigate('/delivery/admin');
        }
    }, [isLoggedIn, navigate]);

    if (loading) {
        return <div className="usage-metrics-container"><p>Carregando métricas...</p></div>;
    }

    if (error) {
        return <div className="usage-metrics-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="usage-metrics-container">
            <h2 className="page-title">Métricas de Uso Gerais</h2> {/* Título da página */}
            {generalCounts.length > 0 ? (
                <ul className="metrics-list">
                    {generalCounts.map((item, index) => (
                        <li key={index} className="metric-item">
                            <div className="metric-header">
                                <span className="metric-type">{item.action_type.replace(/_/g, ' ').toUpperCase()}</span>
                            </div>
                            <div className="metric-details">
                                <span className="metric-count">Total: {item.count}</span> {/* Texto para "Total" */}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma métrica de uso geral encontrada.</p>
            )}
        </div>
    );
}
