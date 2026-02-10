// ============================================================================
// TRACKING UMAMI - CONFIGURADOR SINGULAR (OPTIMIZADO)
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Selectores de elementos
  const selectPiezas = Array.from({ length: 8 }, (_, i) => document.getElementById(`pieza${i+1}`));
  const selectTejido = document.getElementById('tejidos');
  const selectCojines = document.getElementById('cojines');
  const btnGenerarPdf = document.getElementById('generarPdfBtn');
  const inputNombreCliente = document.getElementById('nombreCliente');

  // Verificar si Umami está disponible
  function umamiDisponible() {
    if (typeof umami !== 'object' || typeof umami.track !== 'function') {
      console.warn('⚠️ Umami.track no está disponible');
      return false;
    }
    return true;
  }

  // ============================================================================
  // TRACK PIEZAS - Trackear cada pieza para análisis de popularidad
  // ============================================================================
  selectPiezas.forEach((sel, index) => {
    if (sel) {
      sel.addEventListener('change', function() {
        if (umamiDisponible() && this.value && this.value !== 'None') {
          // Trackear qué pieza se seleccionó (útil para análisis de módulos populares)
          umami.track(`PIEZA_${index + 1}_${String(this.value)}`);
          console.log(`✅ Umami: Pieza ${index + 1} → ${this.value}`);
        }
      });
    }
  });

  // ============================================================================
  // TRACK TEJIDO - AQUÍ se trackea la configuración completa
  // ============================================================================
  let ultimoTejido = '';
  if (selectTejido) {
    selectTejido.addEventListener('change', function() {
      if (umamiDisponible() && this.value && this.value !== 'None') {
        
        // Trackear tejido individual
        if (this.value !== ultimoTejido) {
          ultimoTejido = this.value;
          umami.track(`TEJIDO_${String(this.value)}`);
          console.log(`✅ Umami: Tejido → ${this.value}`);
        }
        
        // TRACKEAR CONFIGURACIÓN COMPLETA (el usuario ya terminó de configurar)
        trackConfiguracionCompleta();
      }
    });
  }

  // ============================================================================
  // TRACK COJINES - Solo trackear cantidad
  // ============================================================================
  let ultimosCojines = 0;
  if (selectCojines) {
    selectCojines.addEventListener('change', function() {
      if (umamiDisponible()) {
        const cantidad = Number(this.value);
        if (cantidad > 0 && cantidad !== ultimosCojines) {
          ultimosCojines = cantidad;
          umami.track(`COJINES_${cantidad}`);
          console.log(`✅ Umami: Cojines → ${cantidad}`);
        }
      }
    });
  }

  // ============================================================================
  // TRACK GENERACIÓN DE PDF - El evento más importante
  // ============================================================================
  if (btnGenerarPdf) {
    btnGenerarPdf.addEventListener('click', function() {
      if (umamiDisponible()) {
        const nombreCliente = inputNombreCliente?.value?.trim() || 'Sin_nombre';
        const tejido = selectTejido?.value || 'None';
        const piezas = obtenerPiezasSeleccionadas();
        
        // Solo trackear si cumple las validaciones
        if (nombreCliente && tejido !== 'None' && piezas.length > 0) {
          const precioTotal = calcularPrecioTotal();
          
          // Evento PDF generado con toda la info importante
          umami.track('PDF_GENERADO', {
            nombreCliente: String(nombreCliente),
            numPiezas: Number(piezas.length),
            piezas: piezas.map(p => p.id).join(', '),
            tejido: String(tejido),
            cojines: Number(selectCojines?.value || 0),
            precioTotal: Number(precioTotal.toFixed(2))
          });
          
          console.log('✅ Umami: PDF generado para', nombreCliente, '- Precio:', precioTotal.toFixed(2));
        }
      }
    });
  }

  // ============================================================================
  // CALCULAR PRECIO TOTAL (función auxiliar)
  // ============================================================================
  function calcularPrecioTotal() {
    const piezasSeleccionadas = obtenerPiezasSeleccionadas();
    const piezasFiltradas = piezasSeleccionadas.filter((pieza) => pieza.id !== "None");
    
    // Calcular precio de piezas
    const precioPiezas = piezasFiltradas.reduce((total, pieza) => {
      const precioPieza = obtenerPrecioPorMaterial(pieza.id, "SERIE 2");
      return total + precioPieza;
    }, 0);
    
    // Calcular precio de cojines
    const cantidadCojines = parseInt(selectCojines?.value) || 0;
    let precioCojines = 0;
    if (cantidadCojines > 0) {
      const tejidoSeleccionado = selectTejido?.value || "None";
      const precioUnitarioCojin = preciosCojinesPorTejido[tejidoSeleccionado] || 0;
      const multiplicador = obtenerMultiplicadorTarifa();
      precioCojines = (precioUnitarioCojin * multiplicador) * cantidadCojines;
    }
    
    return precioPiezas + precioCojines;
  }

  // ============================================================================
  // TRACK CONFIGURACIÓN COMPLETA - Solo cuando selecciona tejido
  // ============================================================================
  let ultimaConfiguracion = '';

  function trackConfiguracionCompleta() {
    if (!umamiDisponible()) return;

    const piezas = selectPiezas
      .map(sel => sel?.value)
      .filter(val => val && val !== 'None');
    
    const tejidoSeleccionado = selectTejido?.value || '';
    const cantidadCojines = parseInt(selectCojines?.value) || 0;

    // SOLO trackear si hay piezas Y tejido seleccionado
    if (piezas.length === 0 || !tejidoSeleccionado || tejidoSeleccionado === 'None') {
      return;
    }

    const precioTotal = calcularPrecioTotal();

    // Construir identificador único de la configuración
    const configId = `${piezas.length}_${tejidoSeleccionado}_${cantidadCojines}_${precioTotal.toFixed(0)}`;

    // Evitar duplicados
    if (configId === ultimaConfiguracion) {
      console.log('⏭️ Umami: Configuración duplicada, no se trackea');
      return;
    }
    ultimaConfiguracion = configId;

    // Trackear configuración completa
    const eventData = {
      numPiezas: Number(piezas.length),
      piezas: piezas.join(', '),
      tejido: String(tejidoSeleccionado),
      cojines: Number(cantidadCojines),
      precioTotal: Number(precioTotal.toFixed(2))
    };

    const nombreEvento = `CONFIG_COMPLETA_${piezas.length}pzs_${tejidoSeleccionado}_${precioTotal.toFixed(0)}€`;

    console.log('✅ Umami: Configuración completa (usuario terminó)', eventData);
    umami.track(nombreEvento, eventData);
  }

  // ============================================================================
  // TRACK VISITA INICIAL
  // ============================================================================
  if (umamiDisponible()) {
    umami.track('VISITA_CONFIGURADOR');
    console.log('✅ Umami: Visita al configurador registrada');
  }

  console.log('🎯 Umami Tracking inicializado correctamente (modo optimizado)');
});