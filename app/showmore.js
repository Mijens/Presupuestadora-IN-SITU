// =====================
// CONTROL DE VISIBILIDAD DE SELECTS
// =====================

document.addEventListener('DOMContentLoaded', function() {
  const btnShowPiezas = document.getElementById('showPiezas');
  
  if (!btnShowPiezas) {
    console.warn("⚠️ Botón 'showPiezas' no encontrado");
    return;
  }

  let currentVisibleSelects = 3; // Empezamos con 3 visibles
  const maxSelects = 8;

  btnShowPiezas.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (currentVisibleSelects >= maxSelects) {
      console.log("✅ Ya están todos los selects visibles");
      btnShowPiezas.style.display = 'none';
      return;
    }

    // Mostrar el siguiente select
    currentVisibleSelects++;
    const nextSelect = document.getElementById(`pieza${currentVisibleSelects}`);
    
    if (nextSelect) {
      nextSelect.classList.remove('hidden');
      console.log(`✅ Select pieza${currentVisibleSelects} ahora visible`);
    }

    // Ocultar botón si ya mostramos todos
    if (currentVisibleSelects >= maxSelects) {
      btnShowPiezas.style.display = 'none';
      console.log("✅ Todos los selects visibles, ocultando botón");
    }
  });

  console.log("🎯 showmore.js inicializado");
});
