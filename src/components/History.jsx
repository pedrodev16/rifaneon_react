import React from 'react';

const History = ({ winners }) => (
    <div className="history-container">
        <h2>Historial de Ganadores</h2>
        <div className="winner-list">
            {winners.map((winner, index) => (
                <div
                    className="winner-card flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md"
                    key={`${winner.date}-${winner.number}-${index}`}
                >
                    {/* Imagen del ganador */}
                    <img
                        src="/win.png" // Asegúrate que cada winner tenga un campo image
                        alt="Ganador"
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />

                    <div className="winner-info flex-1">
                        <div className="flex justify-between items-center">
                            <span className="winner-name text-white font-semibold">{winner.name}</span>
                            <span className="winner-date text-gray-400 text-sm">{winner.date}</span>
                        </div>
                        <div className="winner-details flex justify-between mt-1">
                            <span className="winner-number text-blue-400 font-medium">N° {winner.number}</span>
                            <span className="winner-prize text-green-400 font-medium">
                                Premio: ${winner.prize.toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default History;
