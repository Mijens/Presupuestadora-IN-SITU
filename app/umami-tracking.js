// ============================================================================
// TRACKING UMAMI - CONFIGURADOR SOFÁ (SIMPLE + COMPLEJO)
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {

  // --------------------------------------------------------------------------
  // ELEMENTOS
  // --------------------------------------------------------------------------
  const selectPiezas = Array.from({ length: 8 }, (_, i) =>
    document.getElementById(`pieza${i + 1}`)
  );

  const selectTejido = document.getElementById('tejidos');
  const selectCojines = document.getElementById('cojines');
  const btnGenerarPdf = document.getElementById('generarPdfBtn');
  const inputNombreCliente = document.getElementById('nombreCliente');

  // --------------------------------------------------------------------------
  // UTILIDAD
  // --------------------------------------------------------------------------
  function umamiDisponible() {
    return typeof umami === 'object' && typeof umami.track === 'function';
  }

  // --------------------------------------------------------------------------
  // TRACK PIEZAS (EVENTOS SIMPLES)
  // --------------------------------------------------------------------------
  const estadoPiezas = {};

  selectPiezas.forEach((sel, index) => {
    if (!sel) return;

    const posicion = index + 1;

    sel.addEventListener('change', function () {
      if (!umamiDisponible()) return;

      const valor = this.value;

      if (!valor || valor === 'None') {
        estadoPiezas[posicion] = 'None';
        return;
      }

      if (estadoPiezas[posicion] === valor) return;
      estadoPiezas[posicion] = valor;

      const eventName = `PIEZA_${posicion}_${String(valor)}`;
      umami.track(eventName);

      console.log(`🧩 Umami → ${eventName}`);
    });
  });

  // --------------------------------------------------------------------------
  // TRACK TEJIDO (SIMPLE + CONFIG COMPLETA)
  // --------------------------------------------------------------------------
  let ultimoTejido = '';

  if (selectTejido) {
    selectTejido.addEventListener('change', function () {
      if (!umamiDisponible()) return;

      const tejido = this.value;
      if (!tejido || tejido === 'None') return;

      if (tejido !== ultimoTejido) {
        ultimoTejido = tejido;

        umami.track(`TEJIDO_${String(tejido)}`);
        console.log(`🧵 Umami → TEJIDO_${tejido}`);
      }

      // 👇 CLAVE: aquí se dispara CONFIG_COMPLETA (como antes)
      trackConfiguracionCompleta();
    });
  }

  // --------------------------------------------------------------------------
  // TRACK COJINES (SIMPLE)
  // --------------------------------------------------------------------------
  let ultimosCojines = null;

  if (selectCojines) {
    selectCojines.addEventListener('change', function () {
      if (!umamiDisponible()) return;

      const cantidad = Number(this.value);
      if (cantidad === ultimosCojines) return;

      ultimosCojines = cantidad;

      umami.track(`COJINES_${cantidad}`);
      console.log(`🛋️ Umami → COJINES_${cantidad}`);
    });
  }

  // --------------------------------------------------------------------------
  // CONFIG COMPLETA (EVENTO COMPLEJO)
  // --------------------------------------------------------------------------
  let ultimaConfiguracion = '';

  function trackConfiguracionCompleta() {
    if (!umamiDisponible()) return;

    const piezas = selectPiezas
      .map(sel => sel?.value)
      .filter(v => v && v !== 'None');

    const tejido = selectTejido?.value;
    const cojines = Number(selectCojines?.value || 0);

    if (piezas.length === 0 || !tejido || tejido === 'None') return;

    const precioTotal = calcularPrecioTotal();

    const configId = `${piezas.join('|')}_${tejido}_${cojines}_${precioTotal.toFixed(0)}`;

    if (configId === ultimaConfiguracion) return;
    ultimaConfiguracion = configId;

    umami.track('CONFIG_COMPLETA', {
      numPiezas: piezas.length,
      piezas: piezas.join(', '),
      tejido,
      cojines,
      precioTotal: Number(precioTotal.toFixed(2))
    });

    console.log('✅ Umami → CONFIG_COMPLETA');
  }

  // --------------------------------------------------------------------------
  // PDF GENERADO (EVENTO COMPLEJO)
  // --------------------------------------------------------------------------
  if (btnGenerarPdf) {
    btnGenerarPdf.addEventListener('click', function () {
      if (!umamiDisponible()) return;

      const nombreCliente = inputNombreCliente?.value?.trim() || 'Sin_nombre';
      const tejido = selectTejido?.value || 'None';
      const piezas = selectPiezas
        .map(sel => sel?.value)
        .filter(v => v && v !== 'None');

      if (piezas.length === 0 || tejido === 'None') return;

      const precioTotal = calcularPrecioTotal();

      umami.track('PDF_GENERADO', {
        nombreCliente,
        numPiezas: piezas.length,
        piezas: piezas.join(', '),
        tejido,
        cojines: Number(selectCojines?.value || 0),
        precioTotal: Number(precioTotal.toFixed(2))
      });

      console.log('📄 Umami → PDF_GENERADO');
    });
  }

  // --------------------------------------------------------------------------
  // VISITA
  // --------------------------------------------------------------------------
  if (umamiDisponible()) {
    umami.track('VISITA_CONFIGURADOR');
  }

  console.log('🎯 Umami tracking OK (simple + complejo)');
});
