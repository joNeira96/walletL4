//VALIDACION DE LOGIN
document.getElementById("btnIngresar").addEventListener("click", function (event) {
  event.preventDefault(); // Evita navegación automática
  console.log("Click detectado");

  // Credenciales simuladas
  const emailCorrecto = "admin@email.com";
  const passwordCorrecta = "1234";

  // Valores ingresados
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  // Expresión regular simple para email
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validar campos vacíos
  if (email === "" || password === "") {
    mensaje.innerText = "Todos los campos son obligatorios.";
    mensaje.style.color = "orange";
    return;
  }

  // Validar formato de email
  if (!emailValido.test(email)) {
    mensaje.innerText = "Ingrese un correo electrónico válido.";
    mensaje.style.color = "orange";
    return;
  }

  // Validación de credenciales
  if (email === emailCorrecto && password === passwordCorrecta) {
    mensaje.innerText = "Login exitoso.";
    mensaje.style.color = "green";

    // Redirección
    window.location.href = "menu.html";
  } else {
    // Credenciales incorrectas
    mensaje.innerText = "Correo o contraseña incorrectos.";
    mensaje.style.color = "red";

    // Limpia solo la contraseña
    document.getElementById("password").value = "";
  }
});