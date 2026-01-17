//HISTORIAL DE MOVIMIENTOS
document.addEventListener("DOMContentLoaded", function() {
  const lista = document.getElementById("historialLista");
  
  //LECTURA DE HISTORIAL
  const historial = JSON.parse(localStorage.getItem("historial")) || [];

  if (historial.length === 0) {
    lista.innerHTML = `<li class="list-group-item">No hay movimientos registrados</li>`;
    return;
  }

  //CREACION DE DEPOSITO
  historial.forEach(mov => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `${mov.tipo} <span class="badge text-bg-primary rounded-pill">
      ${mov.monto >= 0 ? '+' : '-'}$${Math.abs(mov.monto).toLocaleString()}</span>`;

    lista.appendChild(li);
  });
});
