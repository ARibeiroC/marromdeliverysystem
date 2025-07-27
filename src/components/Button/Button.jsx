// IMPORT STYLE CSS
import './style.css'

export function Button({text, type = 'submit', action = ()=>{}, wait = false}){
    
    // A função handleClick simplesmente chama a 'action' passada como prop
    function handleClick(e){
        if (type !== 'submit') {
            e.preventDefault();
        }
        action(e); // Executa a função de ação passada
    }

    return (
        <div className="button">
            <button
                className="golden-button"
                type={type}
                onClick={handleClick} // Garante que a função é executada no clique
                disabled={wait} // Desabilita o botão se 'wait' for true
            >
                {wait ? 'AGUARDE...' : text} {/* Exibe 'AGUARDE...' se 'wait' for true */}
            </button>
        </div>
    )
}
