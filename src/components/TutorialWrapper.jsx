import React, { useEffect, useState } from "react";
import InfoPanel from "./InfoPanel";
import { Info } from "lucide-react"; // 👈 Icono bonito opcional (puedes usar FontAwesome también)

const TutorialWrapper = () => {
    const [showTutorial, setShowTutorial] = useState(false);

    // Mostrar el tutorial la primera vez que entra el usuario
    useEffect(() => {
        const seen = localStorage.getItem("tutorialSeen");
        if (!seen) {
            setShowTutorial(true);
        }
    }, []);

    const handleCloseTutorial = () => {
        localStorage.setItem("tutorialSeen", "true");
        setShowTutorial(false);
    };

    return (
        <>
            {/* Botón flotante para ver el panel cuando quiera */}
            <button
                onClick={() => setShowTutorial(true)}
                className="fixed top-1/2 right-6 transform -translate-y-1/2 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition z-40"
                title="Ver cómo jugar"
            >
                <Info className="w-6 h-6" />
            </button>

            {/* Panel lateral */}
            {showTutorial && <InfoPanel onClose={handleCloseTutorial} />}
        </>
    );
};

export default TutorialWrapper;
