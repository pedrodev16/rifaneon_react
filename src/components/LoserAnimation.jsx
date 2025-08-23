import React, { useEffect, useRef } from 'react';

const WinnerAnimation = ({ winningTicket, onAnimationEnd, onConfetti }) => {

    const winnerNumberElRef = useRef(null);

    useEffect(() => {
        if (!winningTicket) return;

        const revealTimeout = setTimeout(() => {

            if (winnerNumberElRef.current) {
                winnerNumberElRef.current.classList.add('reveal');
            }
            onConfetti();
        }, 700);

        const endTimeout = setTimeout(onAnimationEnd, 8000);

        return () => {
            clearTimeout(revealTimeout);
            clearTimeout(endTimeout);
        };
    }, [winningTicket, onAnimationEnd, onConfetti]);


    if (!winningTicket) return null;
    return (
        <div className="winner-animation-overlay">
            <div className="winner-animation-content">
                <h2 className="congrats-title">¡Tenemos un ganador!</h2>
                <div className="slot-machine">
                    <div className="slot-reel">
                        {Array.from({ length: 20 }, () => Math.floor(Math.random() * 50) + 1).map((n, i) => <span key={i}>{n}</span>)}
                        <span className="winner-number-final" ref={winnerNumberElRef}>{winningTicket.ganador}</span>
                    </div>
                </div>
                <h2 className="sorry-title">¡Gracias por participar!</h2>
                <p className="sorry-text">Esta vez no fue tu día, pero sigue intentando.</p>

                <div className="winner-details-reveal">
                    <h3>El número ganador es <strong className="winner-number-text">{winningTicket.ganador}</strong></h3>
                    {/* <p className="winner-name-text">{
                        losers.map((ticket, index) => (
                            <span key={index} className="loser-number">{ticket.number}</span>
                        ))
                    }</p> */}
                </div>
            </div>
        </div>
    );
}

export default WinnerAnimation;









