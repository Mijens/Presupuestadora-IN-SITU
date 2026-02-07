/*--------------COJINES-----------------*/

const cojines = [
  {
    id: "COJIN",
    pricesBySerie: {
      "SERIE 2": 70,
      "SERIE 3": 84,
      "SERIE 4": 98,
      "SERIE 5": 112,
    },
  },
];

/*--------------MULTIPLICADOR DE TARIFA-----------------*/
function obtenerMultiplicadorTarifa() {
  const select = document.getElementById("multiplicadorTarifa");
  const valor = select ? parseFloat(select.value) : 1.0;
  return valor;
}

/*---OBTENER PIEZAS SELECCIONADAS SOLO CON Piezas FILTRADAS---*/
function obtenerPiezasSeleccionadas() {
  const piezasPermitidas = ["MOD110", "MOD100", "MOD90", "MOD80", "MODR"];
  const piezas = [];
  for (let i = 1; i <= 8; i++) {
    const select = document.getElementById(`pieza${i}`);
    if (!select || select.selectedIndex === -1) continue;
    const value = select.value;
    const text = select.options[select.selectedIndex]?.text ?? '';
    if (value !== "None" && piezasPermitidas.includes(value)) {
      piezas.push({ id: value, nombre: text, slot: i });
    }
  }
  return piezas;
}

/*---OBTENER PIEZAS POR SLOT---*/
function obtenerPiezasPorSlot() {
  const arr = new Array(8).fill(null);
  const piezasPermitidas = ["MOD110", "MOD100", "MOD90", "MOD80", "MODR"];
  for (let i = 1; i <= 8; i++) {
    const select = document.getElementById(`pieza${i}`);
    if (!select || select.selectedIndex === -1) continue;
    const value = select.value;
    const text = select.options[select.selectedIndex]?.text ?? '';
    if (value !== "None" && piezasPermitidas.includes(value)) {
      arr[i - 1] = {
        id: value,
        nombre: text,
        slot: i,
        option: select.options[select.selectedIndex]
      };
    }
  }
  return arr;
}

/*---PRECIOS DE LAS PIEZAS SEGUN MODELOS----*/
function obtenerPrecioPorMaterial(idPieza, tela) {
  const colecciones = [
    piezasBianca,
    piezasVera,
    piezasLuna,
    piezasNora,
    piezasAura,
    piezasDafne,
    piezasOlivia,
  ];
  let precioMaterial;

  for (const coleccion of colecciones) {
    const pieza = coleccion.find((p) => p && p.id === idPieza);
    if (pieza && Array.isArray(pieza.price)) {
      precioMaterial = pieza.price.find((p) => p.material === tela);
      if (precioMaterial) {
        const precioBase = parseFloat(precioMaterial.precio) || 0;
        const multiplicador = obtenerMultiplicadorTarifa();
        return precioBase * multiplicador;
      }
    }
  }

  return 0;
}

/*---CALCULAR PRECIO TOTAL---*/
function calcularPrecioTotalPorSerie(serie) {
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();
  const piezasFiltradas = piezasSeleccionadas.filter((pieza) => pieza.id !== "None");
  
  // Calcular precio de piezas
  const precioPiezas = piezasFiltradas.reduce((total, pieza) => {
    const precioPieza = obtenerPrecioPorMaterial(pieza.id, serie);
    return total + precioPieza;
  }, 0);
  
  // Calcular precio de cojines
  const cantidadCojines = parseInt(document.getElementById("cojines")?.value) || 0;
  let precioCojines = 0;
  if (cantidadCojines > 0) {
    const precioUnidad = cojines[0].pricesBySerie[serie] || 0;
    const multiplicador = obtenerMultiplicadorTarifa();
    precioCojines = precioUnidad * multiplicador * cantidadCojines;
  }
  
  return precioPiezas + precioCojines;
}

/*---ACTUALIZAR PRECIOS EN DROPDOWN---*/
function actualizarPreciosEnDropdown() {
  // Solo se queda si quieres mantener multiplicador
  const telaSelect = document.getElementById("tela");
  if (!telaSelect) return;
  
  const opciones = telaSelect.options;
  
  for (let i = 0; i < opciones.length; i++) {
    const serie = opciones[i].value;
    if (serie && serie !== "") {
      const precioTotal = calcularPrecioTotalPorSerie(serie);
      const textoOriginal = serie;
      opciones[i].text = `${textoOriginal}    (${precioTotal.toFixed(2)}€)`;
      opciones[i].classList.add('option-con-precio');
    }
  }
}

