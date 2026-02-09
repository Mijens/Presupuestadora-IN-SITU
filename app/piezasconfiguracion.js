// =====================
// PIEZAS CON ROTACIÓN CORREGIDA Y COTAS MEJORADAS
// =====================
const todasPiezas = [
  { 
    id: "MOD110", 
    title: "MÓDULO 110 CM", 
    medida: 110, 
    medidap: 90, 
    precio: 600,
    img: "./INSITUPresupuestadoraImg/PIEZAS/MOD110.png",
    width: 110,
    height: 90
  },
  { 
    id: "MOD100", 
    title: "MÓDULO 100 CM", 
    medida: 100, 
    medidap: 90, 
    precio: 600,
    img: "./INSITUPresupuestadoraImg/PIEZAS/MOD100.png",
    width: 100,
    height: 90
  },
  { 
    id: "MOD90", 
    title: "MÓDULO 90 CM", 
    medida: 90, 
    medidap: 90, 
    precio: 600,
    img: "./INSITUPresupuestadoraImg/PIEZAS/MOD90.png",
    width: 90,
    height: 90
  },
  { 
    id: "MOD80", 
    title: "MÓDULO 80 CM", 
    medida: 80, 
    medidap: 90, 
    precio: 600,
    img: "./INSITUPresupuestadoraImg/PIEZAS/MOD80.png",
    width: 80,
    height: 90
  },
  { 
    id: "MODR", 
    title: "RINCÓN 90x90 CM", 
    medida: 90, 
    medidap: 90, 
    precio: 600,
    img: "./INSITUPresupuestadoraImg/PIEZAS/MODR.png",
    width: 90,
    height: 90
  },
];

const specialPieces = ["MODR"];

// =====================
// LLENAR SELECTS CON OPTGROUPS
// =====================
function llenarSelects() {
  for (let i = 1; i <= 8; i++) {
    const select = document.getElementById(`pieza${i}`);
    if (!select) continue;
    
    select.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = 'None';
    defaultOption.textContent = 'Sin pieza seleccionada';
    select.appendChild(defaultOption);
    
    const optgroupModulos = document.createElement('optgroup');
    optgroupModulos.label = 'MÓDULOS';
    
    todasPiezas
      .filter(p => p.id.startsWith('MOD') && p.id !== 'MODR')
      .forEach(pieza => {
        const option = document.createElement('option');
        option.value = pieza.id;
        option.textContent = pieza.title;
        optgroupModulos.appendChild(option);
      });
    
    select.appendChild(optgroupModulos);
    
    const optgroupRincon = document.createElement('optgroup');
    optgroupRincon.label = 'RINCÓN';
    
    todasPiezas
      .filter(p => p.id === 'MODR')
      .forEach(pieza => {
        const option = document.createElement('option');
        option.value = pieza.id;
        option.textContent = pieza.title;
        optgroupRincon.appendChild(option);
      });
    
    select.appendChild(optgroupRincon);
  }
  
  console.log("✅ Selects llenados con optgroups");
}

// =====================
// ASEGURAR ELEMENTOS DE COTAS
// =====================
function ensureCotasElements(container) {
  const ids = ["lineaAncho", "lineaProfundidad", "ancho", "profundidad"];
  ids.forEach(id => {
    if (!container.querySelector(`#${id}`)) {
      const el = id === "ancho" || id === "profundidad"
        ? document.createElement("p")
        : document.createElement("div");
      el.id = id;
      container.appendChild(el);
    }
  });
}

