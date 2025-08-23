import React from 'react';

const Header = ({ user, saldo, currentView, onNavigate, onRecharge, onLogout }) => {




    return (
        <header className="app-header">
            <div className="logo">RIFANEON</div>
            <nav className="main-nav">
                <button
                    className={`nav-btn ${currentView === 'raffle' ? 'active' : ''}`}
                    onClick={() => onNavigate('raffle')}>
                    Sorteo
                </button>
                <button
                    className={`nav-btn ${currentView === 'history' ? 'active' : ''}`}
                    onClick={() => onNavigate('history')}>
                    Ganadores
                </button>
            </nav>
            <div className="user-panel">
                <div className="balance-display">
                    <i data-lucide="gem"></i>
                    <span>Bs {saldo != null ? Number(saldo).toFixed(2) : '0.00'}</span>
                </div>
                <button className="btn btn-primary" onClick={onRecharge}>Recargar</button>
                <div className="user-profile-menu">
                    <button className="btn" onClick={() => onNavigate('profile')}>
                        <img
                            src={user.imagen_perfil}
                            alt="user avatar"
                            className="user-avatar"
                            onError={(e) => {
                                console.warn('Imagen no se pudo cargar, usando por defecto');
                                e.target.src = '/user-avatar.png';
                            }}
                        />
                        <span>Perfil</span>
                    </button>

                </div>
                <button className="btn btn-secondary" onClick={onLogout}>
                    <i data-lucide="log-out"></i>
                    <span>Salir</span>
                </button>
            </div>
        </header>
    );
}

export default Header;

