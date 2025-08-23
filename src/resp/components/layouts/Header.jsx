import React from 'react';
import { useUser } from '../../ConText/UserContext';
import UserMenu from './UserMenu';
import Login from '../../components/Login';
const Header = () => {
    // Aquí podrías usar el contexto de usuario si necesitas información del usuario
    const { user, isAuthenticated, loadingUser } = useUser();

    return (
        <header className="gradient-bg text-white">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-ticket-alt text-2xl"></i>
                        <h1 className="text-2xl font-bold">Rifa Facil</h1>
                    </div>

                    <nav className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-indigo-200 font-medium">Inicio</a>
                        <a href="#rifas" className="hover:text-indigo-200 font-medium">Rifas</a>
                        <a href="#ganadores" className="hover:text-indigo-200 font-medium">Ganadores</a>
                        <a href="#reglas" className="hover:text-indigo-200 font-medium">Reglas</a>
                    </nav>
                    <div className="flex items-center space-x-4">


                        {isAuthenticated ? (
                            <UserMenu />

                        ) : (
                            <Login tipo="header" />

                        )}










                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobileMenu" className="hidden bg-indigo-800 md:hidden">
                <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
                    <a href="#" className="text-white py-2 hover:bg-indigo-700 px-2 rounded">Inicio</a>
                    <a href="#rifas" className="text-white py-2 hover:bg-indigo-700 px-2 rounded">Rifas</a>
                    <a href="#ganadores" className="text-white py-2 hover:bg-indigo-700 px-2 rounded">Ganadores</a>
                    <a href="#reglas" className="text-white py-2 hover:bg-indigo-700 px-2 rounded">Reglas</a>
                </div>
            </div>
        </header>
    );
};

export default Header;