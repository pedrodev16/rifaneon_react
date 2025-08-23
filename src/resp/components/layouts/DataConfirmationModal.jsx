import React from "react";

// Props:
// open (boolean): si el modal está visible
// onClose (function): para cerrar el modal
// tickets (array de string o número): los números asignados al usuario
export default function DataConfirmationModal({ open, mensaje, onClose }) {

    // function cerrarModal() {
    //     setModalOpen(false)
    //     onClose()
    // }

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

                    </p>



                    <button
                        onClick={onClose}
                        className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
}