import React, { useEffect, useRef } from 'react';

const WinnerAnimation = ({ Ticketganador, onAnimationEnd, onConfetti }) => {

    const winnerNumberElRef = useRef(null);

    useEffect(() => {
        if (!Ticketganador) return;

        const revealTimeout = setTimeout(() => {

            if (winnerNumberElRef.current) {
                winnerNumberElRef.current.classList.add('reveal');
            }
            onConfetti();
        }, 700);

        const endTimeout = setTimeout(onAnimationEnd, 9000);

        return () => {
            clearTimeout(revealTimeout);
            clearTimeout(endTimeout);
        };
    }, [Ticketganador, onAnimationEnd, onConfetti]);


    if (!Ticketganador) return null;

    return (
        <div className="winner-animation-overlay">
            <div className="winner-animation-content">
                <h2 className="congrats-title">¡Tenemos un ganador!</h2>
                <div className="slot-machine">
                    <div className="slot-reel">
                        {Array.from({ length: 20 }, () => Math.floor(Math.random() * 50) + 1).map((n, i) => <span key={i}>{n}</span>)}
                        <span className="winner-number-final" ref={winnerNumberElRef}>{Ticketganador.numero_ganador}</span>
                    </div>
                </div>
                <div className="winner-details-reveal">
                    <h3>El número ganador es <strong className="winner-number-text">{Ticketganador.numero_ganador}</strong></h3>
                    <p className="winner-name-text">¡Felicidades, <strong>{Ticketganador.usuario_nombre}</strong>!</p>
                </div>
            </div>
        </div>
    );
}

export default WinnerAnimation;