
// IMPORT STYLE CSS
import './style.css'

export function Input({type, placeholder, required = false, disabled = false, minLenght = 0, maxLenght = 255}){
    return (
        <div className="input">
            <input type={type} required={required} placeholder={placeholder} minLength={minLenght} maxLength={maxLenght}/>
        </div>
    )
}