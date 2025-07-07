// IMPORT COMPONENT
import { Nav } from '../Nav/Nav'

// IMPORT STYLE CSS
import './style.css'

export function Header(){
    return (
        <header className="header">
            <Nav />
            {/* {window.location.href.match('home') ? '' : <Logo />} */}
        </header>
    )
}