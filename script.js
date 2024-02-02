let start = document.getElementById("btn-start");
let reStart = document.getElementById("btn-restart");
let stop = document.getElementById("btn-stop");
let hms = document.getElementById("hms");
let message = document.getElementById("message"); // Nuevo elemento de mensaje
let sound1 = document.getElementById("sound1");
let sound2 = document.getElementById("sound2");
let countdown; // Variable para almacenar el identificador del intervalo

// Función para actualizar el contador
function updateCountdown(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    hms.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Función para iniciar el temporizador
function startTimer(duration) {
    let seconds = duration;
    updateCountdown(seconds);

    // Actualiza el mensaje
    if (duration === 1200) {
        message.textContent = "Puedes ver tu pantalla";
    } else {
        message.textContent = "Mira hacia un punto lejano";
    }

    countdown = setInterval(function() {
        seconds--;
        updateCountdown(seconds);

        if (seconds <= 0) {
            clearInterval(countdown); // Detiene el intervalo

            if (duration === 1200) {
                sound1.play(); // Reproduce el sonido para el temporizador 
            } else {
                sound2.play(); // Reproduce otro sonido para el temporizador
            }

            let nextDuration = duration === 1200 ? 20 : 1200;
            startTimer(nextDuration);
        }
    }, 1000);
}

// Función que se ejecuta cuando se hace clic en el botón "Iniciar"
start.addEventListener("click", function() {
    message.textContent = "Prepárate"; // Mensaje inicial al empezar
    startTimer(1200); // Inicia con 1200 segundos
});

// Función que se ejecuta cuando se hace clic en el botón "Detener"
stop.addEventListener("click", function() {
    clearInterval(countdown); // Detiene el intervalo
    message.textContent = "Detenido"; // Actualiza el mensaje
});

// Función que se ejecuta cuando se hace clic en el botón "Reiniciar"
reStart.addEventListener("click", function() {
    clearInterval(countdown); // Detiene el intervalo
    hms.innerHTML = "00:00:00"; // Restablece el contador a 00:00:00
    message.textContent = "Prepárate"; // Restablece el mensaje
});

// Dentro de tu script principal
if (window.Worker) {
    const myWorker = new Worker('timerWorker.js');

    myWorker.onmessage = function(e) {
        const count = e.data;
        // Actualiza tu UI con el valor de 'count'
        // Por ejemplo, actualizando el contenido de un elemento para mostrar el tiempo
        document.getElementById('hms').textContent = count; // Ajusta según cómo quieras mostrar el tiempo
    };

    // Añade aquí cualquier otro control de tu UI, como iniciar o detener el worker
} else {
    // Los Web Workers no son soportados en este navegador.
}

