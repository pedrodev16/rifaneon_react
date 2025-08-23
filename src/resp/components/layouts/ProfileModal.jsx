import React, { useState } from "react";
import axios from "axios";

export default function ProfileModal({ open, token, setestadoRegistro, onClose, onComplete }) {

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        numero_id: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await axios.post(
                "https://rifaneon.alwaysdata.net/api/user/personal-data",
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setestadoRegistro(true);
            setLoading(false);
            onComplete?.();


        } catch (err) {
            setLoading(false);
            setError("Completa todos los campos correctamente");
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Completa tu perfil</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            type="button"
                            aria-label="Cerrar"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Para participar en rifas, necesitamos que completes la siguiente información:
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                                Apellido
                            </label>
                            <input
                                type="text"
                                id="apellido"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="numero_id" className="block text-sm font-medium text-gray-700 mb-1">
                                Número de identificación
                            </label>
                            <input
                                type="text"
                                id="numero_id"
                                name="numero_id"
                                value={form.numero_id}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
                            disabled={loading}
                        >
                            {loading ? "Guardando..." : "Guardar y Continuar"}
                        </button>
                    </form>


                </div>
            </div>
        </div>
    );
}