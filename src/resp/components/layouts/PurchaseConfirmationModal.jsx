import React from "react";

// Props:
// open (boolean): si el modal está visible
// onClose (function): para cerrar el modal
// tickets (array de string o número): los números asignados al usuario
export default function PurchaseConfirmationModal({ open, mensaje, onClose, tickets = [], setModalOpen }) {

    function cerrarModal() {
        setModalOpen(false)
        onClose()
    }

    if (!open)
        return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
                <div className="p-6 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="fas fa-check text-green-600 text-3xl"></i>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{mensaje}</h2>
                    <p className="text-gray-600 mb-6">
                        Tus boletos han sido reservados. Revisa tu correo para más detalles.
                    </p>

                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Números asignados:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {tickets.length > 0
                                ? tickets.map((ticket, idx) => (
                                    <span
                                        key={idx}
                                        className="ticket-number px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold"
                                    >
                                        #{ticket}
                                    </span>
                                ))
                                : <span className="text-gray-400 text-sm">No hay números asignados</span>
                            }
                        </div>
                    </div>

                    <button
                        onClick={() => cerrarModal()}
                        className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}