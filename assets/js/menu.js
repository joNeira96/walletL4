//MOSTRAR SALDO ACTUAL
document.addEventListener("DOMContentLoaded", function() {
  const saldoDisplay = document.getElementById("saldoDisplay");

  // Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "60000");
  }

  // Función para mostrar el saldo
  function mostrarSaldo() {
    const saldo = Number(localStorage.getItem("saldo"));
    saldoDisplay.innerText = `$${saldo.toLocaleString()}`;
  }

  // Mostrar saldo al cargar la página
  mostrarSaldo();

  // 🔹 Actualizar saldo automáticamente cada vez que la página se vuelva visible
  document.addEventListener("visibilitychange", function() {
    if (!document.hidden) {
      mostrarSaldo();
    }
  });
});

