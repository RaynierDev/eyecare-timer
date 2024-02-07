document.addEventListener("DOMContentLoaded", function() {
  let startTime;
  let timeoutId;
  let isWorkingTime = true; // Controla si está en tiempo de trabajo o descanso
  const workDuration = 20 * 60 * 1000; // 20 minutos en milisegundos
  const breakDuration = 20 * 1000; // 20 segundos en milisegundos
  let currentDuration = workDuration; // Inicia con un ciclo de trabajo

  function updateTimer() {
    const elapsedTime = Date.now() - startTime; // Tiempo transcurrido desde el inicio
    let remainingTime = currentDuration - elapsedTime;

    // Si el tiempo restante es menor o igual a 0, cambia el estado y reinicia el temporizador
    if (remainingTime <= 0) {
      isWorkingTime = !isWorkingTime; // Cambia entre trabajo y descanso
      currentDuration = isWorkingTime ? workDuration : breakDuration; // Asigna la nueva duración
      startTime = Date.now(); // Reinicia el contador
      updateMessage(); // Actualiza el mensaje para reflejar el nuevo estado
      playSound(isWorkingTime ? "work" : "break"); // Reproduce un sonido específico para el trabajo o el descanso
      remainingTime = currentDuration;
    }

    const minutes = Math.floor(remainingTime / 60000);
    const seconds = Math.floor((remainingTime % 60000) / 1000);

    document.getElementById('hms').textContent = `${pad(minutes)}:${pad(seconds)}`;

    // Solicita la siguiente actualización
    timeoutId = setTimeout(updateTimer, 500); // Usamos un timeout para controlar el ciclo y permitir su detención
  }

  function updateMessage() {
    const message = isWorkingTime ? "Trabajo: 20 minutos de enfoque" : "Descanso: mira lejos durante 20 segundos";
    document.getElementById('message').textContent = message;
  }

  function playSound(type) {
    const sound1 = document.getElementById('sound1');
    const sound2 = document.getElementById('sound2');
    if (type === "work") {
      sound1.play();
    } else {
      sound2.play();
    }
  }

  function startTimer() {
    startTime = Date.now(); // Establece el tiempo de inicio
    updateMessage(); // Establece el mensaje inicial
    updateTimer(); // Comienza a actualizar el temporizador
  }

  function stopTimer() {
    clearTimeout(timeoutId); // Detiene el ciclo de actualización
  }

  function pad(number) {
    return number < 10 ? '0' + number : number;
  }

  // Agregar eventos a botones
  document.getElementById('btn-start').addEventListener('click', startTimer);
  document.getElementById('btn-stop').addEventListener('click', stopTimer);

  // Funcionalidad opcional: reiniciar el temporizador
  function restartTimer() {
    stopTimer();
    isWorkingTime = true;
    currentDuration = workDuration;
    startTimer();
  }
  document.getElementById('btn-restart').addEventListener('click', restartTimer);
});


document.addEventListener('DOMContentLoaded', (event) => {
  // Asegurarse de que el DOM está completamente cargado

  // Obtener los botones por ID
  const playSound1Button = document.getElementById('btn-trabajo');
  const playSound2Button = document.getElementById('btn-descanso');

  // Añadir un event listener a cada botón
  playSound1Button.addEventListener('click', function() {
      reproducir('sound1');
  });

  playSound2Button.addEventListener('click', function() {
      reproducir('sound2');
  });
});

function reproducir(soundId) {
  // Asegúrate de que esta función maneje correctamente la reproducción del sonido.
  const sound = document.getElementById(soundId);
  if (sound) {
      sound.play();
  }
}
