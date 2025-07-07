// IMPORT STYLE CSS
import './style.css'

// IMPORT IMAGE
import logo from '../../assets/marrom_film_logo_white.png'

export function Logotipo(){
    return (
        <div className="logo">
            <div className="logo-container">
                <img src={logo} alt="logotipo da Marron Film" />
            </div>
        </div>
    )
}