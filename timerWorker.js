// timerWorker.js
let count = 0; // Contador de segundos, ajusta según necesites iniciar

function timer() {
    count++;
    postMessage(count); // Envía el contador actualizado al script principal
    setTimeout(timer, 1000); // Espera un segundo antes de repetir
}

timer(); // Inicia el timer