/*---GENERAR RESUMEN SOLO PIEZAS Y COJINES---*/
function generarResumen() {
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();

  const piezasFiltradas = piezasSeleccionadas.filter((pieza) => pieza.id !== "None");

  const cantidadCojines = parseInt(document.getElementById("cojines").value) || 0;

  const precioPiezas = piezasFiltradas.reduce((total, pieza) => {
    const precioPieza = obtenerPrecioPorMaterial(pieza.id, "SERIE 2"); // Puedes ajustar la serie por defecto
    return total + precioPieza;
  }, 0);

  let precioCojines = 0;
  let precioUnitarioCojin = 0;
  if (cantidadCojines > 0) {
    precioUnitarioCojin = cojines[0].pricesBySerie["SERIE 2"] || 0;
    const multiplicador = obtenerMultiplicadorTarifa();
    precioUnitarioCojin = precioUnitarioCojin * multiplicador;
    precioCojines = precioUnitarioCojin * cantidadCojines;
  }

  const precioTotal = precioPiezas + precioCojines;

  // Generar línea de cojines con cantidad
  let lineasCojines = '';
  if (cantidadCojines > 0) {
    lineasCojines = `<li class="itemsResumen inter-resumen">COJÍN DE ADORNO 45X45 CM &nbsp <span id="precioCojines">${precioUnitarioCojin.toFixed(2)}€ X${cantidadCojines}</span></li>`;
  }

  const resumenElement = document.getElementById("resumen");
  resumenElement.innerHTML = `
    ${
      piezasFiltradas.length > 0
        ? `<li class="inter-resumen">Piezas seleccionadas:</li><ul>` +
          piezasFiltradas
            .map(
              (pieza) =>
                `<li class="itemsResumen inter-resumen">${pieza.id} ${pieza.nombre} &nbsp <span id="preciosMaterial">${obtenerPrecioPorMaterial(pieza.id, "SERIE 2").toFixed(2)}€</span></li>`
            )
            .join("") +
          "</ul>"
        : ""
    }
    ${lineasCojines}
    <li class="precioResumen inter-resumen">Precio Total: <span id="precioTotal"> &nbsp ${precioTotal.toFixed(2)}€</span></li>
  `;

  actualizarPreciosEnDropdown();
}

/*----------------MOSTRAR SECCION CLIENTE------------------*/
const openModalBtn = document.getElementById("openModalBtn");
const seccionCliente = document.getElementById("seccionCliente");
const generarPdfBtn = document.getElementById("generarPdfBtn");

if (openModalBtn) {
  openModalBtn.addEventListener("click", function () {
    // Mostrar la sección de cliente
    seccionCliente.style.display = "block";
    // Scroll suave hacia la sección de cliente
    seccionCliente.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (generarPdfBtn) {
  generarPdfBtn.addEventListener("click", function () {
    const nombreCliente = document.getElementById("nombreCliente").value.trim();
    
    if (!nombreCliente) {
      alert("Por favor, ingrese el nombre del cliente");
      return;
    }
    
    // Aquí irá la función para generar el PDF
    console.log("Generando PDF para cliente:", nombreCliente);
    // TODO: Llamar a la función de generación de PDF
  });
}

// ===============================================================================
// INICIALIZACIÓN GENERAL
// ===============================================================================

document.addEventListener('DOMContentLoaded', function() {

  // Configurar todos los selects
  const selectElements = document.querySelectorAll("select");
  selectElements.forEach((select) => {
    select.addEventListener("change", function () {
      generarResumen();
      if (typeof mostrarImagenes === 'function') {
        mostrarImagenes();
      }
    });
  });

  // Event listeners para actualizar precios en dropdown
  for (let i = 1; i <= 8; i++) {
    const select = document.getElementById(`pieza${i}`);
    if (select) {
      select.addEventListener("change", actualizarPreciosEnDropdown);
    }
  }

  const cojinesSelect = document.getElementById("cojines");
  if (cojinesSelect) {
    cojinesSelect.addEventListener("change", actualizarPreciosEnDropdown);
  }

  // Inicializar resumen y precios
  generarResumen();
  actualizarPreciosEnDropdown();

  console.log('🎯 Sistema inicializado: Configurador solo Piezas + Cojines');

});