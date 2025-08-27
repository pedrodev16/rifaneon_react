import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { toast, Toaster } from 'react-hot-toast';
import { ShieldAlert } from 'lucide-react';
const ProfileForm = ({ user, token, onfetchUser }) => {
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
                    setLoading(false);


                    onfetchUser()

                    return <b>{res.data.message || 'Datos guardados correctamente'}</b>;

                },
                error: (err) => {
                    setLoading(false);
                    if (err.response) {
                        if (err.response.status === 422) {
                            // Errores de validación
                            setErrors(err.response.data.errors || {});
                            return 'Revisa los campos resaltados';
                        }
                        return err.response.data.message || 'Ocurrió un error';
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

            <InfoItem
                icon={<ShieldAlert className="text-blue-400 w-6 h-6 drop-shadow-[0_0_7px_#0ff]" />}
                text="Completa tu perfil. El sistema solo permite comprar números si tienes tus datos actualizados. Estos datos serán usados en caso de que ganes para transferirte tu premio."
            />
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
                        <label htmlFor="accountType">Tipo de Cuenta {"(Obcional)"}</label>
                        <select id="accountType" name="account_type"
                            defaultValue={profile.account_type || 'ahorro'} className={inputClass('account_type')}>
                            <option value="ahorro">Ahorro</option>
                            <option value="corriente">Corriente</option>
                        </select>
                        {renderError('account_type')}
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Número de Cuenta {"(Opcional)"}</label>
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
const InfoItem = ({ icon, text }) => (
    <div className=" p-4 rounded-lg shadow-md flex items-start gap-3" style={{ background: 'rgb(0 106 255 / 46%)' }}>
        {icon}
        <p>{text}</p>
    </div>
);
export default ProfileForm;
