import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';

// IMPORT STYLE CSS
import './style.css'

// IMPORT REACT-ICONS
import { TbLogin2, TbTruckDelivery, TbHome} from "react-icons/tb"
import { RiAdminLine, RiBarChartFill } from "react-icons/ri";

export function Nav(){  
    const { isLoggedIn, logout } = useAuth(); 
    const navigate = useNavigate();
    const [isSuperadmin, setIsSuperadmin] = useState(false);

    const handleLogoutClick = (e) => {
        logout();
        navigate('/delivery/admin');
    };

    useEffect(() => {
        const checkUserRole = async () => {
            if (isLoggedIn) {
                const token = sessionStorage.getItem('access_token');
                if (token) {
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        setIsSuperadmin(payload.role === 'superadmin');

                    } catch (error) {
                        console.error("Erro ao decodificar token ou verificar papel:", error);
                        setIsSuperadmin(false);
                    }
                }
            } else {
                setIsSuperadmin(false);
            }
        };

        checkUserRole();
    }, [isLoggedIn]);

    return (
        <nav className="nav">
            <ul>
                <li>
                    <Link to={'/'}><TbHome /></Link>
                </li>
                <li>
                    <Link to={'/delivery/admin'}><RiAdminLine /></Link>
                </li>
                <li>
                    <Link to={'/delivery/register-exit'}><TbTruckDelivery /></Link>
                </li>
                {/* Link para Métricas Gerais, visível apenas para superadministradores */}
                {isLoggedIn && isSuperadmin && (
                    <li>
                        <Link to={'/delivery/admin-metrics-general'}>
                            <RiBarChartFill />
                        </Link>
                    </li>
                )}
                {/* Exibição condicional do botão de Logout */}
                {isLoggedIn ? (
                    <li>
                        <Link onClick={handleLogoutClick} className="nav-button-logout" to="#">
                            <TbLogin2 />
                        </Link>
                    </li>
                ) : (
                    <></>
                )}
            </ul>
        </nav>
    )
}
