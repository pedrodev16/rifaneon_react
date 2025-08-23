import React, { useState } from "react";
import ComprarRifa from "../ComprarRifa";
import { useUser } from '../../ConText/UserContext';
import Login from '../../components/Login';
export default function RifaModal({
    open,
    onClose,
    setModalOpen,
    raffle
}) {

    if (!raffle) return null; // Asegurarse de que raffle no sea null o undefined

    const { user, isAuthenticated } = useUser();
    const [participar, setParticipar] = useState(false);

    React.useEffect(() => {
        if (!open) setParticipar(false);
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">

            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">{raffle.titulo}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Cerrar"
                            type="button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="mb-6">
                        <img
                            src={raffle.foto_url}
                            alt="Raffle image"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Descripción</h3>
                        <p className="text-gray-600">{raffle.descripcion}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-gray-500 text-sm">Precio por boleto:</p>
                            <p className="text-indigo-600 font-bold">{raffle.precio_boleto}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Fecha de sorteo:</p>
                            <p className="text-gray-800 font-medium">{raffle.fecha_fin}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Boletos disponibles:</p>
                            <p className="text-gray-800 font-medium">{raffle.available}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Estado:</p>
                            <p className="text-green-600 font-medium">{raffle.estado}</p>
                        </div>
                    </div>
                    {!isAuthenticated && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-exclamation-circle text-yellow-400"></i>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        Debes{" "}
                                        <Login />
                                        {" "}
                                        y completar tu perfil para participar en esta rifa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {isAuthenticated && !participar && (
                        <div className="flex justify-end">
                            <button
                                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                                onClick={() => setParticipar(true)}
                            >
                                Participar en esta rifa
                            </button>
                        </div>
                    )}
                    {isAuthenticated && participar && (
                        <ComprarRifa rifaId={raffle.id} setModalOpen={setModalOpen} />
                    )}
                </div>
            </div>
        </div>
    );
}