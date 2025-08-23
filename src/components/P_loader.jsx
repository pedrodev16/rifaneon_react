import React from 'react';

export const P_loader = ({ text }) => {
    return (
        <>

            <div className="loader-overlay">
                <div className="spinner" />
                <p className='loader-text'>{text}</p>
            </div>


        </>
    );
}