// =====================
// POSICIONAR COTAS - VERSIÓN FUNCIONANDO
// =====================
function posicionarCotas(container, ancho, profundidad) {
  const imgs = container.querySelectorAll(".img-config");
  
  const lineaAncho = container.querySelector("#lineaAncho");
  const lineaProf = container.querySelector("#lineaProfundidad");
  const txtAncho = container.querySelector("#ancho");
  const txtProf = container.querySelector("#profundidad");
  
  if (!imgs.length) {
    if (lineaAncho) lineaAncho.style.display = "none";
    if (lineaProf) lineaProf.style.display = "none";
    if (txtAncho) txtAncho.style.display = "none";
    if (txtProf) txtProf.style.display = "none";
    return;
  }
  
  const rect = container.getBoundingClientRect();
  let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
  
  imgs.forEach(img => {
    const r = img.getBoundingClientRect();
    left = Math.min(left, r.left - rect.left);
    right = Math.max(right, r.right - rect.left);
    top = Math.min(top, r.top - rect.top);
    bottom = Math.max(bottom, r.bottom - rect.top);
  });
  
  console.log(`📐 Bounding box: top=${top}, bottom=${bottom}, left=${left}, right=${right}`);
  
  // Ajustar GAP según el tamaño de pantalla
  const isMobile = window.innerWidth <= 768;
  const GAP = isMobile ? 15 : 20;
  const lineaTop = top - GAP;
  const textoTop = lineaTop - (isMobile ? 20 : 25);
  
  console.log(`📏 Línea en: ${lineaTop}px, Texto en: ${textoTop}px, Mobile: ${isMobile}`);
  
  // Línea horizontal superior
  if (lineaAncho) {
    lineaAncho.style.cssText = `
      position: absolute;
      top: ${lineaTop}px;
      left: ${left}px;
      width: ${right - left}px;
      height: 1px;
      background: black;
      display: block;
      z-index: 10;
    `;
  }
  
  // Línea vertical derecha
  if (lineaProf) {
    lineaProf.style.cssText = `
      position: absolute;
      top: ${top}px;
      left: ${right + GAP}px;
      width: 1px;
      height: ${bottom - top}px;
      background: black;
      display: block;
      z-index: 10;
    `;
  }
  
  // Texto ancho (ARRIBA de la línea)
  if (txtAncho) {
    txtAncho.textContent = `${ancho} cm`;
    txtAncho.style.cssText = `
      position: absolute;
      top: ${textoTop}px;
      left: ${left + (right - left) / 2}px;
      transform: translateX(-50%);
      font-weight: 600;
      font-size: ${isMobile ? '11px' : '14px'};
      color: black;
      display: block;
      z-index: 10;
      background: white;
      padding: 2px 5px;
      margin: 0;
    `;
  }
  
  // Texto profundidad (centrado verticalmente)
  if (txtProf) {
    txtProf.textContent = `${profundidad} cm`;
    const centroVertical = top + (bottom - top) / 2;
    txtProf.style.cssText = `
      position: absolute;
      top: ${centroVertical}px;
      left: ${right + GAP + 10}px;
      transform: translateY(-50%);
      font-weight: 600;
      font-size: ${isMobile ? '11px' : '14px'};
      color: black;
      display: block;
      z-index: 10;
      background: white;
      padding: 2px 5px;
      margin: 0;
    `;
  }
}

