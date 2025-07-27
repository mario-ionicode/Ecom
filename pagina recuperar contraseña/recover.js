document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formRecuperar");
  const correoInput = document.getElementById("correo");
  const celularInput = document.getElementById("celular");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const correo = correoInput.value.trim();
    const celular = celularInput.value.trim();

    // Validar correo
    if (correo === "" || !validarEmail(correo)) {
      mostrarMensaje("Por favor ingresa un correo válido.", "red");
      return;
    }

    // Validar celular
    if (celular === "" || !validarCelular(celular)) {
      mostrarMensaje("Por favor ingresa un número celular válido.", "red");
      return;
    }

    // Simular envío exitoso
    mostrarMensaje("Se ha enviado un enlace de recuperación a tu correo y un código a tu celular.", "green");

    // Aquí iría el envío real al backend
    // fetch("/api/recuperar", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ correo, celular })
    // }).then(...)
  });
});

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validarCelular(cel) {
  // Validar solo dígitos y longitud mínima de 8 o 10 caracteres (ajústable)
  const re = /^[0-9]{8,15}$/;
  return re.test(cel);
}

function mostrarMensaje(texto, color) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  mensaje.style.color = color;
}