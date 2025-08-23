import React from 'react';
import { useUser } from '../ConText/UserContext';

function Login({ tipo }) {
    const { login } = useUser();

    const loginWithGoogle = () => {
        const popup = window.open(
            'https://rifaneon.alwaysdata.net/api/auth/google',
            '_blank',
            'width=500,height=600'
        );
        window.addEventListener('message', function handler(event) {
            if (event.data && event.data.access_token) {
                login(event.data.access_token);
                window.removeEventListener('message', handler);
            }
        });
    };
    if (tipo == "header") {
        return (

            <button onClick={loginWithGoogle} className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition">
                <i className="fas fa-sign-in-alt mr-2"></i>  Iniciar sesión con Google
            </button>
        );
    } else {
        return (

            <button onClick={loginWithGoogle} className="font-medium text-yellow-700 underline hover:text-yellow-600"
                type="button">
                <i className="fas fa-sign-in-alt mr-2"></i>  iniciar sesión
            </button>

        );
    }
}
export default Login;