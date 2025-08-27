import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'
import {
    getInitialData,
    getSaldo,
    getRifasActivas,
    ComprarTicket,
    Historia,
    fetchProfile,
    fetchChatMessages,
    sendChatMessage
} from './api.js';

import { audioManager } from './audio.js';
import { launchConfetti } from './utils/confetti.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Raffle from './components/Raffle.jsx';
import ProfileForm from './components/ProfileForm.jsx';
import History from './components/History.jsx';
import WinnerAnimation from './components/WinnerAnimation.jsx';
import Chat from './components/Chat.jsx';
import { ConfirmModal, RechargeModal, RechargePendingModal } from './components/modals.jsx';
import { useUser } from './ConText/UserContext.jsx';
import { P_loader } from './components/P_loader.jsx';
import LoserAnimation from './components/LoserAnimation.jsx';


import { io } from 'socket.io-client';
import { p } from 'framer-motion/client';
import InfoPanel from './components/InfoPanel.jsx';
import TutorialWrapper from './components/TutorialWrapper.jsx';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [textLoading, setIstextLoading] = useState();
    const [currentView, setCurrentView] = useState('login');
    const [winners, setWinners] = useState([]);
    //_________________________chat___________________________________________
    const [chat, setChat] = useState({ open: false, messages: [] });
    const [userchat, setUserchat] = useState({ profile: { name: "Tú" } });
    //_________________________________________________________________
    const [numeroSeleccionado, setnumeroSeleccionado] = useState(null);
    const [RifaSeleccionada, setRifaSeleccionada] = useState(null);
    //para el componente de raffle
    const [tipo, setTipo] = useState(null);
    const [selectedRaffleId, setSelectedRaffleId] = useState(null);
    const [operacion, setOperacion] = useState([]);
    const [saldo, setSaldo] = useState();
    //________________________________________________________________
    //const [selectedNumber, setSelectedNumber] = useState(null);
    const [Ticketganador, setTicketganador] = useState(null);
    const [losersList, setLosersList] = useState([]);
    //const [selectedRaffle, setSelectedRaffle] = useState(null);
    const { login,
        user,
        setUser,
        profileComplete,
        loadingUser,
        fetchUser,
        logout,
        idRifaseleccionada,
        setidRifaseleccionada,
        estadoAuth,
        modalOpen,
        setModalOpen,
        token,
        handleRecharge,
        raffle, setRaffle } = useUser();

    const [showTutorial, setShowTutorial] = useState(false);



    // socket.io manejado con ref
    const socketRef = useRef(null);


    // // Escuchar eventos
    // socket.on("connection", () => {
    //     console.log("Conectado al socket como:", socket.id);
    // });
    // //____________________________________________________________________

    // ====================== FUNCIONES API ====================== //
    const saldo_usuario = useCallback(async () => {
        try {
            const saldo = await getSaldo(token);
            setSaldo(saldo);
        } catch (error) {
            console.error('Error al cargar saldo del usuario:', error);
        }
    }, [raffle]);

    const Carga_Historia = useCallback(async () => {
        const data = await Historia(token);
        setWinners(data);

    }, []);

    const logoutapp = () => {
        Swal.fire({
            title: "¿quieres cerrar la cuenta de rifaneon?",

            showCancelButton: true,
            confirmButtonText: "Cerrar",

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Cuenta cerrarda!", "", "success");
                logout()
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const Cargar_Rifas_Activas = useCallback(async () => {
        try {
            const data = await getRifasActivas(token);
            setRaffle(data);
            return data;
        } catch (error) {
            console.error('Error al cargar rifas activas:', error);
            return [];
        }
    }, []);

    // ====================== CARGAR DATOS INICIALES ====================== //
    const loadInitialData = useCallback(async () => {

        const seen = localStorage.getItem("tutorialSeen");
        if (!seen) {
            setShowTutorial(true);
        }
        try {
            const data = await getInitialData();
            setRaffle(data.raffle);
            setWinners(data.winners);

            if (user) {
                if (!token) return;



                await saldo_usuario();
            }
        } catch (error) {
            console.error('Error al cargar datos iniciales:', error);
            setCurrentView('login');
        } finally {
            setIsLoading(false);
        }
    }, [user, profileComplete, saldo_usuario, setRaffle, login]);

    //cargar datos iniciales y sonidos
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
        loadInitialData();
        audioManager.loadSound('win', '/win.mp3');
        fetchUser()
    }, [token]);



    //aqui los useEffect --------------

    useEffect(() => {

        setCurrentView(user ? (profileComplete ? 'raffle' : 'profile') : 'login');
    }, [user, profileComplete]);



    // Cargar mensajes iniciales desde Laravel
    useEffect(() => {

        if (!token) return;

        socketRef.current = io("https://websocket-rifaneon.onrender.com", {
            auth: { token },
            transports: ['websocket'] // opcional, pero útil para evitar problemas con polling
        });
        const socket = socketRef.current;


        // Conectar al socket
        socket.on('connect', () => {
            console.log('Conectado al socket:', socket.id);
        });

        // Cargar mensajes antiguos
        fetchChatMessages(token).then(data => {
            setChat(prev => ({ ...prev, messages: data }));
        }).catch(err => console.error("Error cargando mensajes:", err));

        // Escuchar mensajes nuevos en tiempo real
        socket.on('new-message', (msg) => {
            setChat(prev => ({ ...prev, messages: [...prev.messages, msg] }));
        });


        socket.on('chat:message', (msg) => {
            setChat(prev => ({
                ...prev,
                messages: [...prev.messages, msg]
            }));
        });




        socket.on('numeroComprado', async (data) => {



            let activeToasts = [];

            const showToast = (content) => {
                if (activeToasts.length >= 5) {
                    toast.dismiss(activeToasts[0]); // cierra el más viejo
                    activeToasts.shift();
                }

                const id = toast.custom(content);
                activeToasts.push(id);
            };


            showToast((t) => (
                <div
                    className={`${t.visible ? 'animate-enter' : 'animate-leave'
                        } max-w-md w-full bg-black rounded-lg pointer-events-auto flex shadow-[0_4px_15px_rgba(128,0,128,0.5)]`}
                    style={{ border: '1px solid #00e5ff' }}
                >
                    <div className="flex-1 w-0 p-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 pt-0.5">
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={data.user.imagen_perfil}
                                    alt=""
                                    style={{ border: '1px solid #00e5ff' }}
                                />
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-white">
                                    {data.user.nombre} ha comprado el número {data.numero_comprado}
                                </p>
                                <p className="mt-1 text-sm text-gray-300">
                                    De la rifa {data.raffle.titulo}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex" style={{ borderLeft: '1px solid #00e5ff' }}>
                        <button
                            onClick={() => toast.dismiss(t.id)}
                            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#00e5ff] hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-[#00e5ff]"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ));







            // try {
            //     // Obtener rifas activas
            //     const rifasActivas = await getRifasActivas();

            //     // Actualizar el estado
            //     setRaffle(rifasActivas);

            //     // Buscar y cargar la rifa seleccionada

            //     console.log('tipo actualizado a: ', rifasActivas, tipo);
            //     const updated = rifasActivas.find(r => r.size === tipo);
            //     console.log('tipo actualizado a: ', rifasActivas, tipo, updated);
            //     if (updated) {

            //         setSelectedRaffleId(updated.id);


            //     }


            // } catch (err) {
            //     console.error("Error actualizando rifas activas:", err);
            // }


            // ✅ Optimización: actualizar solo la rifa afectada
            setRaffle((prev) =>
                prev.map((r) =>
                    r.id === data.raffle.id
                        ? {
                            ...r,
                            soldTickets: [
                                ...(r.soldTickets || []),
                                {
                                    number: data.numero_comprado,
                                    user: data.user,
                                },
                            ],
                        }
                        : r
                )
            );

            // ✅ Si justo estabas viendo esa rifa, actualízala también
            if (RifaSeleccionada && RifaSeleccionada.id === data.raffle.id) {
                setRifaSeleccionada((prev) => ({
                    ...prev,
                    soldTickets: [
                        ...(prev.soldTickets || []),
                        {
                            number: data.numero_comprado,
                            user: data.user,
                        },
                    ],
                }));
            }




            if (data.terminado) {

                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-md w-full bg-black rounded-lg pointer-events-auto flex shadow-[0_4px_15px_rgba(128,0,128,0.5)]`}
                        style={{ border: '1px solid #00e5ff' }}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src="/win.png"
                                        alt=""
                                        style={{ border: '1px solid #00e5ff' }}
                                    />
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-white">
                                        El participante {data.ganador.usuario_nombre} es el ganador de la Rifa {data.ganador.titulo}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-300">
                                        con el número {data.ganador.numero_ganador}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex" style={{ borderLeft: '1px solid #00e5ff' }}>
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#00e5ff] hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-[#00e5ff]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ));


                GenerGanador(data.ganador, data.perdedores_tickets);

                // setSaldo(parseFloat(data.user.balance));
                Carga_Historia();

                try {
                    // Obtener rifas activas
                    const rifasActivas = await getRifasActivas();

                    // Actualizar el estado
                    setRaffle(rifasActivas);

                    //     // Buscar y cargar la rifa seleccionada


                    const updated = rifasActivas.find(r => r.size === tipo);

                    if (updated) {

                        setSelectedRaffleId(updated.id);


                    }
                } catch (err) {
                    console.error(err)
                }







            }

            if (user.id_user == data.user.id) {
                setSaldo(parseFloat(data.user.balance));
            }

        });






        return () => {
            socket.disconnect();
        };
    }, [tipo]);









    //__________________________________________-








    const handleGoogleLogin = () => {
        const popup = window.open(
            'http://rifaneon.alwaysdata.net/api/auth/google',
            '_blank',
            'width=500,height=600'
        );
        window.addEventListener('message', function handler(event) {
            if (event.data && event.data.access_token) {

                login(event.data.access_token);

                window.removeEventListener('message', handler);
                window.location.reload();

            }

        });


        //  setCurrentView('profile');

    };

    // const handleProfileUpdate = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData(event.target);
    //     const payload = {
    //         nombre: formData.get('name'),
    //         apellido: formData.get('lastname'),
    //         numero_id: formData.get('id'),
    //         telefono: formData.get('phone'),
    //         bank: formData.get('bank'),
    //         account_type: formData.get('accountType'),
    //         account_number: formData.get('accountNumber'),
    //         clave: formData.get('clave') || "" // incluir clave
    //     };

    //     try {
    //         const userData = await fetchProfile(payload, token);

    //         if (userData.success) {
    //             alert(userData.message || 'Datos guardados correctamente');
    //             //  setUser((prev) => ({ ...prev, ...payload })); // opcional
    //         } else {
    //             alert(userData.message || 'Error al guardar los datos');
    //         }

    //         if (userData.perfil_completo) {
    //             console.log("✅ Perfil completo");
    //         } else {
    //             console.log("⚠️ Perfil incompleto");
    //         }
    //     } catch (error) {
    //         //cacturamos el error 403
    //         if (error.response && error.response.status === 403) {
    //             alert('No tienes permiso para realizar esta acción');
    //         }


    //         console.error('Error al actualizar perfil:', error);
    //         alert('Error al conectar con el servidor');
    //     }
    // };

    const resetRaffle = useCallback(() => {
        handleRaffleSizeChange(tipo);
        setTicketganador(null);
        setCurrentView('raffle');
    }, [tipo]);

    const handleCloseTutorial = () => {
        localStorage.setItem("tutorialSeen", "true");
        setShowTutorial(false);
    };
    const GenerGanador = useCallback(async (data_ganador, perdedores_tickets) => {

        try {
            setTicketganador(data_ganador);
            //si  el ganador no esta en la rifa seleccionada

            if (data_ganador.rifa_size == tipo) {
                setCurrentView('winnerAnimation');
                audioManager.playSound('win');

            }
            return;
        } catch (err) {
            alert("Hubo un error al finalizar la rifa. Intenta de nuevo.");
        }
    }, [RifaSeleccionada, tipo]);
    const handleConfirmPurchase = async () => {

        closeModal();
        if (Number(saldo) >= Number(RifaSeleccionada.ticketPrice)) {
            //activar loadin
            setIsLoading(true)
            //colocar texto a loadin
            setIstextLoading('procesando...')
            try {
                //registar compra
                try {
                    await ComprarTicket(RifaSeleccionada.id, numeroSeleccionado, token, RifaSeleccionada);
                } catch (error) {
                    console.log('error al comprar ticket', error)
                    alert(error.response?.data?.message || 'Error al comprar el boleto.');
                    return;
                }


            } catch (error) {
                console.log('error', error);

            } finally {
                setIsLoading(false)
                setIstextLoading()
            }
        } else {

            toast.error("Saldo insuficiente. Por favor, recargue.");
            setModalOpen('recharge');
        }
    };






    const handleRaffleSizeChange = (size) => {

        Cargar_Rifas_Activas()
        const rifaseleccionada = raffle.find(r => r.size === size);
        if (!rifaseleccionada) return;
        setRifaSeleccionada(rifaseleccionada);
        // setidRifaseleccionada(rifaseleccionada.id)
    };
    const handleNumeroClick = (number, tipoo) => {
        //  setTipo(tipoo)
        //    alert('numero seleccionado: ' + number + ' de la rifa de tamaño: ' + tipo);
        //evalua si hay rifa seleccionada y si tiene tiket comprados
        if (!RifaSeleccionada || !RifaSeleccionada.soldTickets) return;

        //evaluando el numero si esta o no seleccionado
        const Esta_seleccionado = RifaSeleccionada.soldTickets.some(ticket => ticket.number === number);
        //si ya esta seleccionada se sale
        if (Esta_seleccionado) return;
        //actualizar estado con el numero seleccionado
        setnumeroSeleccionado(number);
        //habrir modal se confirmacion de compra del numero

        if (user && profileComplete) {
            setModalOpen('confirm');
        } else {

            Swal.fire({
                title: 'Espera!',
                text: 'Por favor, completa tu perfil antes de comprar un boleto.',
                icon: 'info',
                confirmButtonText: 'Ok'
            })
            setCurrentView(profileComplete ? 'raffle' : 'profile');
        }
    };
    const handleChatMessage = async (event) => {
        event.preventDefault();
        const input = event.target.elements.message;
        if (!input || input.value.trim() === '') return;

        const messageObj = {
            user: user.nombre,
            text: input.value,
            user_id: user.id_user || null,
            token: token // si necesitas auth para Laravel
        };

        try {
            // 1️⃣ Enviar a Laravel para guardar
            await sendChatMessage(token, input.value);

            // 2️⃣ Emitir por WebSocket para que todos lo reciban al instante
            socketRef.current = io("https://websocket-rifaneon.onrender.com", { auth: { token } });
            const socket = socketRef.current;
            socket.emit('chat:message', messageObj);

            // 3️⃣ Mostrarlo en tu pantalla
            // setChat(prev => ({
            //     ...prev,
            //     messages: [...prev.messages, messageObj]
            // }));
        } catch (error) {
            console.error("Error enviando mensaje:", error);
        }

        input.value = '';
    };

    const closeModal = () => {
        setModalOpen(null);
        setnumeroSeleccionado(null);
    };

    const reset_user = () => {
        fetchUser();

    }

    const renderCurrentView = () => {
        switch (currentView) {
            case 'profile':
                return <ProfileForm user={user} token={token} onfetchUser={reset_user} />;
            case 'history':
                return <History winners={winners} />;
            case 'winnerAnimation':
                return (
                    <WinnerAnimation
                        Ticketganador={Ticketganador}
                        onAnimationEnd={resetRaffle}
                        onConfetti={launchConfetti}
                    />
                );
            // case 'loserAnimation':
            //     (
            //         <LoserAnimation
            //             Ticketganador={losersList} // filtra los tickets que no ganaron
            //             onAnimationEnd={resetRaffle}
            //             onConfetti={launchConfetti}
            //         />
            //     )
            case 'raffle':
            default:
                // Verifica que raffle esté cargado y sea un array con contenido



                return (
                    !isLoading ? (
                        <Raffle
                            selectedRaffleId={selectedRaffleId}
                            setSelectedRaffleId={setSelectedRaffleId}
                            tipo={tipo}
                            setTipo={setTipo}
                            raffle={raffle}
                            selectedRaffle={RifaSeleccionada}
                            onSelectRaffle={setRifaSeleccionada}
                            handlers={{
                                onRaffleSizeChange: handleRaffleSizeChange,
                                onNumberClick: handleNumeroClick,
                            }}
                        />
                    ) : null
                );


        }
    };



    if (!estadoAuth) {
        return <Login onLogin={handleGoogleLogin} />;
    }

    return (
        <>

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: { fontSize: '14px' },
                }}
            />
            {(isLoading) && (
                <P_loader text={textLoading} />
            )}
            {showTutorial && <InfoPanel onClose={handleCloseTutorial} />}
            {user ? (
                <>
                    <Header
                        user={user}
                        saldo={saldo}
                        currentView={currentView}
                        onNavigate={setCurrentView}
                        onRecharge={() => setModalOpen('recharge')}
                        onLogout={logoutapp}
                    />

                    <main>
                        <div className="relative bg-cover bg-center rounded-xl shadow-lg"
                            style={{ backgroundImage: "url('/rifaneon.png')" }}
                        >

                            {renderCurrentView()}
                        </div>
                    </main>

                    <ConfirmModal
                        isOpen={modalOpen === 'confirm'}
                        selectedNumber={numeroSeleccionado}
                        ticketPrice={RifaSeleccionada?.ticketPrice || 0}
                        balance={(saldo != null ? Number(saldo).toFixed(2) : '0.00')}
                        onClose={closeModal}
                        onConfirm={handleConfirmPurchase}
                    />

                    <RechargeModal
                        isOpen={modalOpen === 'recharge'}
                        onClose={closeModal}
                        onRecharge={handleRecharge}
                    />
                    <RechargePendingModal isOpen={
                        modalOpen === 'inform'}
                        onClose={closeModal}
                    />

                    <Chat
                        chat={chat}
                        user={user}
                        token={token}
                        onToggle={() => setChat(prev => ({ ...prev, open: !prev.open }))}
                        onMessage={handleChatMessage}
                    />
                </>
            ) : (
                <></>
            )}
            <TutorialWrapper />
        </>
    );
}
export default App

