let video;
let step = 1; // Variable para el paso actual

function setup() {
  // Crear un canvas que ocupe toda la pantalla
  createCanvas(windowWidth, windowHeight);

  // Inicializar la cámara
  video = createCapture(VIDEO, function () {
    // Esta función se ejecuta cuando la cámara ha iniciado correctamente
    video.size(width, height); // Establecer el tamaño del video para que cubra toda la pantalla
    video.hide(); // Ocultar el elemento de video HTML, ya que lo vamos a dibujar en el canvas
  });

  // Iniciar cámara si está habilitada
  startCamera();
}

// Función para iniciar la cámara (usar getUserMedia)
function startCamera() {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (streamData) {
        video.srcObject = streamData; // Asociar el flujo a la cámara
      })
      .catch(function (err) {
        console.log("Error al acceder a la cámara: " + err);
      });
  } else {
    alert("La cámara no es compatible con este navegador.");
  }
}

// Función para avanzar al siguiente paso
function nextStep() {
  if (step === 1) {
    // Ocultar el paso 1 y mostrar el siguiente paso
    document.getElementById("step1").style.display = "none";
    document.getElementById("steps").style.display = "block";
    step = 2;
  }
}

// Dibujar el video de la cámara en el canvas de p5.js
function draw() {
  background(0); // Fondo negro

  // Mostrar el video en el canvas (esto lo centra y lo redimensiona automáticamente)
  image(video, 0, 0, width, height); // El video ocupará todo el canvas

  // Dibujar los elementos centrados
  fill(255); // Color blanco para el texto
  textAlign(CENTER, CENTER); // Centrar el texto
  textSize(32);

  if (step === 1) {
    // Mostrar el paso 1
    text("Esperando que se cargue la cámara...", width / 2, height / 2);
  } else if (step === 2) {
    // Mostrar el paso 2
    text("Paso 2: ¡Listo!", width / 2, height / 2);
  }
}

// Función para manejar el cambio de tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(width, height); // Ajustar el tamaño del video al nuevo tamaño de la ventana
}
