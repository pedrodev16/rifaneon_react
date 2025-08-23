import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import TutorialWrapper from "./TutorialWrapper";
import { Wallet, CheckCircle, Dice5, Gift, Timer, ShieldAlert, Ban, FileText } from "lucide-react";

const Login = ({ onLogin }) => {
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowConfetti(false), 10000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start py-10"
            style={{ backgroundImage: 'url(rifaneon2.png)' }}
        >
            {showConfetti && <Confetti />}

            {/* Login Box */}
            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-md mb-8">
                <h1 className="text-4xl font-bold text-yellow-400 mb-4 text-center">RIFANEON</h1>
                <p className="text-center text-gray-300 mb-6">
                    🎟️ Participa en rifas, gana premios increíbles y cobra fácilmente desde nuestra plataforma.
                </p>
                <button
                    className="flex items-center justify-center gap-3 w-full bg-white text-black font-semibold py-2 px-4 rounded-lg hover:bg-gray-100 transition"
                    onClick={onLogin}
                >
                    <img src="/google-logo.png" alt="Google logo" className="w-6 h-6" />
                    <span>Iniciar sesión con Google</span>
                </button>
            </div>


            {/* Información en grilla */}
            <div className="max-w-5xl w-full bg-gray-900 text-white p-6 rounded-2xl shadow-lg overflow-y-auto">
                {/* Cómo Jugar */}
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎮 Cómo Jugar</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem icon={<Wallet className="text-yellow-400 w-6 h-6" />} text="Recarga tu saldo usando métodos locales como Pago Móvil o transferencia." />
                    <InfoItem icon={<CheckCircle className="text-green-400 w-6 h-6" />} text="Cuando se apruebe tu saldo, selecciona tus números favoritos." />
                    <InfoItem icon={<CheckCircle className="text-blue-400 w-6 h-6" />} text="Confirma tu compra y el valor se descontará de tu saldo." />
                    <InfoItem icon={<Dice5 className="text-purple-400 w-6 h-6" />} text="Cuando se vendan todos los números, comenzará el sorteo automáticamente." />
                    <InfoItem icon={<Gift className="text-pink-400 w-6 h-6" />} text="Un número se elegirá al azar y se anunciará el ganador." />
                    <InfoItem icon={<Timer className="text-red-400 w-6 h-6" />} text="Si ganas 🎉 recibirás el premio en minutos." />
                </div>

                {/* Reglas y Condiciones */}
                <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-4">📜 Reglas y Condiciones</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem icon={<Timer className="text-yellow-400 w-6 h-6" />} text="El pago al ganador se realiza en un plazo máximo de minutos." />
                    <InfoItem icon={<ShieldAlert className="text-blue-400 w-6 h-6" />} text="Se descuenta automáticamente el valor de un número por mantenimiento de la plataforma." />
                    <InfoItem icon={<Ban className="text-red-400 w-6 h-6" />} text="No nos hacemos responsables de errores en datos bancarios ni de terceros malintencionados." />
                    <InfoItem icon={<FileText className="text-green-400 w-6 h-6" />} text="Participar implica aceptar todas las reglas." />
                    <InfoItem icon={<ShieldAlert className="text-yellow-400 w-6 h-6" />} text="Juega con responsabilidad." />
                </div>
            </div>
        </div>
    );
};

// Componente reutilizable para cada item de información
const InfoItem = ({ icon, text }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex items-start gap-3">
        {icon}
        <p>{text}</p>
    </div>
);

export default Login;
