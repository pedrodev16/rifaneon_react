import React, { useState, useEffect, useRef } from "react";
import { useUser } from '../../ConText/UserContext';
const UserMenu = () => {
    const { loadingUser, user, logout } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Cierra el menú si el usuario hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loadingUser) return <span>Cargando...</span>;
    if (!user) return null; // O puedes mostrar un botón de login

    return (
        <div className="relative" ref={menuRef}>
            <button
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Usuario"
                    className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">
                    {user.nombre}
                </span>
                <i className="fas fa-chevron-down text-sm"></i>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a href="perfil.html" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">
                        Mi Perfil
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">
                        Configuración
                    </a>
                    <a href="#" onClick={logout} className="block px-4 py-2 text-gray-800 hover:bg-indigo-50">
                        Cerrar Sesión
                    </a>
                </div>
            )}
        </div>
    );
};

export default UserMenu;