export function launchConfetti() {

    if (window.confetti) {

        window.confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            zIndex: 2000
        });
    }
}

