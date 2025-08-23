import React, { useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
/*
 user: 'pedrodd',
  text: 'yyy',
  user_id: 1,
  token: '52|OQmwvCACDk1NYwka225bzOE1TK7zh0VA4w2DY6CX93fdf1d0'

*/
const Chat = ({ chat, user, token, onToggle, onMessage }) => {
    // Ref para la caja de mensajes
    const chatBodyRef = useRef(null);
    let msgUserName = 'Tú';
    // Hacer scroll automático cuando cambien los mensajes
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [chat.messages]); // Se ejecuta cada vez que cambian los mensajes

    return (
        <div className={`chat-widget ${chat.open ? 'open' : ''}`}>
            <button className="chat-toggle" onClick={onToggle}>
                {chat.open ? <X /> : <Send />}
            </button>
            <div className="chat-window">
                <div className="chat-header">Chat en Vivo</div>

                <div className="chat-body" ref={chatBodyRef}>
                    {chat.messages.map((msg, index) => {

                        if (msg.user_id === user?.id_user) {
                            // Mensaje propio
                            msgUserName = 'Tú';
                        } else {

                            msgUserName = msg.user?.name || msg.user || 'Desconocido';
                        }
                        const msgUserId = msg.user_id || msg.user?.id || null;

                        const msgText = msg.text || msg.message || '';
                        const isOwn = msgUserId === user?.id_user;

                        return (
                            <div
                                key={index}
                                className={`chat-message ${isOwn ? 'own-message' : ''}`}
                            >
                                <strong>{msgUserName}:</strong> {msgText}
                            </div>
                        );
                    })}
                </div>

                <form className="chat-input" onSubmit={onMessage}>
                    <input
                        type="text"
                        name="message"
                        placeholder="Escribe un mensaje..."
                        autoComplete="off"
                    />
                    <button type="submit"><Send /></button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
