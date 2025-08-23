const API_URL = '/db.json';
let cache = null;

import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://rifaneon.alwaysdata.net/api/',
});

export const setAuthToken = token => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchProfile = async (payload, token) => {
    const res = await axios.post(
        'https://rifaneon.alwaysdata.net/api/user/personal-data',
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        }
    );
    return res.data;
};

export const fetchChatMessages = async (token) => {
    const { data } = await axios.get('https://rifaneon.alwaysdata.net/api/chat/messages', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};

export const sendChatMessage = async (token, message) => {
    const { data } = await axios.post('https://rifaneon.alwaysdata.net/api/chat/messages', { message }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return data;
};


export const ComprarTicket = async (rifaId, number, token, raffle) => {
    const baseURL = 'https://rifaneon.alwaysdata.net/api';

    try {

        // Comprar el boleto
        const data = await axios.post(
            `${baseURL}/raffle/${rifaId}/buy`,
            { number },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data.data;

    } catch (error) {
        console.log('error al comprar ticket: ' + error)
        throw error;
    }
};


export const getGanador = async (selectedRaffle, token) => {
    //     const baseURL = 'https://rifaneon.alwaysdata.net/api';
    //     try {
    //         const response = await axios.post(
    //             `${baseURL}/rifas/${selectedRaffle.id}/terminar`,
    //             {}, // cuerpo vacío
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         );
    //         console.log('respuesta', response.data)
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error al obtener el ganador:', error?.response?.data || error.message);
    //         throw error;
    //     }
};







// Carga inicial
export const getInitialData = async () => {
    const [raffleRes, winnersRes] = await Promise.all([
        api.get('/rifas/activas'),
        api.get('/raffle/winners'),
    ]);

    const raffles = Object.entries(raffleRes.data).map(([key, raffle]) => ({
        id: raffle.id,
        size: raffle.max_numeros,
        ticketPrice: parseFloat(raffle.precio_boleto),
        soldTickets: raffle.sold_numbers.map(number => ({ number })),
        titulo: raffle.titulo,
        descripcion: raffle.descripcion,
        image: raffle.foto_url
    }));

    return {
        raffle: raffles, // ← ahora es un array de rifas procesadas
        winners: winnersRes.data,
        chat: { messages: [] },
    };

};

export const getRifasActivas = async () => {

    const baseURL = 'https://rifaneon.alwaysdata.net/api';

    try {
        const response = await axios.get(`${baseURL}/rifas/activas`);


        const raffles = Object.entries(response.data).map(([key, raffle]) => ({
            id: raffle.id,
            size: raffle.max_numeros,
            ticketPrice: parseFloat(raffle.precio_boleto),
            soldTickets: raffle.sold_numbers.map(number => ({ number })),
            titulo: raffle.titulo,
            descripcion: raffle.descripcion,
            image: raffle.foto_url
        }));
        return raffles;
    } catch (error) {
        console.log('Error al obtener rifas activas:', error);
        return null;
    }
};


export const getSaldo = async (token) => {

    const baseURL = 'http://rifaneon.alwaysdata.net/api';

    try {
        const response = await axios.get(`${baseURL}/user/mi-saldo`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const saldo = response.data.balance;

        return saldo;
    } catch (error) {
        console.error('Error al obtener el saldo del usuario:', error);
        return null;
    }
};


// // Comprar boleto
// export const buyTicket = (raffleId, number) =>
//     api.post(`/raffle/${raffleId}/tickets`, { number });
