import React from "react";

const InfoPanel = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
            <div className="w-96 bg-gray-900 text-white p-6 overflow-y-auto shadow-2xl">
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white float-right"
                >
                    ✖
                </button>

                <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎮 Cómo Jugar</h2>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Completa primero tu <strong>perfil</strong>. El sistema solo permite comprar números si tienes tus datos actualizados.
                        Estos datos serán usados en caso de que ganes para transferirte tu premio.</li>
                    <li>Recarga tu saldo usando métodos locales como Pago Móvil o transferencia.</li>
                    <li>Cuando se apruebe tu saldo, selecciona tus números favoritos.</li>
                    <li>Confirma tu compra y el valor se descontará de tu saldo.</li>
                    <li>Cuando se vendan todos los números, comenzará el sorteo automáticamente.</li>
                    <li>Un número se elegirá al azar y se anunciará el ganador.</li>
                    <li>Si ganas 🎉 recibirás el premio en minutos.</li>
                </ul>

                <h2 className="text-2xl font-bold text-yellow-400 mt-6 mb-4">📜 Reglas y Condiciones</h2>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>El pago al ganador se realiza en un plazo máximo de <strong>minutos</strong>.</li>
                    <li>No nos hacemos responsables de errores en datos bancarios ni de terceros malintencionados.</li>
                    <li>Participar implica aceptar todas las reglas.</li>
                    <li><strong>Juega con responsabilidad.</strong></li>
                </ul>

                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition"
                    >
                        Entendido, quiero jugar 🎉
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoPanel;