// =====================
// MOSTRAR IMÁGENES CON RESPONSIVE
// =====================
function mostrarImagenes() {
  const imagenesDiv = document.getElementById("imagenPiezas");
  if (!imagenesDiv) {
    console.error("❌ No se encontró el contenedor 'imagenPiezas'");
    return;
  }
  
  Array.from(imagenesDiv.querySelectorAll(".img-config")).forEach(el => el.remove());
  
  imagenesDiv.style.position = "relative";
  imagenesDiv.style.minHeight = "150px"; // Altura mínima reducida
  ensureCotasElements(imagenesDiv);

  const slots = obtenerPiezasPorSlot();
  console.log("📦 Slots obtenidos:", slots);

  // Si no hay piezas, reducir altura al mínimo
  const hayPiezas = slots.some(slot => slot && slot.id !== "None");
  if (!hayPiezas) {
    imagenesDiv.style.height = "150px";
    return;
  }

  // Factor de escala según ancho de pantalla
  const screenWidth = window.innerWidth;
  let scaleFactor = 1;
  if (screenWidth <= 360) {
    scaleFactor = 0.5;
  } else if (screenWidth <= 480) {
    scaleFactor = 0.6;
  } else if (screenWidth <= 768) {
    scaleFactor = 0.75;
  }

  const OFFSET_TOP = 5; // Valor pequeño para pantalla normal
  const OFFSET_LEFT = 15;
  let currentX = OFFSET_LEFT;
  let currentY = OFFSET_TOP;
  let rotateAfterRincon = false;
  let rinconEncontrado = false;
  let rinconInfo = { x: 0, y: 0, width: 0, height: 0 };
  
  let totalMedidaAncho = 0;
  let totalMedidaProfundidad = 0;
  let maxProfundidadNormal = 0;
  
  // Variables para calcular altura necesaria
  let maxY = 0;
  
  const promises = [];

  slots.forEach((slot, index) => {
    if (!slot || slot.id === "None") return;

    const piezaSeleccionada = todasPiezas.find(p => p.id === slot.id);
    if (!piezaSeleccionada) {
      console.error(`❌ No se encontró pieza para ID: ${slot.id}`);
      return;
    }

    const piezaId = piezaSeleccionada.id;
    const medida = piezaSeleccionada.medida || 0;
    const medidap = piezaSeleccionada.medidap || 0;
    const imageUrl = piezaSeleccionada.img;

    // Aplicar factor de escala a las dimensiones
    const finalWidth = (piezaSeleccionada.width || medida) * scaleFactor;
    const finalHeight = (piezaSeleccionada.height || medidap) * scaleFactor;

    if (imageUrl && piezaId !== "None") {
      const imgElement = document.createElement("img");
      imgElement.dataset.piezaId = piezaId;
      imgElement.dataset.rotation = "0";
      imgElement.src = imageUrl;
      imgElement.alt = piezaSeleccionada.title;
      imgElement.classList.add("img-config");
      imgElement.style.position = "absolute";
      imgElement.style.width = `${finalWidth}px`;
      imgElement.style.height = `${finalHeight}px`;
      imgElement.style.maxWidth = "none";
      imgElement.style.boxSizing = "border-box";
      imgElement.style.objectFit = "contain";
      imgElement.style.border = "1px solid #ccc";

      const esRincon = specialPieces.includes(piezaId);

      if (esRincon && !rinconEncontrado) {
        rinconEncontrado = true;
        rotateAfterRincon = true;
        
        rinconInfo.x = currentX;
        rinconInfo.y = currentY;
        rinconInfo.width = finalWidth;
        rinconInfo.height = finalHeight;

        imgElement.style.left = `${rinconInfo.x}px`;
        imgElement.style.top = `${rinconInfo.y}px`;

        currentX = rinconInfo.x + finalWidth;
        currentY = rinconInfo.y + finalHeight;
        
        // Actualizar maxY
        maxY = Math.max(maxY, currentY);

        totalMedidaAncho += medida;
        totalMedidaProfundidad = medidap;

      } else if (rotateAfterRincon) {
        imgElement.style.transform = "rotate(90deg)";
        imgElement.style.transformOrigin = "top left";
        imgElement.dataset.rotation = "90";
        
        const posX = rinconInfo.x + rinconInfo.width;
        const posY = currentY;
        
        imgElement.style.left = `${posX}px`;
        imgElement.style.top = `${posY}px`;

        currentY += finalWidth;
        
        // Actualizar maxY
        maxY = Math.max(maxY, currentY);
        
        totalMedidaProfundidad += medida;

      } else {
        imgElement.style.left = `${currentX}px`;
        imgElement.style.top = `${currentY}px`;
        currentX += finalWidth;
        
        // Actualizar maxY
        maxY = Math.max(maxY, currentY + finalHeight);
        
        totalMedidaAncho += medida;
        maxProfundidadNormal = Math.max(maxProfundidadNormal, medidap);
      }

      imagenesDiv.appendChild(imgElement);
      
      imgElement.onload = function() {
        console.log(`✅ Imagen cargada: ${piezaSeleccionada.title}`);
      };

      imgElement.onerror = function() {
        console.error(`❌ ERROR cargando: ${imageUrl}`);
        const fallback = document.createElement("div");
        fallback.className = "img-config fallback";
        fallback.style.cssText = imgElement.style.cssText + `
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #666;
          transform: none;
        `;
        fallback.innerHTML = `<div style="text-align:center;"><div>${piezaSeleccionada.title}</div><div style="font-size:10px;color:#999;margin-top:5px;">Imagen no encontrada</div></div>`;
        imgElement.replaceWith(fallback);
      };

      promises.push(new Promise((resolve) => { 
        imgElement.onload = resolve; 
        imgElement.onerror = resolve;
      }));
    }
  });

  Promise.all(promises).then(() => {
    const anchoFinal = totalMedidaAncho;
    const profundidadFinal = rinconEncontrado 
      ? totalMedidaProfundidad
      : maxProfundidadNormal;
    
    window.__ULTIMO_TOTAL_MEDIDA_CM__ = anchoFinal;
    window.__ULTIMA_PROFUNDIDAD_CM__ = profundidadFinal;
    
    // Ajustar altura del contenedor dinámicamente
    // Agregar 30px de margen inferior para las cotas de profundidad
    const alturaFinal = maxY + 30;
    imagenesDiv.style.height = `${alturaFinal}px`;
    console.log(`📐 Altura del contenedor ajustada a: ${alturaFinal}px`);
    
    posicionarCotas(imagenesDiv, anchoFinal, profundidadFinal);
    console.log(`📏 Cotas finales: ${anchoFinal}cm (ancho) x ${profundidadFinal}cm (profundidad)`);
    console.log(`   📊 Detalle: rinconEncontrado=${rinconEncontrado}, totalMedidaProfundidad=${totalMedidaProfundidad}, maxProfundidadNormal=${maxProfundidadNormal}`);
  });
}

// =====================
// INICIALIZACIÓN
// =====================
document.addEventListener('DOMContentLoaded', function() {
  console.log("🚀 piezasconfiguracion.js inicializado");
  if (typeof llenarSelects === 'function') llenarSelects();
  if (typeof mostrarImagenes === 'function') mostrarImagenes();
});