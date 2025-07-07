import { Outlet } from 'react-router-dom';


// IMPORT STYLES CSS
import './style.css'


// IMPORT ICONS
import { TbTruckDelivery, TbLogin2 } from "react-icons/tb";

export function Delivery(){
    return (
        <div className="delivery">
            <Outlet />
        </div>
    )
}