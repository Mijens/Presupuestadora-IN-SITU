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

/*--------------PRECIOS DE COJINES POR TEJIDO-----------------*/
const preciosCojinesPorTejido = {
  // INDOOR
  "CLUB": 84,
  "DROM": 84,
  "GRES": 84,
  "MOULIN": 84,
  "SALVIA": 84,
  "GRANIT": 98,
  "DUO": 70,
  "SUBLIM": 70,
  // OUTDOOR
  "ALBA (IMP)": 98,
  "BRISA (IMP)": 98,
  "CORDA (IMP)": 119,
  "FIJI (IMP)": 98,
  "SALINA (IMP)": 112,
  "SAULÓ (IMP)": 112,
  "None": 0
};

/*--------------TEJIDOS IMPERMEABLES (OUTDOOR)-----------------*/
const tejidosIMP = new Set(["ALBA (IMP)", "BRISA (IMP)", "CORDA (IMP)", "FIJI (IMP)", "SALINA (IMP)", "SAULÓ (IMP)"]);

/*--------------PRECIOS BASE DE MÓDULOS (SIN TEJIDO)-----------------*/
const preciosBaseModulos = {
  "MOD80": 142.50,
  "MOD90": 150.00,
  "MOD100": 157.50,
  "MOD110": 165.00,
  "MODR": 180.00 // Precio base del rincón
};

/*--------------OBTENER PRECIO BASE (CON +5% PARA OUTDOOR)-----------------*/
function getPrecioBase(idPieza, tejido) {
  const base = preciosBaseModulos[idPieza] || 0;
  return tejidosIMP.has(tejido) ? base * 1.05 : base;
}

/*--------------INCREMENTOS POR TEJIDO PARA MÓDULOS NORMALES-----------------*/
const incrementosPorTejido = {
  // INDOOR
  "CLUB": 66.20,
  "DROM": 59.48,
  "DUO": 44.19,
  "GRANIT": 70.23,
  "GRES": 58.64,
  "MOULIN": 62.00,
  "SALVIA": 56.62,
  "SUBLIM": 48.56,
  // OUTDOOR
  "ALBA (IMP)": 69.72,
  "BRISA (IMP)": 69.72,
  "CORDA (IMP)": 106.12,
  "FIJI (IMP)": 77.82,
  "SALINA (IMP)": 88.37,
  "SAULÓ (IMP)": 79.80,
  "None": 0
};

/*--------------INCREMENTOS POR TEJIDO PARA MODR (RINCÓN)-----------------*/
const incrementosPorTejidoMODR = {
  // INDOOR
  "CLUB": 92.20,
  "DROM": 82.84,
  "DUO": 61.55,
  "GRANIT": 97.82,
  "GRES": 81.67,
  "MOULIN": 83.35,
  "SALVIA": 78.86,
  "SUBLIM": 67.63,
  // OUTDOOR
  "ALBA (IMP)": 97.12,
  "BRISA (IMP)": 97.12,
  "CORDA (IMP)": 147.81,
  "FIJI (IMP)": 108.39,
  "SALINA (IMP)": 123.10,
  "SAULÓ (IMP)": 111.15,
  "None": 0
};

/*--------------MULTIPLICADOR DE TARIFA-----------------*/
function obtenerMultiplicadorTarifa() {
  const select = document.getElementById("multiplicadorTarifa");
  const valor = select ? parseFloat(select.value) : 1.0;
  return valor;
}

