document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const mainContent = document.getElementById('mainContent');

    const backgroundMusic = document.getElementById('backgroundMusic');
    const toggleMuteBtn = document.getElementById('toggleMuteBtn');

    const ticketForm = document.getElementById('ticketForm');
    const winnerNameInput = document.getElementById('winnerName');
    const ticketContainer = document.getElementById('ticketContainer');
    const displayedName = document.getElementById('displayedName');
    const displayedTimestamp = document.getElementById('displayedTimestamp');
    const downloadTicketBtn = document.getElementById('downloadTicket');
    const ticketElement = document.querySelector('.ticket');

    const CORRECT_PASSWORD = "digestion";

    passwordForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const enteredPassword = passwordInput.value;

        if (enteredPassword === CORRECT_PASSWORD) {
            loginContainer.style.display = 'none';
            mainContent.style.display = 'block';
            
        
            if (toggleMuteBtn) {
                toggleMuteBtn.style.display = 'inline-block';
            }

        
            backgroundMusic.play()
                .then(() => {
                
                    console.log("Musique tentée de jouer. Vérifiez si elle est muette.");
                })
                .catch(error => {
                
                    console.error("Erreur lors du lancement automatique de la musique :", error);
                    alert("Le navigateur a bloqué la lecture automatique de la musique. Cliquez sur 'Activer le son' pour la démarrer.");
                });

        } else {
            alert('Mot de passe incorrect. Veuillez réessayer.');
            passwordInput.value = '';
        }
    });

    if (toggleMuteBtn) {
        toggleMuteBtn.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
            }

            if (backgroundMusic.muted) {
                backgroundMusic.muted = false;
                toggleMuteBtn.textContent = 'Désactiver le son';
            } else {
                backgroundMusic.muted = true;
                toggleMuteBtn.textContent = 'Activer le son';
            }
        });
    
        toggleMuteBtn.style.display = 'none';
    }

    ticketForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const winnerName = winnerNameInput.value.trim();
        
        if (winnerName) {
            const now = new Date();
            const timestamp = now.toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            displayedName.textContent = winnerName;
            displayedTimestamp.textContent = timestamp;
            ticketContainer.style.display = 'block';
        } else {
            alert('Veuillez entrer le pseudo du gagnant.');
        }
    });

    downloadTicketBtn.addEventListener('click', () => {
        downloadTicketBtn.style.display = 'none'; 
        
        html2canvas(ticketElement, { 
            scale: 2,
            backgroundColor: null
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'ticket_victoire.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            downloadTicketBtn.style.display = 'block';
        });
    });
});