import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../../context/AuthContext'; // Importar useAuth para usar o Context de Autenticação

// IMPORT STYLE CSS
import './style.css'

// IMPORT REACT-ICONS
import { TbLogin2, TbTruckDelivery, TbHome} from "react-icons/tb"
import { RiAdminLine } from "react-icons/ri";

export function Nav(){  
    // Obtém o estado de login e a função de logout do AuthContext
    const { isLoggedIn, logout } = useAuth(); 
    const navigate = useNavigate(); // Manter useNavigate aqui, pois Nav está dentro do Router

    // Função para lidar com o clique no botão de logout
    const handleLogoutClick = (e) => {
        logout(); // Chama a função logout do Context (limpa o token e atualiza isLoggedIn)
        navigate('/delivery/admin'); // Redireciona para a página de login após o logout
    };

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
                {/* Exibição condicional do botão de Logout baseada no estado 'isLoggedIn' do Context */}
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
