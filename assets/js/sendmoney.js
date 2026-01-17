//TRANSFERENCIAS
document.addEventListener("DOMContentLoaded", function() {
  const tabla = document.getElementById("tablaUsuarios");
  const form = document.querySelector("formContacto");
  const inputContacto = document.getElementById("searchContact");

  // Inicializar saldo si no existe
  if (!localStorage.getItem("saldo")) {
    localStorage.setItem("saldo", "60000");
  }

  // Inicializar contactos si no existen
  let contactos = JSON.parse(localStorage.getItem("contactos")) || [
    { nombre: "Ana Muñoz", cuenta: "9.164.269-1", banco: "Banco Estado" },
    { nombre: "Luis Pérez", cuenta: "4.216.841-7", banco: "Banco Santander" },
    { nombre: "Juan Ortiz", cuenta: "6.318.220-2", banco: "Banco Santander" }
  ];
  localStorage.setItem("contactos", JSON.stringify(contactos));

  // Función para renderizar la tabla
  function renderizarContactos() {
    tabla.innerHTML = "";
    contactos.forEach((c, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${c.nombre}</td>
        <td>${c.cuenta}</td>
        <td>${c.banco}</td>
        <td><button class="btnTransferir btn btn-sm btn-danger" data-index="${index}">Transferir</button></td>
      `;
      tabla.appendChild(tr);
    });

    // Agregar evento a los botones de transferir
    const botones = document.querySelectorAll(".btnTransferir");
    botones.forEach(btn => {
      btn.addEventListener("click", function() {
        const index = this.getAttribute("data-index");
        realizarTransferencia(contactos[index]);
      });
    });
  }

  renderizarContactos();

  // Agregar nuevo contacto
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = inputContacto.value.trim();
    if (!nombre) {
      alert("Ingrese un nombre válido");
      return;
    }

    const nuevoContacto = { nombre: nombre, cuenta: "000000-0", banco: "Banco Nuevo" };
    contactos.push(nuevoContacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));
    inputContacto.value = "";
    renderizarContactos();
  });

  // Función para transferir
  function realizarTransferencia(contacto) {
    const monto = Number(prompt(`Ingrese monto a transferir a ${contacto.nombre}`));
    if (!monto || monto <= 0) {
      alert("Monto inválido");
      return;
    }

    let saldo = Number(localStorage.getItem("saldo"));
    if (monto > saldo) {
      alert("Saldo insuficiente");
      return;
    }

    saldo -= monto;
    localStorage.setItem("saldo", saldo);

    // Guardar transacción en historial
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    const fecha = new Date().toLocaleString();
    historial.unshift({
      tipo: `Transferencia a ${contacto.nombre}`,
      monto: -monto,
      fecha: fecha
    });
    localStorage.setItem("historial", JSON.stringify(historial));

    alert(`Transferencia de $${monto} a ${contacto.nombre} realizada con éxito.\nSaldo actual: $${saldo}`);
  }
});


//AUTOCOMPLETAR CONTACTOS 
$(document).ready(function() {
  // Obtener contactos de localStorage
  let contactos = JSON.parse(localStorage.getItem("contactos")) || [
    { nombre: "Ana Muñoz" },
    { nombre: "Luis Pérez" },
    { nombre: "Juan Ortiz" }
  ];

  // Crear array solo con nombres
  const nombresContactos = contactos.map(c => c.nombre);
  console.log(nombresContactos);

  // Activar autocompletar
  $("#searchContact").autocomplete({
    source: nombresContactos,
    minLength: 1, // cantidad mínima de letras para sugerir
    select: function(event, ui) {
      // Si se selecciona un nombre, se puede hacer algo aquí
      console.log("Seleccionaste: " + ui.item.value);
    }
  });
});
