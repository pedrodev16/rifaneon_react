
import { motion, AnimatePresence } from 'framer-motion';

export const ConfirmModal = ({ isOpen, selectedNumber, ticketPrice, balance, onClose, onConfirm }) => {



    function formatoMoneda(valor, moneda = "VES", locale = "es-VE") {
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: moneda,
            minimumFractionDigits: 2,
        }).format(valor);
    }

    if (!isOpen) return null;
    const newBalance = balance - ticketPrice;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Confirmar Compra</h2>
                <p>¿Seguro que deseas comprar el número <strong>{selectedNumber}</strong> por <strong>{formatoMoneda(ticketPrice)}</strong>?</p>
                <div className="balance-info">
                    <p>Saldo actual: <strong>{formatoMoneda(balance)}</strong></p>
                    <p>Saldo después de la compra: <strong>{formatoMoneda(newBalance)}</strong></p>
                </div>
                <div className="modal-actions">
                    <button className="btn btn-danger" onClick={onClose}>Cancelar</button>
                    <button className="btn btn-success" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export const RechargeModal = ({ isOpen, onClose, onRecharge }) => {

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>Recargar Saldo</h2>
                <form onSubmit={onRecharge}>
                    <div className="form-group">
                        <label htmlFor="amount">Monto a recargar (Bs)</label>
                        <input type="number" id="amount" name="amount" step="0.01" min="1" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment-method">Método de pago</label>
                        <select id="payment-method" name="payment_method">
                            <option>Selecciona un método</option>
                            <option>Pago Móvil</option>
                            <option>Transferencia</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reference">Número de referencia</label>
                        <input type="text" id="reference" name="reference" required />
                    </div>
                    <p style={{ fontSize: '0.8rem', textAlign: 'center', opacity: 0.8 }}>Tu recarga será procesada en unos minutos.</p>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-danger" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Aplicar Recarga</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// RechargePendingModal.jsx



export const RechargePendingModal = ({ isOpen, onClose }) => {

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: -50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
        exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(3, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                >
                    <motion.div
                        className="modal-content"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            background: 'rgba(0, 0, 0, 0.2)',
                            padding: '2rem',
                            borderRadius: '12px',
                            maxWidth: '400px',
                            width: '90%',
                            textAlign: 'center',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        }}
                    >
                        <h2 className="modal-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                            Recarga enviada
                        </h2>
                        <p className="modal-message" style={{ marginBottom: '1.5rem' }}>
                            Tu recarga ha sido enviada correctamente y está en espera de aprobación.
                            Por favor, espera unos minutos mientras se procesa.
                        </p>
                        <button
                            className="modal-button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                padding: '0.6rem 1.2rem',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                            }}
                        >
                            Aceptar
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};





