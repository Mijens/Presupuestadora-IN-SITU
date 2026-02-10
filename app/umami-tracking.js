// ============================================================================
// TRACKING UMAMI - CONFIGURADOR SINGULAR
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
  // TRACK PIEZAS (Módulos seleccionados)
  // ============================================================================
  selectPiezas.forEach((sel, index) => {
    if (sel) {
      sel.addEventListener('change', function() {
        if (umamiDisponible() && this.value && this.value !== 'None') {
          umami.track(`PIEZA_${index + 1}_${String(this.value)}`);
          console.log(`✅ Umami: Pieza ${index + 1} → ${this.value}`);
          
          // Trackear configuración completa después de un momento
          setTimeout(trackConfiguracionCompleta, 800);
        }
      });
    }
  });

  // ============================================================================
  // TRACK TEJIDO
  // ============================================================================
  if (selectTejido) {
    selectTejido.addEventListener('change', function() {
      if (umamiDisponible() && this.value) {
        umami.track(`TEJIDO_${String(this.value)}`);
        console.log(`✅ Umami: Tejido → ${this.value}`);
        
        // Si hay tejido seleccionado, trackear precio
        if (this.value !== 'None') {
          const piezasSeleccionadas = obtenerPiezasSeleccionadas();
          if (piezasSeleccionadas.length > 0) {
            const precioTotal = calcularPrecioTotal();
            umami.track(`PRECIO_TOTAL_${Number(precioTotal.toFixed(2))}`);
            console.log(`✅ Umami: Precio total → ${precioTotal.toFixed(2)}€`);
          }
        }
        
        setTimeout(trackConfiguracionCompleta, 800);
      }
    });
  }

  // ============================================================================
  // TRACK COJINES
  // ============================================================================
  if (selectCojines) {
    selectCojines.addEventListener('change', function() {
      if (umamiDisponible()) {
        const cantidad = Number(this.value);
        umami.track(`COJINES_${cantidad}`);
        console.log(`✅ Umami: Cojines → ${cantidad}`);
        
        setTimeout(trackConfiguracionCompleta, 800);
      }
    });
  }

  // ============================================================================
  // TRACK GENERACIÓN DE PDF
  // ============================================================================
  if (btnGenerarPdf) {
    btnGenerarPdf.addEventListener('click', function() {
      if (umamiDisponible()) {
        const nombreCliente = inputNombreCliente?.value?.trim() || 'Sin_nombre';
        const tejido = selectTejido?.value || 'None';
        const piezas = obtenerPiezasSeleccionadas();
        
        // Solo trackear si cumple las validaciones
        if (nombreCliente && tejido !== 'None' && piezas.length > 0) {
          // Trackear PDF generado con nombre de cliente
          umami.track('PDF_GENERADO', {
            nombreCliente: String(nombreCliente)
          });
          console.log('✅ Umami: PDF generado para', nombreCliente);
          
          // Trackear configuración final con la que se generó el PDF
          setTimeout(() => {
            trackConfiguracionCompleta(true, nombreCliente);
          }, 500);
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
  // TRACK CONFIGURACIÓN COMPLETA
  // ============================================================================
  let ultimaConfiguracion = '';

  function trackConfiguracionCompleta(esPDF = false, nombreCliente = null) {
    if (!umamiDisponible()) return;

    const piezas = selectPiezas
      .map(sel => sel?.value)
      .filter(val => val && val !== 'None');
    
    const tejidoSeleccionado = selectTejido?.value || '';
    const cantidadCojines = parseInt(selectCojines?.value) || 0;

    // Solo trackear si hay al menos una pieza seleccionada
    if (piezas.length === 0) return;

    const precioTotal = calcularPrecioTotal();

    // Construir nombre del evento
    const partes = [`Piezas_${piezas.length}`];
    
    if (tejidoSeleccionado && tejidoSeleccionado !== 'None') {
      partes.push(`Tejido_${tejidoSeleccionado}`);
    }
    
    if (cantidadCojines > 0) {
      partes.push(`Cojines_${cantidadCojines}`);
    }
    
    if (precioTotal > 0) {
      partes.push(`Precio_${precioTotal.toFixed(0)}`);
    }

    const prefijo = esPDF ? 'PDF_CONFIG' : 'CONFIG_COMPLETA';
    const nombreEvento = `${prefijo}_${partes.join('_')}`;

    // Evitar duplicados (excepto si es PDF)
    if (!esPDF && nombreEvento === ultimaConfiguracion) {
      console.log('⏭️ Umami: Configuración duplicada, no se trackea');
      return;
    }
    ultimaConfiguracion = nombreEvento;

    // Preparar datos del evento
    const eventData = {
      numPiezas: Number(piezas.length),
      piezas: piezas.join(', '),
      tejido: String(tejidoSeleccionado),
      cojines: Number(cantidadCojines),
      precioTotal: Number(precioTotal.toFixed(2))
    };

    // Agregar nombre de cliente solo si se proporciona (al generar PDF)
    if (nombreCliente) {
      eventData.nombreCliente = String(nombreCliente);
    }

    console.log('✅ Umami: Configuración completa', eventData);

    umami.track(nombreEvento, eventData);
  }

  // ============================================================================
  // TRACK VISITA INICIAL
  // ============================================================================
  if (umamiDisponible()) {
    umami.track('VISITA_CONFIGURADOR');
    console.log('✅ Umami: Visita al configurador registrada');
  }

  console.log('🎯 Umami Tracking inicializado correctamente');
});
