import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
const ProfileForm = ({ user, token }) => {
    const profile = user || {};
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const formData = new FormData(e.target);

        toast.promise(
            axios.post(
                'https://rifaneon.alwaysdata.net/api/user/personal-data',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }

            ),
            {
                loading: 'Guardando...',
                success: (res) => {
                    if (res.data.errors) {
                        setErrors(res.data.errors);
                        return 'Guardado con errores';
                    }
                    setLoading(false);
                    return <b>{res.data.message || 'Guardado correctamente'}</b>;

                },
                error: (err) => {
                    setLoading(false);
                    if (err.response && err.response.data && err.response.data.message) {
                        return err.response.data.message;
                    }
                    return <b>Error de conexión</b>;
                },
            }
        );
    };

    const renderError = (field) => (
        errors[field] ? <small style={{ color: 'red', display: 'block' }}>{errors[field][0]}</small> : null
    );

    const inputClass = (field) => `form-control ${errors[field] ? 'border-red-500' : ''}`;

    return (
        <div className="profile-container">
            <h2>Actualiza tu Perfil</h2>
            <p>Estos datos son necesarios para procesar tus pagos en caso de que ganes.</p>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="nombre"
                            defaultValue={profile.nombre || ''} className={inputClass('nombre')} />
                        {renderError('nombre')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Apellido</label>
                        <input type="text" id="lastname" name="apellido"
                            defaultValue={profile.apellido || ''} className={inputClass('apellido')} />
                        {renderError('apellido')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="id">Cédula de Identidad</label>
                        <input type="text" id="id" name="numero_id"
                            defaultValue={profile.numero_id || ''} className={inputClass('numero_id')} />
                        {renderError('numero_id')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono</label>
                        <input type="tel" id="phone" name="telefono"
                            defaultValue={profile.telefono || ''} className={inputClass('telefono')} />
                        {renderError('telefono')}
                    </div>
                </div>

                <h3>Datos de Pago</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="bank">Banco</label>
                        <input type="text" id="bank" name="bank"
                            defaultValue={profile.bank || ''} className={inputClass('bank')} />
                        {renderError('bank')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountType">Tipo de Cuenta</label>
                        <select id="accountType" name="account_type"
                            defaultValue={profile.account_type || 'ahorro'} className={inputClass('account_type')}>
                            <option value="ahorro">Ahorro</option>
                            <option value="corriente">Corriente</option>
                        </select>
                        {renderError('account_type')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Número de Cuenta</label>
                        <input type="text" id="accountNumber" autoComplete="account_number" name="account_number"
                            defaultValue={profile.account_number || ''} className={inputClass('account_number')} />
                        {renderError('account_number')}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="clave">Clave de edición</label>
                    <input type="password" id="clave" name="clave"
                        placeholder="Si no tienes, ingresa una nueva"
                        className={inputClass('clave')}
                        autoComplete="new-password"
                    />
                    {renderError('clave')}
                    <small style={{ display: 'block', marginTop: '5px', color: 'rgb(255 218 27)' }}>
                        🔑 La clave de edición es una contraseña que solo tú conoces para
                        poder modificar tus datos personales y de pago.
                        Si la olvidas, comunícate con el grupo de WhatsApp de administración
                        para restablecerla.
                    </small>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar y Jugar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
