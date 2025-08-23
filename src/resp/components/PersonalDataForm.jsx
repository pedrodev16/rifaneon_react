import React, { useState } from 'react';
import axios from 'axios';

function PersonalDataForm({ token, onComplete }) {
    const [nombre, setnombre] = useState('');
    const [apellido, setapellido] = useState('');
    const [telefono, settelefono] = useState('');
    const [numero_id, setnumero_id] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://rifaneon.alwaysdata.net/api/user/personal-data', {
                nombre, apellido, telefono, numero_id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onComplete();
        } catch (err) {
            setError('Completa todos los campos correctamente');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Completa tus datos personales</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input placeholder="nombre" value={nombre} onChange={e => setnombre(e.target.value)} required />
            <input placeholder="apellido" value={apellido} onChange={e => setapellido(e.target.value)} required />
            <input placeholder="Teléfono" value={telefono} onChange={e => settelefono(e.target.value)} required />
            <input placeholder="Cedula" value={numero_id} onChange={e => setnumero_id(e.target.value)} required />
            <button type="submit">Guardar</button>
        </form>
    );
}

export default PersonalDataForm;