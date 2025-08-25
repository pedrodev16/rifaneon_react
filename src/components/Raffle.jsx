import React, { useState, useEffect } from 'react';
import { P_loader } from './P_loader';
import { a } from 'framer-motion/client';
import '../styles/mensajes.css';
import { Trophy } from 'lucide-react';

const Raffle = ({ selectedRaffleId, setSelectedRaffleId, tipo, setTipo, raffle, selectedRaffle, onSelectRaffle, handlers }) => {

    function formatoMoneda(valor, moneda = "VES", locale = "es-VE") {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: moneda,
            minimumFractionDigits: 2,
        }).format(valor);
    }

    useEffect(() => {

        if (selectedRaffleId && raffle.length > 0) {
            const found = raffle.find(r => r.id === selectedRaffleId);
            if (found) {

                onSelectRaffle(found);
                //setTipo(found.size);
                //  handlers.onRaffleSizeChange(found.size);
            }
        }

    }, [selectedRaffleId, raffle, tipo, setTipo]);



    // Inicializar con el primer tipo disponible

    useEffect(() => {
        if (!tipo && !selectedRaffleId) {

            if (raffle.length > 0 && !selectedRaffleId) {
                setSelectedRaffleId(raffle[0].id);
                setTipo(raffle[0].size);
                handlers.onRaffleSizeChange(raffle[0].size);
            }
        }
    }, [raffle, tipo, setTipo]);



    if (!selectedRaffle) return (<div className="flex justify-center mt-[10%]">
        <div className="w-[89%] animated-gradient rounded-xl p-8 text-center shadow-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white animate-bounce">
                No hay tablas disponibles para jugar
            </h1>
        </div>
    </div>


    );

    const numbers = Array.from({ length: selectedRaffle.size }, (_, i) => i + 1);
    const progress = (selectedRaffle.soldTickets.length / selectedRaffle.size) * 100;

    return (

        <div className="raffle-container ">

            <div
                className="raffle-header py-6 animate-fade-in "
                style={{
                    backgroundImage: "url('img/raffle.png')",
                    backgroundAttachment: "fixed",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                }}
            >
                <h2 className="text-3xl font-bold text-white drop-shadow-md">
                    🎉 Sorteo en Curso: <span className="text-yellow-400">{selectedRaffle.size}</span> Números
                </h2>
                <p className="text-lg text-gray-200 mt-2">{selectedRaffle.titulo}</p>
                <p className="text-md text-gray-300 italic mt-1">
                    ✨ ¡Elige tu número de la suerte y participa ahora!
                </p>
                <p
                    style={{ background: "#17082e" }}
                    className="flex items-center justify-center gap-2 text-xl text-yellow-300 font-semibold mt-4 px-4 py-2 rounded-lg shadow-md animate-pulse whitespace-nowrap text-center"
                >
                    <Trophy color="#00ffe1" className="w-6 h-6 flex-shrink-0" />
                    <span>Premio del ganador:</span>
                    <span className="text-white">{formatoMoneda(selectedRaffle.premio)}</span>
                </p>



            </div>
            <div className="raffle-controls">
                <div className="ticket-price">
                    Precio: <span>{formatoMoneda(selectedRaffle.ticketPrice)}</span>
                </div>
                <div className="raffle-size-selector">
                    <span>Tamaño:</span>

                    {

                        raffle.map(r => (
                            <button
                                key={r.id}
                                className={`btn ${r.size === tipo ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedRaffleId(r.id); // ← ¡Ahora sí dinámico!
                                    setTipo(r.size);

                                    handlers.onRaffleSizeChange(r.size);
                                }}
                            >
                                {r.size}
                            </button>
                        ))
                    }

                </div>
            </div>

            <div className="progress-bar">
                <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
                <div className="progress-label">
                    {selectedRaffle.soldTickets.length} / {selectedRaffle.size} vendidos
                </div>
            </div>

            <div className="number-grid">
                {numbers.map(num => {
                    const isSold = selectedRaffle.soldTickets.some(ticket => ticket.number === num);
                    return (
                        <button
                            key={num}
                            className={`number-btn ${isSold ? 'sold' : ''}`}
                            disabled={isSold}
                            onClick={() => handlers.onNumberClick(num, tipo)}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>
        </div>

    );
};

export default Raffle;