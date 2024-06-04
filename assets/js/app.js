document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('random-button');
    const contentDiv = document.querySelector('.content');
    const carambarSection = document.getElementById('carambar-section');
    const countdownDiv = document.getElementById('countdown');
    const carambarImage = document.getElementById('carambar-image');

    button.addEventListener('click', fetchAndDisplayJoke);

    async function fetchAndDisplayJoke() {
        try {
            const response = await fetch('./../data.json');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomJoke = data[randomIndex];

            // Afficher la blague
            contentDiv.innerHTML = `<p><strong>Blague :</strong> ${randomJoke.blague}</p>`;

            // Afficher la section Carambar avec le compte à rebours
            carambarSection.style.display = 'flex';

            // Démarrer le compte à rebours
            startCountdown(5, randomJoke.reponse);
        } catch (error) {
            console.error('Error fetching the joke:', error);
            contentDiv.innerHTML = '<p>Une erreur est survenue, veuillez réessayer plus tard.</p>';
        }
    }

    function startCountdown(seconds, answer) {
        let remainingTime = seconds;

        const interval = setInterval(() => {
            if (remainingTime > 0) {
                countdownDiv.innerHTML = `<strong>${remainingTime}</strong>`;
                remainingTime--;
            } else {
                clearInterval(interval);
                countdownDiv.innerHTML = '<p>Finis !</p>';
                displayAnswer(answer);
            }
        }, 1000);
    }

    function displayAnswer(answer) {
        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `<p><strong>Réponse :</strong> ${answer}</p>`;
        contentDiv.appendChild(answerDiv);
    
        // Attendre 2 secondes avant d'ajouter la classe d'explosion
        setTimeout(() => {
            carambarImage.classList.add('explosion');
    
            // Cacher la section Carambar après l'animation d'explosion
            setTimeout(() => {
                carambarSection.style.display = 'none';
                carambarImage.classList.remove('explosion'); // Réinitialiser l'animation
            }, 500); // La durée doit correspondre à l'animation CSS
        }, 2000);
    
        // Modifier le texte "Finis !" après 2 secondes
        setTimeout(() => {
            countdownDiv.innerHTML = '';
        }, 2000);
    }
    
    
});
