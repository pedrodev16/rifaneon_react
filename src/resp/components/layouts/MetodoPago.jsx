import React, { useState } from "react";

export default function MetodoPago({ monto, setMetodoPago, metodoPago }) {
    //const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentReference, setPaymentReference] = useState("");

    return (
        <div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Método de pago: {metodoPago}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                        className={`payment-method p-4 rounded-lg cursor-pointer ${metodoPago === "pagoMovil" ? "ring-2 ring-blue-500" : ""
                            }`}
                        onClick={() => setMetodoPago("pago_movil")}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-mobile-alt text-blue-600"></i>
                            </div>
                            <span className="font-medium">Pago Móvil</span>
                        </div>
                    </div>

                    <div
                        className={`payment-method p-4 rounded-lg cursor-pointer ${metodoPago === "cripto" ? "ring-2 ring-purple-500" : ""
                            }`}
                        onClick={() => setMetodoPago("cripto")}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                                <i className="fab fa-bitcoin text-purple-600"></i>
                            </div>
                            <span className="font-medium">Criptomoneda</span>
                        </div>
                    </div>

                    <div
                        className={`payment-method p-4 rounded-lg cursor-pointer ${metodoPago === "zinli" ? "ring-2 ring-green-500" : ""
                            }`}
                        onClick={() => setMetodoPago("zinli")}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <i className="fas fa-wallet text-green-600"></i>
                            </div>
                            <span className="font-medium">Zinli</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detalles del método de pago */}
            {metodoPago && (
                <div id="paymentDetails" className="mb-6">
                    <h4 className="text-md font-bold text-gray-800 mb-3">
                        Detalles del pago
                    </h4>
                    {metodoPago === "pago_movil" && (
                        <div className="bg-blue-50 p-4 rounded-lg mb-3">
                            <div className="mb-3">
                                <p className="text-sm text-gray-600 mb-1">
                                    Realiza tu transferencia a:
                                </p>
                                <p className="font-bold text-blue-700">0412-1234567</p>
                                <p className="text-sm text-gray-600">
                                    Banco: Banco de Venezuela
                                </p>
                                <p className="text-sm text-gray-600">C.I.: V-12345678</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Monto total:</p>
                                <p className="font-bold text-blue-700">
                                    ${monto ? monto.toFixed(2) : "15.00"}
                                </p>
                            </div>
                        </div>
                    )}
                    {metodoPago === "cripto" && (
                        <div className="bg-purple-50 p-4 rounded-lg mb-3">
                            <div className="mb-3">
                                <p className="text-sm text-gray-600 mb-1">
                                    Envía USDT (TRC20) a:
                                </p>
                                <p className="font-mono text-purple-700 break-all">
                                    TXYZ1234567890abcdefghijklmnopqrstuvw
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Monto total:</p>
                                <p className="font-bold text-purple-700">
                                    {monto ? monto.toFixed(2) : "15.00"} USDT
                                </p>
                            </div>
                        </div>
                    )}
                    {metodoPago === "zinli" && (
                        <div className="bg-green-50 p-4 rounded-lg mb-3">
                            <div className="mb-3">
                                <p className="text-sm text-gray-600 mb-1">
                                    Envía el dinero a:
                                </p>
                                <p className="font-bold text-green-700">
                                    rifafacil@example.com
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Monto total:</p>
                                <p className="font-bold text-green-700">
                                    ${monto ? monto.toFixed(2) : "15.00"}
                                </p>
                            </div>
                        </div>
                    )}





                </div>
            )}
        </div>
    );
}