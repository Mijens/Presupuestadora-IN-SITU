document.addEventListener("DOMContentLoaded", function () {
  const BASE_URL = "https://francokohler.github.io/SPresupuestadoraImg/TELAS/";

  // --- DOM ---
  const modeloSelect = document.getElementById("modelo");
  const serieSelect  = document.getElementById("tela");               // SERIE (mostrar siempre todas)
  const categorySelect = document.getElementById("categorySelect");   // CATEGORÍA
  const variantesSelect = document.getElementById("selectTelaContainer");
  const divReferencia = document.getElementById("telaReferencia");
  const telaDivH = document.querySelector(".tela-div-h");

  if (telaDivH) {
    telaDivH.classList.add("hidden");
    telaDivH.classList.remove("active");
    telaDivH.style.removeProperty("display");
  }

  // SERIES globales que SIEMPRE se muestran
  const SERIES_TODAS = ["SERIE 2", "SERIE 3", "SERIE 4", "SERIE 5"];

  // --- DATASET de telas ---
  const telas = {
    Burberry: [
      { img: "BURBERRY/BURBERRY01.svg", nombre: "BURBERRY01", id: "BURBERRY01" },
      { img: "BURBERRY/BURBERRY02.svg", nombre: "BURBERRY02", id: "BURBERRY02" },
      { img: "BURBERRY/BURBERRY03.svg", nombre: "BURBERRY03", id: "BURBERRY03" },
      { img: "BURBERRY/BURBERRY04.svg", nombre: "BURBERRY04", id: "BURBERRY04" },
      { img: "BURBERRY/BURBERRY05.svg", nombre: "BURBERRY05", id: "BURBERRY05" },
      { img: "BURBERRY/BURBERRY06.svg", nombre: "BURBERRY06", id: "BURBERRY06" },
      { img: "BURBERRY/BURBERRY08.svg", nombre: "BURBERRY08", id: "BURBERRY08" },
      { img: "BURBERRY/BURBERRY09.svg", nombre: "BURBERRY09", id: "BURBERRY09" },
      { img: "BURBERRY/BURBERRY12.svg", nombre: "BURBERRY12", id: "BURBERRY12" },
      { img: "BURBERRY/BURBERRY13.svg", nombre: "BURBERRY13", id: "BURBERRY13" },
    ],
    Capri: [
      { img: "CAPRI/CAPRI01.svg", nombre: "CAPRI01", id: "CAPRI01" },
      { img: "CAPRI/CAPRI04.svg", nombre: "CAPRI04", id: "CAPRI04" },
      { img: "CAPRI/CAPRI05.svg", nombre: "CAPRI05", id: "CAPRI05" },
      { img: "CAPRI/CAPRI06.svg", nombre: "CAPRI06", id: "CAPRI06" },
      { img: "CAPRI/CAPRI07.svg", nombre: "CAPRI07", id: "CAPRI07" },
      { img: "CAPRI/CAPRI08.svg", nombre: "CAPRI08", id: "CAPRI08" },
      { img: "CAPRI/CAPRI10.svg", nombre: "CAPRI10", id: "CAPRI10" },
      { img: "CAPRI/CAPRI12.svg", nombre: "CAPRI12", id: "CAPRI12" },
      { img: "CAPRI/CAPRI14.svg", nombre: "CAPRI14", id: "CAPRI14" },
      { img: "CAPRI/CAPRI18.svg", nombre: "CAPRI18", id: "CAPRI18" },
    ],
    Club: [
      { img: "CLUB/CLUB05.svg", nombre: "CLUB05", id: "CLUB05" },
      { img: "CLUB/CLUB07.svg", nombre: "CLUB07", id: "CLUB07" },
      { img: "CLUB/CLUB20.svg", nombre: "CLUB20", id: "CLUB20" },
      { img: "CLUB/CLUB51.svg", nombre: "CLUB51", id: "CLUB51" },
      { img: "CLUB/CLUB52.svg", nombre: "CLUB52", id: "CLUB52" },
      { img: "CLUB/CLUB54.svg", nombre: "CLUB54", id: "CLUB54" },
      { img: "CLUB/CLUB129.svg", nombre: "CLUB129", id: "CLUB129" },
      { img: "CLUB/CLUB132.svg", nombre: "CLUB132", id: "CLUB132" },
      { img: "CLUB/CLUB142.svg", nombre: "CLUB142", id: "CLUB142" },
      { img: "CLUB/CLUB171.svg", nombre: "CLUB171", id: "CLUB171" },
    ],
    Barbados: [
      { img: "BARBADOS/BARBADOS01.svg", nombre: "BARBADOS01", id: "BARBADOS01" },
      { img: "BARBADOS/BARBADOS02.svg", nombre: "BARBADOS02", id: "BARBADOS02" },
      { img: "BARBADOS/BARBADOS03.svg", nombre: "BARBADOS03", id: "BARBADOS03" },
      { img: "BARBADOS/BARBADOS05.svg", nombre: "BARBADOS05", id: "BARBADOS05" },
      { img: "BARBADOS/BARBADOS06.svg", nombre: "BARBADOS06", id: "BARBADOS06" },
      { img: "BARBADOS/BARBADOS08.svg", nombre: "BARBADOS08", id: "BARBADOS08" },
      { img: "BARBADOS/BARBADOS09.svg", nombre: "BARBADOS09", id: "BARBADOS09" },
      { img: "BARBADOS/BARBADOS10.svg", nombre: "BARBADOS10", id: "BARBADOS10" },
      { img: "BARBADOS/BARBADOS19.svg", nombre: "BARBADOS19", id: "BARBADOS19" },
      { img: "BARBADOS/BARBADOS20.svg", nombre: "BARBADOS20", id: "BARBADOS20" },
    ],
    Lino: [
      { img: "LINO/LINO008.svg", nombre: "LINO008", id: "LINO008" },
      { img: "LINO/LINO028.svg", nombre: "LINO028", id: "LINO028" },
      { img: "LINO/LINO122.svg", nombre: "LINO122", id: "LINO122" },
      { img: "LINO/LINO124.svg", nombre: "LINO124", id: "LINO124" },
      { img: "LINO/LINO125.svg", nombre: "LINO125", id: "LINO125" },
      { img: "LINO/LINO126.svg", nombre: "LINO126", id: "LINO126" },
      { img: "LINO/LINO127.svg", nombre: "LINO127", id: "LINO127" },
      { img: "LINO/LINO142.svg", nombre: "LINO142", id: "LINO142" },
      { img: "LINO/LINO542.svg", nombre: "LINO542", id: "LINO542" },
      { img: "LINO/LINO638.svg", nombre: "LINO638", id: "LINO638" },
    ],
    Mystic: [
      { img: "MYSTIC/MYSTIC03.svg", nombre: "MYSTIC03", id: "MYSTIC03" },
      { img: "MYSTIC/MYSTIC12.svg", nombre: "MYSTIC12", id: "MYSTIC12" },
      { img: "MYSTIC/MYSTIC69.svg", nombre: "MYSTIC69", id: "MYSTIC69" },
      { img: "MYSTIC/MYSTIC177.svg", nombre: "MYSTIC177", id: "MYSTIC177" },
      { img: "MYSTIC/MYSTIC252.svg", nombre: "MYSTIC252", id: "MYSTIC252" },
      { img: "MYSTIC/MYSTIC324.svg", nombre: "MYSTIC324", id: "MYSTIC324" },
      { img: "MYSTIC/MYSTIC546.svg", nombre: "MYSTIC546", id: "MYSTIC546" },
      { img: "MYSTIC/MYSTIC551.svg", nombre: "MYSTIC551", id: "MYSTIC551" },
      { img: "MYSTIC/MYSTIC559.svg", nombre: "MYSTIC559", id: "MYSTIC559" },
      { img: "MYSTIC/MYSTIC603.svg", nombre: "MYSTIC603", id: "MYSTIC603" },
    ],
     Osaka : [
      { img: "OSAKA/OSAKA01.svg", nombre: "OSAKA01", id: "OSAKA01" },
      { img: "OSAKA/OSAKA03.svg", nombre: "OSAKA03", id: "OSAKA03" },
      { img: "OSAKA/OSAKA04.svg", nombre: "OSAKA04", id: "OSAKA04" },
      { img: "OSAKA/OSAKA05.svg", nombre: "OSAKA05", id: "OSAKA05" },
      { img: "OSAKA/OSAKA06.svg", nombre: "OSAKA06", id: "OSAKA06" },
      { img: "OSAKA/OSAKA07.svg", nombre: "OSAKA07", id: "OSAKA07" },
      { img: "OSAKA/OSAKA08.svg", nombre: "OSAKA08", id: "OSAKA08" },
      { img: "OSAKA/OSAKA09.svg", nombre: "OSAKA09", id: "OSAKA09" },
      { img: "OSAKA/OSAKA10.svg", nombre: "OSAKA10", id: "OSAKA10" },
      { img: "OSAKA/OSAKA17.svg", nombre: "OSAKA17", id: "OSAKA17" },
    ]
    
  };

  // --- MAPA Modelo → Serie → Categorías (respeta tu lista) ---
  const modeloSerieCategorias = {
    Aura:   { "SERIE 3": ["Barbados", "Lino", "Mystic"] },
    Bianca: { "SERIE 2": ["Capri"], "SERIE 3": ["Burberry"], "SERIE 4": ["Club"] },
    Nora:   { "SERIE 2": ["Capri"], "SERIE 3": ["Burberry"], "SERIE 4": ["Club"] },
    Luna:   { "SERIE 2": ["Capri"], "SERIE 3": ["Burberry", "Mystic"] },
    Vera:   { "SERIE 2": ["Capri", "Osaka"], "SERIE 4": ["Club"] },
    Dafne:  { "SERIE 2": ["Capri"], "SERIE 3": ["Burberry", "Mystic"] },
  };
  const displayName = (cat) => (cat === "Lino" ? "LINO LINO" : cat.toUpperCase());

  // Normaliza "SERIE 02" → "SERIE 2"
  function normalizarSerie(raw) {
    if (!raw) return raw;
    const m = raw.match(/^\s*SERIE\s*0?(\d)\s*$/i);
    return m ? `SERIE ${m[1]}` : raw.toUpperCase().trim();
  }

  function toggleTelaBlock(show) {
    if (!telaDivH) return;
    if (show) {
      telaDivH.classList.add("active");
      telaDivH.classList.remove("hidden");
      telaDivH.style.removeProperty("display");
    } else {
      telaDivH.classList.remove("active");
      telaDivH.classList.add("hidden");
      categorySelect.innerHTML = "";
      variantesSelect.innerHTML = "";
      if (divReferencia) divReferencia.innerHTML = "";
    }
  }

  function actualizarImg() {
    const cat = categorySelect.value;
    const variante = variantesSelect.value;
    if (!cat || !variante) return;

    const lista = telas[cat] || [];
    const item = lista.find(x => x.nombre === variante);
    if (!divReferencia) return;
    divReferencia.innerHTML = "";

    if (item) {
      const img = document.createElement("img");
      img.src = BASE_URL + item.img;
      img.alt = item.nombre;
      img.classList.add("img-tela");
      divReferencia.appendChild(img);
    }
  }

  function poblarVariantes(cat) {
    variantesSelect.innerHTML = "";
    if (divReferencia) divReferencia.innerHTML = "";

    const lista = telas[cat] || [];
    if (!lista.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "Sin muestras disponibles";
      opt.disabled = true;
      opt.selected = true;
      variantesSelect.appendChild(opt);
      return;
    }

    lista.forEach(t => {
      const o = document.createElement("option");
      o.value = t.nombre;
      o.textContent = t.nombre;
      variantesSelect.appendChild(o);
    });

    variantesSelect.value = lista[0].nombre;
    actualizarImg();
  }

  // --- CLAVE: aplicar modelo + serie; si la serie no existe para el modelo → ocultar telas
  function aplicarModeloSerie() {
    const modelo = modeloSelect.value;
    const serie  = normalizarSerie(serieSelect.value);

    const seriesMap = modeloSerieCategorias[modelo] || {};
    const categorias = seriesMap[serie] || [];

    if (!categorias.length) {
      // Serie seleccionada NO está disponible para este modelo
      toggleTelaBlock(false);
      return;
    }

    // Serie válida → mostrar bloque y poblar solo las categorías permitidas
    toggleTelaBlock(true);

    categorySelect.innerHTML = "";
    categorias.forEach(cat => {
      const o = document.createElement("option");
      o.value = cat;
      o.textContent = displayName(cat);
      categorySelect.appendChild(o);
    });

    categorySelect.value = categorias[0];
    poblarVariantes(categorySelect.value);
  }

  // --- NUEVO: inicializa el select de SERIES una sola vez con TODAS las series ---
  function initSeriesGlobal() {
    // Si ya hay opciones y contienen "SERIE 2", asumimos que está inicializado
    if ([...serieSelect.options].some(o => normalizarSerie(o.value) === "SERIE 2")) return;

    serieSelect.innerHTML = "";
    // (Opcional) placeholder
    const ph = document.createElement("option");
    ph.value = "";
    ph.textContent = "Selecciona una serie";
    ph.disabled = true;
    ph.selected = true;
    serieSelect.appendChild(ph);

    SERIES_TODAS.forEach(s => {
      const o = document.createElement("option");
      o.value = s;
      o.textContent = s;
      serieSelect.appendChild(o);
    });
  }

  // --- Antes onModeloChange rellenaba series; ahora NO. Solo recalcula telas según la serie elegida.
  function onModeloChange() {
    aplicarModeloSerie(); // respeta la serie actual; si no es válida para el modelo → oculta telas
  }

  // Eventos
  modeloSelect.addEventListener("change", onModeloChange);
  serieSelect.addEventListener("change", aplicarModeloSerie);
  categorySelect.addEventListener("change", () => poblarVariantes(categorySelect.value));
  variantesSelect.addEventListener("change", actualizarImg);

  // Init
  initSeriesGlobal();      // ← SIEMPRE muestra SERIE 2/3/4
  toggleTelaBlock(false);  // empieza oculto hasta que la combinación sea válida
  // Si quieres arrancar mostrando algo por defecto cuando el modelo tiene SERIE 2:
  // serieSelect.value = "SERIE 2"; aplicarModeloSerie();
});