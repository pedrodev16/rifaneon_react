import React, { useState } from 'react';
import PersonalDataForm from './PersonalDataForm';
import ComprarRifa from './ComprarRifa';
import axios from 'axios';
import { useUser } from '../ConText/UserContext';
import RifaModal from './layouts/RifaModal';
import ProfileModal from './layouts/ProfileModal'
import DataConfirmationModal from './layouts/DataConfirmationModal';

async function checkPersonalData(token) {

    const res = await axios.get('https://rifaneon.alwaysdata.net/api/user/personal-data', {
        headers: { Authorization: `Bearer ${token}` }
    });

    const { nombre, apellido, numero_id, telefono } = res.data;
    return !(nombre && apellido && numero_id && telefono); // true si falta algún dato
}

function ProductList({ products }) {
    const { token } = useUser();
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [pendingBuy, setPendingBuy] = useState(null);
    const [rifaParaComprar, setRifaParaComprar] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [estadoRegistro, setestadoRegistro] = useState(false);
    const handleBuy = async (product) => {

        if (!token) {

            setShowPersonalForm(false); // Asegurarse de que el formulario no se muestre si no hay token
            //setPendingBuy(product); // Guardar el producto para comprar después
            setRifaParaComprar(product); // Mostrar ComprarRifa
            setModalOpen(true);
        } else {

            const missingData = await checkPersonalData(token);
            if (missingData) {

                setShowPersonalForm(true);
                setPendingBuy(product);
            } else {
                setRifaParaComprar(product); // Mostrar ComprarRifa
                setModalOpen(true);
            }
        }

    }

    const handlePersonalDataComplete = () => {
        if (!token) {
            setShowPersonalForm(false);
            if (pendingBuy) {
                setRifaParaComprar(pendingBuy); // Ahora sí mostrar ComprarRifa
                setPendingBuy(null);
            }
        }
    };

    const handleCancelarCompra = () => {
        setRifaParaComprar(null);
    };

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (


                <div key={p.id} className="raffle-card bg-white rounded-xl overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                        <img src={p.foto_url}
                            alt={p.titulo} className="w-full h-full object-cover" />
                        <div
                            className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {p.estado}
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{p.titulo}</h3>
                        <p className="text-gray-600 mb-4">{p.descripcion}.</p>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-500 text-sm">Precio por boleto:</span>
                                <span className="text-indigo-600 font-bold ml-2">${Number(p.precio_boleto).toFixed(2)}</span>
                            </div>



                            <a href="#raffle-details" onClick={() => handleBuy(p)}
                                className="text-indigo-600 font-medium hover:text-indigo-800 transition"
                            >
                                Participar <i className="fas fa-arrow-right ml-1"></i>
                            </a>
                        </div>
                    </div>
                </div>





            ))}

            {showPersonalForm && (
                <ProfileModal
                    open={showPersonalForm}
                    token={token}
                    setestadoRegistro={setestadoRegistro}
                    onClose={() => setShowPersonalForm(false)}
                    onComplete={() => {
                        setShowPersonalForm(false);
                        // recargar datos, mostrar mensaje, etc.
                    }}
                />
            )}



            {estadoRegistro && (
                <DataConfirmationModal
                    open={estadoRegistro}
                    mensaje={'Registro Completado'}
                    onClose={() => setestadoRegistro(false)}
                />
            )}



            {

                rifaParaComprar && (

                    <RifaModal
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        setModalOpen={setModalOpen}
                        raffle={rifaParaComprar} // o deja el default

                    />

                    // <div style={{ marginTop: 24, border: '1px solid #2196f3', borderRadius: 8, padding: 16 }}>
                    //     <h2>Comprar boletos para: {rifaParaComprar.titulo}</h2>
                    //     <ComprarRifa rifaId={rifaParaComprar.id} />
                    //     <button onClick={handleCancelarCompra} style={{ marginTop: 12 }}>Cancelar</button>

                    // </div>

                )}

        </div >
    );
}

export default ProductList;