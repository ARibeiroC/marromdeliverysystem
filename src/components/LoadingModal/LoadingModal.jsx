import React from 'react';
import './style.css'; // Estilo para o modal

export function LoadingModal({ show }) {
    if (!show) {
        return null; // Não renderiza nada se 'show' for falso
    }

    return (
        <div className="loading-modal-overlay">
            <div className="loading-modal-content">
                <div className="spinner"></div> {/* Ícone de spinner */}
                <p>Carregando...</p>
            </div>
        </div>
    );
}
