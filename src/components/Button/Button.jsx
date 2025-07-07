import { useState } from 'react'

// IMPORT STYLE CSS
import './style.css'

export function Button({text, type = 'submit', action = null}){
    
    return (
        <div className="button">
            <button type={type} className="golden-button">{text}</button>
        </div>
    )
}