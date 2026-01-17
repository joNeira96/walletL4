//REALIZAR DÉPOSITOS
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("depositForm");
  const input = document.getElementById("depositAmount");
  const mensaje = document.getElementById("mensajeSaldo");

  //LECTURA DE SALDO
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "0");
  }
  //INGRESO MONTO
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const cantidad = Number(input.value);
    console.log(cantidad)
    if (cantidad <= 0 || isNaN(cantidad)) {
      mensaje.innerText = "Ingresa un monto válido mayor a 0";
      mensaje.style.color = "orange";
      return;
    }

  //ACTUALIZAR SALDO
    let saldoActual = Number(localStorage.getItem("saldo"));
    saldoActual += cantidad;
    localStorage.setItem("saldo", saldoActual);

    //GUARDAR HISTORIAL
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    const fecha = new Date().toLocaleString();
    historial.unshift({ tipo: "Depósito", monto: cantidad, fecha: fecha }); // agregamos al inicio
    localStorage.setItem("historial", JSON.stringify(historial));


  //LECTURA FINAL
    mensaje.innerText = `Depósito realizado: $${cantidad}. Saldo actual: $${saldoActual}`;
    mensaje.style.color = "lightgreen";

    input.value = "";
  });
});

