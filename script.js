document.addEventListener('DOMContentLoaded', () => {
    const ticketForm = document.getElementById('ticketForm');
    const winnerNameInput = document.getElementById('winnerName');
    const ticketContainer = document.getElementById('ticketContainer');
    const displayedName = document.getElementById('displayedName');
    const displayedTimestamp = document.getElementById('displayedTimestamp');
    const downloadTicketBtn = document.getElementById('downloadTicket');
    const ticketElement = document.querySelector('.ticket');

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
            alert('Veuillez entrer le nom du gagnant.');
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