/*--------------REDONDEO COMERCIAL INTELIGENTE-----------------*/
function redondeoComercial(precio) {
  if (precio < 500) {
    // Menos de 500€: redondear a .90
    return Math.floor(precio) + 0.90;
  } else {
    // 500€ o más: redondear a .00
    return Math.round(precio);
  }
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
  // Obtener tejido seleccionado
  const tejidoSeleccionado = document.getElementById("tejidos")?.value || "None";
  
  // Si no hay tejido seleccionado, retornar 0
  if (tejidoSeleccionado === "None") {
    return 0;
  }
  
  // Obtener precio base del módulo (con +5% si es tejido IMP)
  const precioBase = getPrecioBase(idPieza, tejidoSeleccionado);
  
  // Obtener incremento por tejido (usar tabla específica para MODR)
  let incrementoTejido;
  if (idPieza === "MODR") {
    incrementoTejido = incrementosPorTejidoMODR[tejidoSeleccionado] || 0;
  } else {
    incrementoTejido = incrementosPorTejido[tejidoSeleccionado] || 0;
  }
  
  // Aplicar multiplicador de margen de ganancia (2.3) al total (base + tejido)
  const precioConMargen = (precioBase + incrementoTejido) * 2.3;
  
  // Aplicar multiplicador de tarifa si existe
  const multiplicador = obtenerMultiplicadorTarifa();
  
  const precioFinal = precioConMargen * multiplicador;
  
  // Aplicar redondeo comercial inteligente
  return redondeoComercial(precioFinal);
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

/*---ACTUALIZAR PRECIOS EN DROPDOWN DE TEJIDOS---*/
function actualizarPreciosEnTejidos() {
  const tejidosSelect = document.getElementById("tejidos");
  if (!tejidosSelect) return;
  
  // Obtener piezas seleccionadas
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();
  const piezasFiltradas = piezasSeleccionadas.filter((pieza) => pieza.id !== "None");
  
  // Obtener cantidad de cojines
  const cantidadCojines = parseInt(document.getElementById("cojines")?.value) || 0;
  
  // Iterar sobre las opciones del select de tejidos
  const opciones = tejidosSelect.options;
  
  for (let i = 0; i < opciones.length; i++) {
    const tejido = opciones[i].value;
    
    // Saltar opciones vacías (labels de optgroup) y "Sin tejido"
    if (!tejido || tejido === "" || tejido === "None") {
      if (tejido === "None") opciones[i].text = "SIN TEJIDO SELECCIONADO";
      continue;
    }
    
    // Calcular precio total con este tejido
    let precioTotalTejido = 0;
    
    // Precio de piezas con este tejido
    piezasFiltradas.forEach((pieza) => {
      const precioBase = getPrecioBase(pieza.id, tejido);
      
      // Usar tabla de incrementos específica para MODR
      let incrementoTejido;
      if (pieza.id === "MODR") {
        incrementoTejido = incrementosPorTejidoMODR[tejido] || 0;
      } else {
        incrementoTejido = incrementosPorTejido[tejido] || 0;
      }
      
      const precioConMargen = (precioBase + incrementoTejido) * 2.3; // Multiplicador 2.3
      const multiplicador = obtenerMultiplicadorTarifa();
      const precioFinal = precioConMargen * multiplicador;
      
      // Aplicar redondeo comercial
      precioTotalTejido += redondeoComercial(precioFinal);
    });
    
    // Precio de cojines con este tejido
    if (cantidadCojines > 0) {
      const precioCojin = preciosCojinesPorTejido[tejido] || 0;
      const multiplicador = obtenerMultiplicadorTarifa();
      precioTotalTejido += (precioCojin * multiplicador) * cantidadCojines;
    }
    
    // Actualizar el texto de la opción
    const nombreTejido = tejido;
    opciones[i].text = `${nombreTejido}    (${precioTotalTejido.toFixed(2)}€)`;
  }
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

/*---VERIFICAR SI PUEDE GENERAR PDF---*/
function verificarEstadoPDF() {
  const tejidoSeleccionado = document.getElementById("tejidos")?.value;
  const generarPdfBtn = document.getElementById("generarPdfBtn");
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();
  
  if (generarPdfBtn) {
    // Deshabilitar si no hay tejido o no hay piezas
    if (tejidoSeleccionado === "None" || piezasSeleccionadas.length === 0) {
      generarPdfBtn.disabled = true;
      generarPdfBtn.style.opacity = "0.5";
      generarPdfBtn.style.cursor = "not-allowed";
      generarPdfBtn.title = "Debe seleccionar un tejido y al menos una pieza";
    } else {
      generarPdfBtn.disabled = false;
      generarPdfBtn.style.opacity = "1";
      generarPdfBtn.style.cursor = "pointer";
      generarPdfBtn.title = "";
    }
  }
}

/*---GENERAR RESUMEN SOLO PIEZAS Y COJINES---*/
function generarResumen() {
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();
  const piezasFiltradas = piezasSeleccionadas.filter((pieza) => pieza.id !== "None");
  const cantidadCojines = parseInt(document.getElementById("cojines").value) || 0;
  
  // Obtener tejido seleccionado
  const tejidoSeleccionado = document.getElementById("tejidos").value;

  const precioPiezas = piezasFiltradas.reduce((total, pieza) => {
    const precioPieza = obtenerPrecioPorMaterial(pieza.id, "SERIE 2");
    return total + precioPieza;
  }, 0);

  let precioCojines = 0;
  let precioUnitarioCojin = 0;
  if (cantidadCojines > 0) {
    // Usar precio del cojín según tejido seleccionado
    precioUnitarioCojin = preciosCojinesPorTejido[tejidoSeleccionado] || 0;
    const multiplicador = obtenerMultiplicadorTarifa();
    precioUnitarioCojin = precioUnitarioCojin * multiplicador;
    precioCojines = precioUnitarioCojin * cantidadCojines;
  }

  const precioTotal = precioPiezas + precioCojines;

  // Generar línea de tejido
  let lineaTejido = '';
  if (tejidoSeleccionado && tejidoSeleccionado !== 'None') {
    lineaTejido = `<li class="inter-resumen">Tejido seleccionado: TEJIDO ${tejidoSeleccionado}</li>`;
  } else {
    lineaTejido = `<li class="inter-resumen" style="color: #e74c3c; font-weight: 600;">⚠️ DEBE SELECCIONAR UN TEJIDO</li>`;
  }

  // Generar línea de cojines con cantidad
  let lineasCojines = '';
  if (cantidadCojines > 0) {
    if (tejidoSeleccionado !== 'None') {
      lineasCojines = `<li class="itemsResumen inter-resumen">COJÍN DE ADORNO 45X45 CM &nbsp <span id="precioCojines">${precioUnitarioCojin.toFixed(2)}€ X${cantidadCojines}</span></li>`;
    } else {
      lineasCojines = `<li class="itemsResumen inter-resumen">COJÍN DE ADORNO 45X45 CM &nbsp <span id="precioCojines">0.00€ X${cantidadCojines}</span></li>`;
    }
  }

  const resumenElement = document.getElementById("resumen");
  resumenElement.innerHTML = `
    ${lineaTejido}
    ${
      piezasFiltradas.length > 0
        ? `<li class="inter-resumen">Piezas seleccionadas:</li><ul>` +
          piezasFiltradas
            .map(
              (pieza) =>
                `<li class="itemsResumen inter-resumen">${pieza.id} ${pieza.nombre}${tejidoSeleccionado && tejidoSeleccionado !== 'None' ? ' / TEJIDO ' + tejidoSeleccionado : ''} &nbsp <span id="preciosMaterial">${obtenerPrecioPorMaterial(pieza.id, "SERIE 2").toFixed(2)}€</span></li>`
            )
            .join("") +
          "</ul>"
        : ""
    }
    ${lineasCojines}
    <li class="precioResumen inter-resumen">Precio Total: <span id="precioTotal"> &nbsp ${precioTotal.toFixed(2)}€ +IVA</span></li>
    <li class="itemsResumen inter-resumen" style="margin-top: 8px; color: #666;">*Portes no incluidos</li>
  `;

  actualizarPreciosEnDropdown();
  actualizarPreciosEnTejidos();
  verificarEstadoPDF(); // Verificar estado del botón PDF
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
  
  // Event listener para tejidos (recalcula precios al cambiar)
  const tejidosSelect = document.getElementById("tejidos");
  if (tejidosSelect) {
    tejidosSelect.addEventListener("change", function() {
      generarResumen();
      actualizarPreciosEnDropdown();
    });
  }

  // Inicializar resumen y precios
  generarResumen();
  actualizarPreciosEnDropdown();
  actualizarPreciosEnTejidos();

  console.log('🎯 Sistema inicializado: Configurador solo Piezas + Cojines');

});