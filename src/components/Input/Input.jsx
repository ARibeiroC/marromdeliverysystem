
// IMPORT STYLE CSS
import './style.css'

export function Input({type, placeholder, name, value, onChange, required = false, disabled = false, minLenght = 0, maxLenght = 255}){    
    return (
        <div className="input">
            <input type={type} required={required} placeholder={placeholder} minLength={minLenght} maxLength={maxLenght} name={name} value={value} onChange={onChange}/>
        </div>
    )
}