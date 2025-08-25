
import { Gem, LogOut } from 'lucide-react';
const Header = ({ user, saldo, currentView, onNavigate, onRecharge, onLogout }) => {

    function formatoMoneda(valor, moneda = "VES", locale = "es-VE") {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: moneda,
            minimumFractionDigits: 2,
        }).format(valor);
    }


    return (
        <header className="app-header">
            <div className="logo">


            </div>
            <nav className="main-nav">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src="img/rifaneon_logo.gif"
                        alt="RIFANEON Logo"
                        className="h-10 w-auto drop-shadow-[0_0_10px_#d900ff]"
                    />
                </div>
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

                <button className="nav-btn" onClick={onLogout}>
                    <LogOut color="#00ffe1" />

                </button>
            </nav>
            <div className="user-panel flex flex-wrap md:flex-nowrap items-center justify-center md:justify-end gap-3 p-2">
                {/* Saldo */}
                <div className="balance-display flex items-center gap-2 bg-[#0a0014] px-3 py-1 rounded-lg text-white text-sm md:text-base">
                    <Gem color="#00ffe1" />
                    <span className="whitespace-nowrap">
                        {saldo != null ? formatoMoneda(saldo) : '0.00'}
                    </span>
                </div>

                {/* Botón Recargar */}
                <button
                    className="btn btn-primary px-3 py-2 rounded-lg text-sm md:text-base whitespace-nowrap"
                    onClick={onRecharge}
                >
                    Recargar
                </button>

                {/* Perfil */}
                <div className="user-profile-menu">
                    <button
                        className="btn btn-primary"
                        onClick={() => onNavigate('profile')}
                    >
                        <img
                            src={user.imagen_perfil}
                            alt="user avatar"
                            className="user-avatar w-8 h-8 rounded-full object-cover border border-[#d900ff] shadow-md"
                            onError={(e) => {
                                console.warn('Imagen no se pudo cargar, usando por defecto');
                                e.target.src = '/user-avatar.png';
                            }}
                        />
                        <span className="whitespace-nowrap">Perfil</span>
                    </button>
                </div>
            </div>

        </header >
    );
}

export default Header;

