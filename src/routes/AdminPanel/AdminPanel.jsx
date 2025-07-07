// IMPORT COMPONENTS
import {Input} from '../../components/Input/Input'
import { Button } from '../../components/Button/Button'

// IMPORT STYLE CSS
import './style.css'

export function AdminPanel(){
    return (
        <div className="admin-panel">
            <h2 className="page-title">Dashboard</h2>
            <div className="dashboard-summary">
                <div className="summary-card">
                    <h3>Total de Entregas</h3>
                    <p className="summary-value"> 15 </p>
                </div>
                <div className="summary-card">
                    <h3>Soma dos Valores</h3>
                    <p className="summary-value">R$ 700,00</p>
                </div>
                <div className="summary-card">
                    <h3>Entregas Hoje</h3>
                    <p className="summary-value">3</p>
                </div>
            </div>
            <div className="filter-section">
                <div className="filters">
                    <label>
                        Filtrar por Data:
                        <Input type={'date'} />    
                    </label>                    
                    <label>
                        Motorista:
                        <Input type={'text'} placeholder={'Nome do Motorista'} minLenght={20} maxLenght={80}/>
                    </label>
                    <label>
                        Placa:
                        <Input type={'text'} placeholder={'Placa do veículo'} maxLenght={9} />
                    </label>
                </div>
                <Button text={'Aplicar Filtros'} />
            </div>
            <div className="list-exit">
                <h2>Lista de Saídas</h2>
            </div>
        </div>
    )
}