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
            style={{ backgroundImage: "url(rifaneon2.png)" }}
        >
            {showConfetti && <Confetti />}

            {/* Login Box */}
            <div className="flex flex-row items-center justify-center gap-6 flex-wrap mb-8">
                {/* Caja RIFANEON */}
                <div
                    className="text-white p-6 rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md text-center flex-shrink-0"
                    style={{
                        background: "#0a0014",
                        border: "1px solid #d900ff",
                        boxShadow:
                            "rgb(217, 0, 255) 0px 0px 21.8208px, rgb(217, 0, 255) 0px 0px 38.1792px inset",
                    }}>
                    <div className="flex justify-center items-center gap-4 w-full">
                        <img style={{ width: "27%" }}
                            src="img/rifaneon_logo.gif"
                            alt="Chica casino neon"

                        />
                    </div>
                    <p className="text-gray-300 mb-6 text-sm leading-relaxed">

                        ¡Haz clic, participa y celebra! Rifas instantáneas, premios que te sacan una sonrisa y una plataforma que te lo pone fácil.
                    </p>
                    <button
                        className="flex items-center justify-center gap-3 w-full font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                        style={{
                            background: "linear-gradient(335deg, rgb(0 196 255), rgb(28 44 173))",
                            color: "#fff",
                            boxShadow:
                                "rgb(72 11 253) 0px 0px 21px, #0008ffd6 0px 0px 35px inset",
                        }}
                        onClick={onLogin}
                    >
                        <img
                            src="/google-logo.png"
                            alt="Google logo"
                            className="w-6 h-6 bg-white rounded-full"
                        />
                        <span>Iniciar sesión con Google</span>
                    </button>
                </div>

                {/* Imagen decorativa */}
                <div className="flex-shrink-0 flex justify-center">
                    <img
                        src="img/chica_rifaneon2.png"
                        alt="Chica casino neon"
                        className="w-32 sm:w-44 md:w-56 lg:w-64 drop-shadow-[0_0_25px_#d900ff] object-contain"
                    />
                </div>
            </div>




            {/* Información en grilla */}
            <div
                className="max-w-5xl w-full p-6 rounded-2xl overflow-y-auto"
                style={{
                    background: "#0f001a",
                    border: "1px solid #d900ff",
                    boxShadow:
                        "rgb(217, 0, 255) 0px 0px 21.8208px, rgb(217, 0, 255) 0px 0px 38.1792px inset",
                }}
            >
                {/* Cómo Jugar */}
                <h2 className="text-3xl font-bold text-yellow-400 mb-4 drop-shadow-[0_0_8px_#ff0]">
                    🎮 Cómo Jugar
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

                    <InfoItem
                        icon={<ShieldAlert className="text-blue-400 w-6 h-6 drop-shadow-[0_0_7px_#0ff]" />}
                        text="Completa primero tu perfil con tus datos bancarios. El sistema solo permite comprar números si tienes tus datos actualizados. Estos datos serán usados en caso de que ganes para transferirte tu premio."
                    />

                    <InfoItem
                        icon={<Wallet className="text-yellow-400 w-6 h-6 drop-shadow-[0_0_6px_#ff0]" />}
                        text="Recarga tu saldo usando métodos locales como Pago Móvil o transferencia."
                    />


                    <InfoItem
                        icon={<CheckCircle className="text-green-400 w-6 h-6 drop-shadow-[0_0_6px_#0f0]" />}
                        text="Cuando se apruebe tu saldo, selecciona tus números favoritos."
                    />
                    <InfoItem
                        icon={<CheckCircle className="text-blue-400 w-6 h-6 drop-shadow-[0_0_6px_#0ff]" />}
                        text="Confirma tu compra y el valor se descontará de tu saldo."
                    />
                    <InfoItem
                        icon={<Dice5 className="text-purple-400 w-6 h-6 drop-shadow-[0_0_6px_#f0f]" />}
                        text="Cuando se vendan todos los números, comenzará el sorteo automáticamente."
                    />
                    <InfoItem
                        icon={<Gift className="text-pink-400 w-6 h-6 drop-shadow-[0_0_6px_#f0f]" />}
                        text="Un número se elegirá al azar y se anunciará el ganador."
                    />
                    <InfoItem
                        icon={<Timer className="text-red-400 w-6 h-6 drop-shadow-[0_0_6px_#f00]" />}
                        text="Si ganas 🎉 recibirás el premio en minutos."
                    />
                </div>

                {/* Reglas y Condiciones */}
                <h2 className="text-3xl font-bold text-yellow-400 mt-6 mb-4 drop-shadow-[0_0_8px_#ff0]">
                    📜 Reglas y Condiciones
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <InfoItem
                        icon={<Timer className="text-yellow-400 w-6 h-6 drop-shadow-[0_0_6px_#ff0]" />}
                        text="El pago al ganador se realiza en un plazo máximo de minutos."
                    />
                    {/* <InfoItem
                        icon={<ShieldAlert className="text-blue-400 w-6 h-6 drop-shadow-[0_0_6px_#0ff]" />}
                        text="Se descuenta automáticamente el valor de un número por mantenimiento de la plataforma."
                    /> */}
                    <InfoItem
                        icon={<Ban className="text-red-400 w-6 h-6 drop-shadow-[0_0_6px_#f00]" />}
                        text="No nos hacemos responsables de errores en datos bancarios ni de terceros malintencionados."
                    />
                    <InfoItem
                        icon={<FileText className="text-green-400 w-6 h-6 drop-shadow-[0_0_6px_#0f0]" />}
                        text="Participar implica aceptar todas las reglas."
                    />
                    <InfoItem
                        icon={<ShieldAlert className="text-yellow-400 w-6 h-6 drop-shadow-[0_0_6px_#ff0]" />}
                        text="Juega con responsabilidad."
                    />
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
