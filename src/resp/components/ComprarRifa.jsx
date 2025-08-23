import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../ConText/UserContext';
import MetodoPago from './layouts/MetodoPago'
import PurchaseConfirmationModal from './layouts/PurchaseConfirmationModal';

function ComprarRifa({ rifaId, setModalOpen }) {
    const { token } = useUser();
    const [cantidad, setCantidad] = useState(1);
    const [boletos, setBoletos] = useState([]);
    const [loadingBoletos, setLoadingBoletos] = useState(false);
    const [errorBoletos, setErrorBoletos] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [referenciaPago, setReferenciaPago] = useState('');
    const [comprando, setComprando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [errorCompra, setErrorCompra] = useState('');
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const precioBoleto = 10.00; // Precio fijo del boleto, puedes cambiarlo según tu lógica

    // Generar boletos aleatorios desde el backend
    const handleSelectCantidad = async (e) => {
        const val = parseInt(e.target.value, 10);
        setCantidad(val);
        setBoletos([]);
        setMensaje('');
        setErrorCompra('');
        setMetodoPago('');
        setReferenciaPago('');
        setErrorBoletos('');
        if (!val) return;
        setLoadingBoletos(true);

        try {
            const res = await axios.post(
                'https://rifaneon.alwaysdata.net/api/boletos/generar',
                { cantidad: val, rifa_id: rifaId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.boletos && Array.isArray(res.data.boletos)) {
                setBoletos(res.data.boletos);
            } else if (res.data.error) {
                setErrorBoletos(res.data.error);
            } else {
                setErrorBoletos('No se pudieron generar los boletos. Intenta con otra cantidad.');
            }
        } catch (err) {
            if (err.response?.data?.error) {
                setErrorBoletos(err.response.data.error);
            } else {
                setErrorBoletos('No se pudieron generar los boletos. Intenta con otra cantidad.');
            }
        }
        setLoadingBoletos(false);
    };

    const handleFinalizarCompra = async () => {
        setComprando(true);
        setMensaje('');
        setErrorCompra('');
        try {
            const res = await axios.post(
                'https://rifaneon.alwaysdata.net/api/tickets/comprar',
                {
                    rifa_id: rifaId,
                    numeros_comprados: boletos,
                    metodo_pago: metodoPago,
                    referencia_pago: referenciaPago,
                    total_pagado: Number(precioBoleto) * boletos.length
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMensaje('¡Compra registrada! Pendiente de aprobación.');
            setConfirmationOpen(true)




            //setBoletos([]);
            setMetodoPago('');
            setReferenciaPago('');

        } catch (err) {
            if (err.response?.data?.error) {
                setErrorCompra(err.response.data.error);
            } else {
                setErrorCompra('Error al registrar la compra.');
            }
        }
        setComprando(false);
    };

    return (
        <div>



            {/* Ticket quantity */}
            <div className="mb-4">
                <label
                    htmlFor="ticketQuantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Cantidad de boletos
                </label>

                <select className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500' value={cantidad} onChange={handleSelectCantidad} disabled={loadingBoletos || comprando}>
                    <option value={1}>1 BOLETO</option>
                    <option value={3}>3 BOLETOS</option>
                    <option value={5}>5 BOLETOS</option>
                    <option value={10}>10 BOLETOS</option>
                </select>
            </div>
            {loadingBoletos && <div>Cargando boletos...</div>}
            {errorBoletos && <div style={{ color: 'red' }}>{errorBoletos}</div>}
            {boletos.length > 0 && (
                <div id="ticketNumbers" className="mb-6">

                    <h4>Boletos generados:</h4>
                    <div id="ticketNumbers" className="mb-6">
                        <ul>
                            {boletos.map((b, i) => (
                                <span
                                    className="ticket-number px-3 py-1 rounded-full bg-gray-100"
                                    key={i}>{b}</span>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="mt-4">


                            <MetodoPago monto={15.00} setMetodoPago={setMetodoPago} metodoPago={metodoPago} />
                        </div>


                    </div>
                    <div style={{ marginTop: 8 }}>
                        <label
                            htmlFor="paymentReference"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >Referencia de pago:&nbsp;</label>
                        <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Número de referencia, hash de transacción, etc"
                            value={referenciaPago}
                            onChange={e => setReferenciaPago(e.target.value)}
                            disabled={comprando}
                        />
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <b>Total a pagar:</b> ${(Number(precioBoleto) * boletos.length).toFixed(2)}
                    </div>
                    <button
                        style={{ marginTop: 16, padding: '8px 16px' }}
                        onClick={handleFinalizarCompra}
                        disabled={
                            comprando ||
                            !metodoPago ||
                            !referenciaPago ||
                            boletos.length === 0
                        }
                    >
                        {comprando ? 'Procesando...' : 'Finalizar compra'}
                    </button>
                    {errorCompra && <div style={{ color: 'red', marginTop: 8 }}>{errorCompra}</div>}
                </div>
            )
            }
            {/* MENSAJE DE COMPRA EXITOSA DEBE IR FUERA DEL BLOQUE DE BOLETOS */}
            {mensaje && <div style={{ color: 'green', marginTop: 16 }}>{mensaje}</div>}

            <PurchaseConfirmationModal
                open={confirmationOpen}
                mensaje={mensaje}
                onClose={() => setConfirmationOpen(false)}
                tickets={boletos}
                setModalOpen={setModalOpen}

            />

        </div >
    );
}

export default ComprarRifa;