import { Link } from "react-router-dom"
import { useState, useEffect } from "react";


// IMPORT STYLE CSS
import './style.css'

// IMPORT REACT-ICONS
import { TbLogin2, TbTruckDelivery, TbHome} from "react-icons/tb"
import { RiAdminLine } from "react-icons/ri";

// IMPORT COMPONENTS
import { Logotipo } from "../Logo/Logo";

export function Nav(){  
    const [isHome, setIsHome] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(()=>{

    }, [isHome, isAdmin])
    return (
        <nav className="nav">
            {/* { !window.location.href.match('home') ? <Logotipo /> : <></>}
            {console.log(window.location.href.match('home'))} */}
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
                {
                    window.location.href.match('admin') ? (
                        <Link>
                            <li>
                                <TbLogin2 />
                            </li>
                        </Link>
                    ) : ('')
                }
            </ul>
        </nav>
    )
}