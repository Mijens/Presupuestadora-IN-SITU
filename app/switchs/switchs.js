document.addEventListener("DOMContentLoaded", function () {
  const modeloSelect = document.getElementById("modelo");
 /*  const telaDropdown = document.getElementById("tela");
  const categorySelect = document.getElementById("categorySelect");
  const teladiv = document.getElementById("telaDiv");
 */
  const coleccionPiezas = {
    Aura: piezasAura,
    Bianca: piezasBianca,
    Luna: piezasLuna,
    Nora: piezasNora,
    Vera: piezasVera,
    Dafne: piezasDafne,
    Olivia: piezasOlivia,
  };
  function esIzquierda(p) {
    return /\bizq/i.test(p.title) || /\bizquierd/i.test(p.title) || /I$/i.test(p.id);
  }
  function esDerecha(p) {
    return /\bder/i.test(p.title) || /\bderech/i.test(p.title) || /D$/i.test(p.id);
  }
  function ordenarPorLado(a, b) {
    const aI = esIzquierda(a), bI = esIzquierda(b);
    const aD = esDerecha(a),  bD = esDerecha(b);

    if (aI && !bI) return -1;
    if (!aI && bI) return 1;

    if (aD && !bD) return 1;
    if (!aD && bD) return -1;

    // opcional: ordenar por medida si la tienen
    if (typeof a.medida === "number" && typeof b.medida === "number") {
      return b.medida - a.medida; // mayor a menor
    }
    return 0;
  }



  function actualizarPiezasDropdown(piezas) {
    const categorias = [...new Set(piezas.map((p) => p.categoria))];
    for (let i = 1; i <= 8; i++) {
      const dropdown = document.getElementById(`pieza${i}`);
      dropdown.innerHTML = "";
      categorias.forEach((categoria) => {
        const optgroup = document.createElement("optgroup");
        optgroup.label = categoria?.toUpperCase() || "";

        piezas
          .filter((p) => p.categoria === categoria)
          .slice()                      // copia
          .sort(ordenarPorLado)          // ← AQUI ordena IZQ primero
          .forEach((pieza) => {
            const option = document.createElement("option");
            option.value = pieza.id;
            option.textContent = pieza.title.toUpperCase();
            option.dataset.price = JSON.stringify(pieza.price);
            option.dataset.imageUrl = pieza.imageUrl;
            optgroup.appendChild(option);
          });

        dropdown.appendChild(optgroup);
      });
    }
  }
  

  /* function actualizarTelaDropdown(materiales) {
    telaDropdown.innerHTML = "";
    materiales.forEach((material) => {
      const option = document.createElement("option");
      option.value = material;
      option.textContent = material;
      telaDropdown.appendChild(option);
    });
  } */
/* 
  function manejarCambioTela() {
    const serieSeleccionada = telaDropdown.value;
    teladiv.style.display = serieSeleccionada === "SERIE 5" ? "none" : "block";

    categorySelect.innerHTML =
      '<option value="">Selecciona una categoría</option>';
    if (categoriasPorSerie[serieSeleccionada]) {
      categoriasPorSerie[serieSeleccionada].forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat.toUpperCase();
        categorySelect.appendChild(option);
      });
    }
  } */

 
  function actualizarVistaModelo() {
    const modeloSeleccionado = modeloSelect.value;
    const piezas = coleccionPiezas[modeloSeleccionado] || [];
    actualizarPiezasDropdown(piezas);
    mostrarImagenes();
    generarResumen();
  }

  // Eventos
  modeloSelect.addEventListener("change", actualizarVistaModelo);
/*   telaDropdown.addEventListener("change", manejarCambioTela); */

  // Inicialización
  actualizarVistaModelo();
});
