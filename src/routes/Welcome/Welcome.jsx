// IMPORT COMPONENTS
import { Logotipo } from '../../components/Logo/Logo';

// IMPORT REACT-ICONS
import { TbTruckDelivery, TbLogin2 } from 'react-icons/tb';

// IMPORT STYLE CSS
import './style.css'

export function Welcome(){
    return (
        <div className="welcome">
            <Logotipo />
            <h2 className="golden-text title">Gestão de Saídas</h2>
            <ul>
                <li>Se você é um motorista e quer registrar a saída da data atual, clique no Menu <TbTruckDelivery /> </li>
                <li>Se você é um gestor do sistema, pode fazer login no Menu <TbLogin2 /></li>
            </ul>
        </div>
    )
}