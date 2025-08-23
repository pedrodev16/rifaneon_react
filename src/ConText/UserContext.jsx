import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { data } from "react-router-dom";
import { toast } from 'react-hot-toast';
const UserContext = createContext();

export function UserProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [estadoAuth, setEstadoAuth] = useState(!!localStorage.getItem("token")); // inicializa según el token guardado
    const [raffle, setRaffle] = useState([]);
    const [modalOpen, setModalOpen] = useState(null);
    const [profileComplete, setProfileComplete] = useState(null);

    //_____________estados mejorados__________-
    const [idRifaseleccionada, setidRifaseleccionada] = useState();

    //___________________________________-
    // Login con token (por ejemplo, después de Google)
    const login = async (receivedToken) => {

        setToken(receivedToken);
        localStorage.setItem("token", receivedToken);
        setEstadoAuth(true); // usuario autenticado
        await fetchUser(receivedToken);

    };






    // Logout global
    const logout = async () => {
        if (token) {
            try {
                await axios.post(
                    "https://rifaneon.alwaysdata.net/api/logout",
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (e) { }
        }
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setEstadoAuth(false); // usuario NO autenticado
    };

    // Carga de usuario autenticado (opcional)
    const fetchUser = async () => {
        const tk = token;
        if (!tk) return { datos: null, datosCompletos: false };

        setLoadingUser(true);
        try {
            const res = await axios.get("https://rifaneon.alwaysdata.net/api/user", {
                headers: { Authorization: `Bearer ${tk}` },
            });

            const usuario = {
                nombre: res.data.nombre || "",

                apellido: res.data.apellido || "",
                numero_id: res.data.numero_id || "",
                telefono: res.data.telefono || "",
                bank: res.data.bank || "",
                account_type: res.data.account_type || "ahorro",
                account_number: res.data.account_number || "",

            };
            const otrosDatos = {
                id_user: res.data.id || "",
                imagen_perfil: res.data.imagen_perfil || "/user-avatar.png",
            }
            //unir los datos
            const datosunidos = { ...usuario, ...otrosDatos };

            // Guardar en el estado
            setUser(datosunidos);

            // Verificar si todos los campos están completos
            const datosCompletos = Object.values(usuario).every(v => v && v.trim() !== "");


            setProfileComplete(datosCompletos);
            setEstadoAuth(true); // Usuario autenticado



            return { datos: usuario, datosCompletos };

        } catch (err) {
            setUser(null);
            setEstadoAuth(false);
            return { datos: null, datosCompletos: false };
        } finally {
            setLoadingUser(false);
        }
    };


    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    // Token inválido o vencido, hacer logout
                    logout();
                }
                return Promise.reject(error);
            }
        );
        // Limpia el interceptor cuando el componente se desmonte
        return () => axios.interceptors.response.eject(interceptor);
        // eslint-disable-next-line
    }, []);












    const handleRecharge = async (event) => {
        event.preventDefault();

        const amount = event.target.amount.value;
        const method = event.target.payment_method.value;
        const reference = event.target.reference.value;


        if (!amount || !method || !reference) {

            toast.error("Todos los campos son obligatorios.")
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://rifaneon.alwaysdata.net/api/user/recharge',
                {
                    amount,
                    method,
                    reference
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                }
            );
            toast.success(response.data.message || "soliscitud de recarga enviada correctamente.");

        } catch (error) {
            console.error("Error en recarga:", error.response?.data || error.message);
        } finally {
            setModalOpen(null);
            setModalOpen('inform');
        }
    };



    return (
        <UserContext.Provider value={{
            token,
            user,
            profileComplete,
            setUser,
            logout,
            login,
            handleRecharge,
            fetchUser,
            idRifaseleccionada, setidRifaseleccionada,
            raffle, setRaffle,
            loadingUser,
            modalOpen, setModalOpen,
            isAuthenticated: !!token,
            estadoAuth // <- Aquí lo expones en el contexto
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}