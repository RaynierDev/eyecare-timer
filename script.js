let elapsedTime = 0;
let timerInterval;
const tiempoTrabajo = 20 * 60 * 1000; // 20 minutos en milisegundos
const tiempoDescanso = 20 * 1000; // 20 segundos en milisegundos
let enPeriodoDeTrabajo = true;

function toggleCiclo() {
  clearInterval(timerInterval); // Limpiar el intervalo anterior
  timerInterval = null; // Restablecer el intervalo
  if (enPeriodoDeTrabajo) {
    // Cambiar a período de descanso
    enPeriodoDeTrabajo = false;
    document.getElementById('sound2').play(); // Sonido para inicio del descanso
    document.getElementById('message').textContent = "Descanso: mira lejos durante 20 segundos";
    elapsedTime = 0; // Reiniciar tiempo transcurrido
    startTimer(tiempoDescanso); // Iniciar temporizador de descanso
  } else {
    // Cambiar a período de trabajo
    enPeriodoDeTrabajo = true;
    document.getElementById('sound1').play(); // Sonido para inicio del trabajo
    document.getElementById('message').textContent = "Trabajo: 20 minutos de enfoque";
    elapsedTime = 0; // Reiniciar tiempo transcurrido
    startTimer(tiempoTrabajo); // Iniciar temporizador de trabajo
  }
}

function updateTimer(tiempoCiclo) {
  let remainingTime = tiempoCiclo - elapsedTime;
  
  if (remainingTime <= 0) {
    toggleCiclo();
    return; // Finaliza aquí para evitar ejecución adicional después de cambiar de ciclo
  }

  // Calcular minutos y segundos restantes
  let seconds = Math.floor((remainingTime / 1000) % 60);
  let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);

  // Actualizar el display del temporizador
  document.getElementById('hms').textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function startTimer(tiempoCiclo) {
  if (!timerInterval) {
    timerInterval = setInterval(() => {
      elapsedTime += 1000; // Incrementar en un segundo
      updateTimer(tiempoCiclo);
    }, 1000);
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  enPeriodoDeTrabajo = true; // Resetea al estado inicial
  document.getElementById('hms').textContent = '20:00'; // Restablece el temporizador a 20 minutos
  document.getElementById('message').textContent = "Prepárate"; // Mensaje inicial
}

function restartTimer() {
  stopTimer();
  startTimer(tiempoTrabajo); // Asegúrese de iniciar con el tiempo de trabajo
}

document.getElementById('btn-start').addEventListener('click', function() { startTimer(tiempoTrabajo); });
document.getElementById('btn-stop').addEventListener('click', stopTimer);
document.getElementById('btn-restart').addEventListener('click', restartTimer);

function pad(number) {
  return number < 10 ? '0' + number : number;
}
