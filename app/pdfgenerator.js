/*------VARIABLES UNIVERSALES-------*/

/*------RECONOCIMIENTO DE FECHA ACTUAL-----*/
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${
  currentDate.getMonth() + 1
}/${currentDate.getFullYear()}`;

/*--------GENERADOR DE CODIGO ALEATORIO--------*/
function generateRandomReferenceNumber() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

const numeroReferencia = generateRandomReferenceNumber();

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function detectImageFormat(bytes, url = "") {
  if (bytes && bytes.length >= 4) {
    if (
      bytes[0] === 0x89 && bytes[1] === 0x50 &&
      bytes[2] === 0x4e && bytes[3] === 0x47
    ) {
      return "png";
    }
    if (bytes[0] === 0xff && bytes[1] === 0xd8) {
      return "jpg";
    }
    if (
      bytes[0] === 0x52 && bytes[1] === 0x49 &&
      bytes[2] === 0x46 && bytes[3] === 0x46
    ) {
      return "webp";
    }
  }

  const extension = (url.split(".").pop() || "").toLowerCase();
  if (extension === "jpg" || extension === "jpeg") return "jpg";
  return "png";
}

async function fetchImageBytes(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer);
  } catch (error) {
    console.warn("No se pudo obtener la imagen remota:", url, error);
    return null;
  }
}

async function embedRemoteImage(pdfDoc, url) {
  if (!url) return null;
  const bytes = await fetchImageBytes(url);
  if (!bytes) return null;

  const format = detectImageFormat(bytes, url);
  try {
    const pdfImage = format === "jpg"
      ? await pdfDoc.embedJpg(bytes)
      : await pdfDoc.embedPng(bytes);
    return pdfImage;
  } catch (error) {
    console.warn("No se pudo embeber la imagen en el PDF:", url, error);
    return null;
  }
}

// Función mejorada para esperar a que las imágenes se carguen completamente
async function waitForImagesToLoad(container) {
  if (!container) return;
  const images = container.getElementsByTagName("img");
  const promises = Array.from(images).map(
    img =>
      new Promise((resolve) => {
        if (img.complete && img.naturalHeight !== 0) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // no bloquear en errores
        }
      })
  );
  await Promise.all(promises);
}

// Función mejorada para capturar elementos con dimensiones dinámicas
async function capturePNG(selectorOrEl, options = {}) {
  const el = typeof selectorOrEl === "string"
    ? document.querySelector(selectorOrEl)
    : selectorOrEl;
  if (!el) return null;

  // Configuraciones por defecto
  const defaultOptions = {
    scale: 2, // Mayor resolución
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    scrollY: -window.scrollY,
    scrollX: -window.scrollX,
    width: null, // Se calculará automáticamente
    height: null, // Se calculará automáticamente
    ...options
  };

  // Hacer el elemento visible temporalmente
  const prevStyles = {
    display: el.style.display,
    visibility: el.style.visibility,
    opacity: el.style.opacity,
    position: el.style.position,
    left: el.style.left,
    top: el.style.top
  };

  // Asegurar que el elemento sea visible
  el.style.display = "block";
  el.style.visibility = "visible";
  el.style.opacity = "1";
  
  // Forzar un reflow para asegurar que las dimensiones se calculen correctamente
  el.offsetHeight;
  
  await waitForImagesToLoad(el);
  await wait(200); // Tiempo adicional para que se establezca el layout

  try {
    // Obtener las dimensiones reales del elemento
    const rect = el.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(el);
    
    // Calcular dimensiones incluyendo padding y border si es necesario
    const actualWidth = rect.width;
    const actualHeight = rect.height;

    // Configurar opciones de captura con dimensiones reales
    const captureOptions = {
      
      ...defaultOptions,
      width: actualWidth > 0 ? actualWidth : undefined,
      height: actualHeight > 0 ? actualHeight : undefined,
    };

    console.log(`Capturando elemento: ${selectorOrEl}`, {
      width: actualWidth,
      height: actualHeight,
      rect
    });

    const canvas = await html2canvas(el, captureOptions);

    // Restaurar estilos originales
    Object.keys(prevStyles).forEach(key => {
      el.style[key] = prevStyles[key];
    });

    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl || !dataUrl.startsWith("data:image/png")) return null;
    return dataUrl;

  } catch (error) {
    console.error("Error capturando elemento:", error);
    
    // Restaurar estilos originales en caso de error
    Object.keys(prevStyles).forEach(key => {
      el.style[key] = prevStyles[key];
    });
    
    return null;
  }
}

// Función segura para embebido de PNG
async function embedPngSafe(pdfDoc, dataUrl) {
  if (!dataUrl || !dataUrl.startsWith("data:image/png")) return null;
  try {
    return await pdfDoc.embedPng(dataUrl);
  } catch (e) {
    console.warn("embedPng failed:", e);
    return null;
  }
}

// Función para capturar y embeber imagen en PDF con dimensiones apropiadas
async function captureAndEmbedImage(pdfDoc, page, selector, x, y, maxWidth, maxHeight) {
  const imgData = await capturePNG(selector);
  const pdfImage = await embedPngSafe(pdfDoc, imgData);
  
  if (pdfImage) {
    const { width: imgWidth, height: imgHeight } = pdfImage;
    
    // Calcular escala manteniendo proporción
    const scaleX = maxWidth / imgWidth;
    const scaleY = maxHeight / imgHeight;
    const scale = Math.min(scaleX, scaleY, 1); // No escalar hacia arriba
    
    const finalWidth = imgWidth * scale;
    const finalHeight = imgHeight * scale;
    
    // Centrar la imagen en el área asignada si es más pequeña
    const offsetX = (maxWidth - finalWidth) / 2;
    const offsetY = (maxHeight - finalHeight) / 2;
    
    page.drawImage(pdfImage, {
      x: x + offsetX,
      y: y + offsetY,
      width: finalWidth,
      height: finalHeight
    });
    
    console.log(`Imagen ${selector} embebida:`, {
      originalSize: { width: imgWidth, height: imgHeight },
      finalSize: { width: finalWidth, height: finalHeight },
      scale
    });
    
    return true;
  }
  return false;
}

async function drawConfiguracionDesdeLayout(pdfDoc, page, area, options = {}) {
  const layout = window.__CONFIGURACION_LAYOUT__;
  if (!layout || !Array.isArray(layout.pieces) || !layout.pieces.length) {
    return false;
  }

  const { pieces, bounds } = layout;
  if (!bounds || bounds.width <= 0 || bounds.height <= 0) {
    return false;
  }

  const maxWidth = area.width;
  const maxHeight = area.height;
  const scale = Math.min(maxWidth / bounds.width, maxHeight / bounds.height, 1);
  const scaledWidth = bounds.width * scale;
  const scaledHeight = bounds.height * scale;
  const offsetX = area.x;
  const offsetY = area.y + (maxHeight - scaledHeight);
  const rotate = PDFLib?.degrees;
  const rgb = PDFLib?.rgb;

  const {
    font = null,
    textSize = 8,
    textColor = rgb ? rgb(0.3, 0.3, 0.3) : undefined,
    lineColor = rgb ? rgb(0.6, 0.6, 0.6) : undefined,
    padding = 12,
    lineThickness = 1,
  } = options || {};

  let drewAny = false;

  for (const piece of pieces) {
    console.log("Dibujando pieza en PDF:", piece.id, piece);
    const pdfImage = await embedRemoteImage(pdfDoc, piece.src);
    if (!pdfImage) continue;

    const cssWidth = piece.css?.width ?? piece.rect.width;
    const cssHeight = piece.css?.height ?? piece.rect.height;
    const relativeLeft = (piece.rect.left - bounds.left) * scale;
    const relativeTop = (piece.rect.top - bounds.top);
    const relativeBottom = relativeTop + piece.rect.height;

    const drawWidth = cssWidth * scale;
    const drawHeight = cssHeight * scale;

    const pdfXBounding = offsetX + relativeLeft;
    const pdfYBounding = offsetY + (bounds.height - relativeBottom) * scale;

    try {
      const normalizedRotation = ((piece.rotation % 360) + 360) % 360;
      if ((normalizedRotation === 90 || normalizedRotation === 270) && typeof rotate === "function") {
        const isClockwise = normalizedRotation === 90;
        const angle = isClockwise ? -90 : 90;
        const x = isClockwise ? pdfXBounding : pdfXBounding + drawHeight;
        const y = isClockwise ? pdfYBounding + drawWidth : pdfYBounding;

        page.drawImage(pdfImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
          rotate: rotate(angle),
        });
      } else if (normalizedRotation === 180 && typeof rotate === "function") {
        page.drawImage(pdfImage, {
          x: pdfXBounding + drawWidth,
          y: pdfYBounding + drawHeight,
          width: drawWidth,
          height: drawHeight,
          rotate: rotate(180),
        });
      } else {
        // Sin rotación o fallback si PDFLib.degrees no está disponible.
        // Ajusta swapping básico si no podemos rotar.
        if ((normalizedRotation === 90 || normalizedRotation === 270) && typeof rotate !== "function") {
          page.drawImage(pdfImage, {
            x: pdfXBounding,
            y: pdfYBounding,
            width: drawHeight,
            height: drawWidth,
          });
        } else {
          page.drawImage(pdfImage, {
            x: pdfXBounding,
            y: pdfYBounding,
            width: drawWidth,
            height: drawHeight,
          });
        }
      }
      drewAny = true;
    } catch (error) {
      console.warn("No se pudo dibujar una pieza en la sección CONFIGURACIÓN:", piece.id, error);
    }
  }

  // --- Dibujar medidas del sofa (linea ancho y linea profundidad) ---
  if (drewAny && (layout.meta?.totalMedidaCm || layout.meta?.profundidadCm)) {
    const pdfAreaLeft = offsetX;
    const pdfAreaBottom = offsetY;
    const pdfAreaTop = pdfAreaBottom + scaledHeight;
    const pdfAreaRight = pdfAreaLeft + scaledWidth;

    const hasDrawLine = typeof page.drawLine === "function";
    const horizontalY = pdfAreaTop + padding;
    const verticalX = pdfAreaRight + padding;

    // Dibujar linea ancho y etiqueta
    if (layout.meta?.totalMedidaCm && scaledWidth > 0) {
      if (hasDrawLine) {
        page.drawLine({
          start: { x: pdfAreaLeft, y: horizontalY },
          end: { x: pdfAreaRight, y: horizontalY },
          thickness: lineThickness,
          color: lineColor,
        });
      } else {
        page.drawRectangle({
          x: pdfAreaLeft,
          y: horizontalY - lineThickness / 2,
          width: scaledWidth,
          height: lineThickness,
          color: lineColor,
        });
      }

      if (font) {
        const etiqueta = `${layout.meta.totalMedidaCm} cm`;
        const etiquetaWidth = font.widthOfTextAtSize(etiqueta, textSize);
        const textX = pdfAreaLeft + (scaledWidth - etiquetaWidth) / 2;
        const textY = horizontalY + textSize + 2;
        page.drawText(etiqueta, {
          x: textX,
          y: textY,
          size: textSize,
          font,
          color: textColor,
        });
      }
    }

    // Dibujar linea profundidad y etiqueta
    if (layout.meta?.profundidadCm && scaledHeight > 0) {
      if (hasDrawLine) {
        page.drawLine({
          start: { x: verticalX, y: pdfAreaBottom },
          end: { x: verticalX, y: pdfAreaTop },
          thickness: lineThickness,
          color: lineColor,
        });
      } else {
        page.drawRectangle({
          x: verticalX - lineThickness / 2,
          y: pdfAreaBottom,
          width: lineThickness,
          height: scaledHeight,
          color: lineColor,
        });
      }

      if (font) {
        const etiqueta = `${layout.meta.profundidadCm} cm`;
        const textX = verticalX + padding / 2;
        const textY = pdfAreaBottom + (scaledHeight - textSize) / 2;
        page.drawText(etiqueta, {
          x: textX,
          y: textY,
          size: textSize,
          font,
          color: textColor,
        });
      }
    }
  }

  return drewAny;
}

async function createPDF() {
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  // Obtener datos del formulario
  const modelo = document.getElementById("modelo").value;
  const nombreEmpresa = document.getElementById("nombreEmpresa").value;
  const cifEmpresa = document.getElementById("cifEmpresa").value;
  
  const telefonoEmpresa = document.getElementById("telefonoEmpresa").value;
  const emailEmpresa = document.getElementById("emailEmpresa").value;

  const tela = document.getElementById("tela").value;
  const observaciones = document.getElementById("observaciones").value;
  const telaNombre = document.getElementById("selectTelaContainer").value;
  const precioTotalElement = document.getElementById("precioTotal");
  const descuentoAplicadoElement = document.getElementById("descuentoAplicado");
  const precioTotalDescElement = document.getElementById("precioTotalDesc");

/*   const comunidad = document.getElementById("comunidad").value;
  const pais = document.getElementById("pais").value;
  const calle = document.getElementById("calle").value;
  const ciudad = document.getElementById("ciudad").value;
  const codigoPostal = document.getElementById("codigoPostal").value;
  const puertaPiso = document.getElementById("puertaPiso").value;
  const nombreCliente = document.getElementById("nombreCliente").value;
  const cifCliente = document.getElementById("cifCliente").value;
  const emailCliente = document.getElementById("emailCliente").value;
  const telefonoCliente = document.getElementById("telefonoCliente").value;
 */

  const selectIds = [
    "pieza1", "pieza2", "pieza3", "pieza4",
    "pieza5", "pieza6", "pieza7", "pieza8",
  ];
  
  const piezasSelect = [
    ...piezasAura, ...piezasBianca, ...piezasLuna,
    ...piezasNora, ...piezasVera,...piezasOlivia,...piezasDafne
  ];

  // Crear nuevo documento PDF
  const { PDFDocument, StandardFonts, rgb } = PDFLib;
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([550, 750]);

  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();
  
  /*-------COLORES------*/
  const color838383 = rgb(0.4, 0.4, 0.4);
  const colorLine = rgb(0.7, 0.7, 0.7);
  const colorPrice = rgb(0.3, 0.3, 0.3);

  /*----FUNCIÓN PARA AÑADIR TEXTO AL PDF-----*/
  function drawText(page, text, x, y, size, font, color) {
    page.drawText(text, {
      x: x, y: y, size: size, font: font, color: color,
    });
  }

  // Header y líneas
  drawText(page, "PRESUPUESTO", 52, 720, 15, helveticaBoldFont);
  page.drawRectangle({
    x: 48, y: 710, width: 450, height: 0.5,
    borderColor: colorLine, borderWidth: 0.2,
  });
 
  // --- LOGO DEL FOOTER ---
const footerLogoOk = await captureAndEmbedImage(
  pdfDoc,
  page,
  "#logoBlackFooter", // 👈 solo el <img>
  385,                 // x en el PDF
  710,                 // y en el PDF (cerca del borde inferior)
  120,                // ancho máximo permitido
  40                  // alto máximo permitido
);

if (!footerLogoOk) {
  page.drawText("Singular Sofás S.L.", {
    x: 52, y: 20, size: 8, font: helveticaFont, color: color838383
  });
}

  /*-------------------INFO CLIENTE------------------- */
 /*  drawText(page, "INFORMACIÓN CLIENTE", 74, 690, 10, helveticaBoldFont);
  drawText(page, `Nombre: ${nombreCliente}`, 74, 670, 8, helveticaFont);
  drawText(page, `CIF Cliente: ${cifCliente}`, 74, 655, 8, helveticaFont);
  if (pais === "España") {
    drawText(page, `País: ${pais}, ${comunidad}`, 74, 640, 8, helveticaFont);
  } else {
    drawText(page, `País: ${pais}`, 74, 640, 8, helveticaFont);
  }
  
  drawText(page, `Direccion: ${calle},${puertaPiso},${ciudad},${codigoPostal}`, 74, 625, 8, helveticaFont);
  drawText(page, `Teléfono: ${telefonoCliente}`, 74, 610, 8, helveticaFont);
  drawText(page, `Email: ${emailCliente}`, 74, 595, 8, helveticaFont); */

  // -------------------INFO EMPRESA-------------------
  drawText(page, "INFORMACIÓN EMPRESA",74, 690, 10, helveticaBoldFont);
  drawText(page, `Nombre Empresa: ${nombreEmpresa}`, 74, 670, 8, helveticaFont);
  drawText(page, `Teléfono: ${telefonoEmpresa}`, 74, 655, 8, helveticaFont);
  drawText(page, `CIF Empresa: ${cifEmpresa}`, 74, 640, 8, helveticaFont);
  drawText(page, `Email Empresa: ${emailEmpresa}`, 74, 625, 8, helveticaFont);
  /*--------------------SECCIÓN PRESUPUESTO---------------*/
  drawText(page, "PRESUPUESTO", 340, 690, 10, helveticaBoldFont);
  drawText(page, `Fecha Emisión: ${formattedDate}`, 340, 670, 8, helveticaFont);
  drawText(page, `N° Referencia: ${numeroReferencia}`, 340, 655, 8, helveticaBoldFont);
  /*---------MODELO Y CONFIGURACION-----------*/
  drawText(page, `MODELO: ${modelo}`, 52, 565, 15, helveticaBoldFont);
  
  /*------------LINEA MODELO--------------*/
  page.drawRectangle({
    x: 48, y: 555, width: 450, height: 0.5,
    borderColor: colorLine, borderWidth: 0.2,
  });
  
  drawText(page, "REFERENCIA", 74, 535, 10, helveticaBoldFont);
    /*----------------------TEJIDO-----------------------------------*/
    drawText(page, "TEJIDO", 340, 535, 10, helveticaBoldFont);
    drawText(page, `Articulo: ${tela}`, 340,520, 8, helveticaFont);
    drawText(page, `Tela: ${telaNombre}`, 340, 505, 8, helveticaFont);
  
    // CAPTURA DE IMAGEN DE TELA
    console.log("Capturando imagen de tela...");
    const telaSuccess = await captureAndEmbedImage(
      pdfDoc, page, "#telaReferencia", 340, 435,100, 100
    );
    
    if (!telaSuccess) {
      console.warn("No se pudo capturar la imagen de tela");
    }
  // CAPTURA DE IMAGEN DE REFERENCIA
  console.log("Capturando imagen de referencia...");
  const imgReferenciaSuccess = await captureAndEmbedImage(
    pdfDoc, page, "#imgReferencia", 74, 370, 400, 250
  );
  
  if (!imgReferenciaSuccess) {
    console.warn("No se pudo capturar la imagen de referencia");
    drawText(page, "Imagen de referencia no disponible", 74, 485, 8, helveticaFont, color838383);
  }
  
  drawText(page, "*imagen de referencia de otra configuración", 74, 435, 5, helveticaFont, color838383);


  

  /*----CONFIGURACIÓN----*/
  drawText(page, "CONFIGURACIÓN", 74, 410, 10, helveticaBoldFont);
  drawText(page, "OBSERVACIONES", 340, 410, 10, helveticaBoldFont);
  
 
// --- Utilidad para pintar texto con wrap por ancho:
function drawWrappedText({ page, text, x, y, maxWidth, lineHeight = 12, font, size = 8, color }) {
  const drawLine = (ln, yy) => {
    if (!ln) return yy;
    page.drawText(ln, { x, y: yy, size, font, color });
    return yy - lineHeight;
  };

  // Soporta saltos de línea manuales
  const paragraphs = String(text || "").split(/\r?\n/);
  let yy = y;

  for (const para of paragraphs) {
    let line = "";
    const words = para.split(/\s+/);

    for (let w of words) {
      // Fallback por si una “palabra” supera el ancho (URLs, códigos)
      const wordTooLong = font.widthOfTextAtSize(w, size) > maxWidth;
      if (wordTooLong) {
        // Rompe la palabra en trozos que quepan
        let chunk = "";
        for (const ch of w) {
          const testChunk = chunk + ch;
          if (font.widthOfTextAtSize(testChunk, size) > maxWidth) {
            yy = drawLine(chunk, yy);
            chunk = ch;
          } else {
            chunk = testChunk;
          }
        }
        // Empuja el trozo final a la línea corriente
        w = chunk;
        if (!w) continue;
      }

      const testLine = line ? line + " " + w : w;
      if (font.widthOfTextAtSize(testLine, size) <= maxWidth) {
        line = testLine;
      } else {
        yy = drawLine(line, yy);
        line = w;
      }
    }
    yy = drawLine(line, yy); // Última línea del párrafo
  }
  return yy; // Devuelve la Y final por si la quieres usar
}

// --- Donde antes pintabas las observaciones:
const xObs = 340;
const yObsTop = 395;
const rightGuard = 45; // 45 px antes del fin del ancho del PDF
const maxTextWidth = pageWidth - rightGuard - xObs;

drawWrappedText({
  page,
  text: observaciones,
  x: xObs,
  y: yObsTop,
  maxWidth: Math.max(0, maxTextWidth),
  lineHeight: 12,            // ajusta si quieres más/menos interlineado
  font: helveticaFont,
  size: 8,
  color: color838383         // o helveticaFont/color que ya usas
});
const configDrawn = await drawConfiguracionDesdeLayout(
  pdfDoc,
  page,
  { x: 40, y: 230, width: 250, height: 150 },
  {
    font: helveticaFont,
    textSize: 8,
    textColor: color838383,
    lineColor: colorLine,
    padding: 8,
    lineThickness: 0.8,
  }
);

if (!configDrawn) {
  drawText(page, "Imagen de configuración no disponible", 74, 350, 8, helveticaFont, color838383);
}




  /*-------------------------TARIFA-------------------------------*/
  drawText(page, "TARIFA", 52, 220, 15, helveticaBoldFont);
  page.drawRectangle({
    x: 48, y: 210, width: 450, height: 0.5,
    borderColor: colorLine, borderWidth: 0.2,
  });
  
  drawText(page, "PIEZA", 76, 190, 8, helveticaBoldFont);
  drawText(page, "VALOR U.", 362, 190, 8, helveticaBoldFont);

  /*------------RECUADRO PRECIOS--------------*/
  page.drawRectangle({
    x: 48, y: 77, width: 450, height: 105,
    borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 0.2,
  });

  /*-------------------------PRECIOS Y CODIGOS---------------------*/
  function procesarSelects() {
    const validSelectIds = selectIds.filter((selectId) => {
      const selectElement = document.getElementById(selectId);
      return selectElement && selectElement.value !== "None";
    });
  
    let currentYPos = 170; // base izquierda
    const line = 12;
  
    // Piezas
    validSelectIds.forEach((selectId, index) => {
      const selectElement = document.getElementById(selectId);
      const selectedValue = selectElement.value;
      const piezaData = piezasSelect.find((pieza) => pieza.id === selectedValue);
      const id = piezaData ? String(piezaData.id) : "";
      const title = piezaData ? String(piezaData.title) : "";
      const fullText = `${id} ${title}`;
      const yPos = currentYPos - index * line;
      drawText(page, fullText, 52, yPos, 8, helveticaFont, colorPrice);
    });
  
    // Avanza el cursor bajo las piezas
    currentYPos = currentYPos - validSelectIds.length * line;
  
    // Cojines (si hay)
    const selCoj = document.getElementById("cojines");
    const cantidadCojines = selCoj ? (parseInt(selCoj.value, 10) || 0) : 0;
    if (cantidadCojines > 0) {
      // ID fijo del artículo (ajústalo si lo sacas de data-attrs)
      const cojinosText = `CA4545 Cojín Cuadrado 45x45 cms (x${cantidadCojines})`;
      // baja una línea antes de pintar para no pisar la última pieza
      currentYPos -= line;
      drawText(page, cojinosText, 52, currentYPos, 8, helveticaFont, colorPrice);
    }
  }
  
  
  /*-------PRECIOS--------- */
/*-------PRECIOS--------- */
const preciosMaterial = document.querySelectorAll("#preciosMaterial"); // idealmente: ".precioMaterial"
const precioCojines = document.getElementById("precioCojines");

let priceY = 170;           // base derecha
const line = 12;

// Precios piezas
if (preciosMaterial.length > 0) {
  preciosMaterial.forEach((precio, index) => {
    const yPos = priceY - index * line;
    const textContent = (precio.textContent || "").trim();
    drawText(page, textContent, 362, yPos, 8, helveticaFont, colorPrice);
  });
  priceY = priceY - preciosMaterial.length * line;
}

// Precio cojines (si aplica)
const selCoj = document.getElementById("cojines");
const cantidadCojines = selCoj ? (parseInt(selCoj.value, 10) || 0) : 0;
if (cantidadCojines > 0 && precioCojines) {
  // opcional: baja una línea para mantener la alineación con la izquierda
  priceY -= line;
  const precioCojinesText = (precioCojines.textContent || "").trim();
  drawText(page, precioCojinesText, 362, priceY, 8, helveticaFont, colorPrice);
}

  procesarSelects();

  /*------------RECUADROS DE TOTALES--------------*/
  drawText(page, "TOTAL", 430, 67, 8, helveticaBoldFont);
  page.drawRectangle({
    x: 430, y: 50, width: 60, height: 15,
    borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 0.2,
  });

  if (precioTotalElement) {
    const precioTotal = precioTotalElement.textContent || precioTotalElement.innerText;
    drawText(page, `${precioTotal}`, 430, 54, 8, helveticaFont, colorPrice);
  }

  drawText(page, "TOTAL C. DESC", 430, 40, 8, helveticaBoldFont);
  page.drawRectangle({
    x: 430, y: 23, width: 60, height: 15,
    borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 0.2,
  });

  if (precioTotalDescElement) {
    const precioTotalDesc = precioTotalDescElement.textContent || precioTotalDescElement.innerText;
    drawText(page, `${precioTotalDesc}`, 432, 27, 8, helveticaFont, colorPrice);
  }

  drawText(page, "DESC", 350, 40, 8, helveticaBoldFont);
  page.drawRectangle({
    x: 350, y: 23, width: 60, height: 15,
    borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 0.2,
  });

  if (descuentoAplicadoElement) {
    const descuentoAplicado = descuentoAplicadoElement.textContent || descuentoAplicadoElement.innerText;
    drawText(page, `${descuentoAplicado}`, 352, 27, 8, helveticaFont, colorPrice);
  }

  /*-----------------------ACLARACIONES PRECIOS-----------------*/
  const aclaraciones = [
    "*Presupuesto con validez de 90 días a partir de la fecha de emisión.",
    "*Los pedidos tendrán un plazo general de entrega de 6 semanas laborables.",
    "No obstante, dicho plazo puede variar en función de la llegada a fábrica del tejido seleccionado, ",
    "el aumento de la demanda temporal o la rotura de stock de otros componentes. ",
    "En ese caso Singular informará debidamente de los posibles contratiempos ",
    "indicando la fecha estimada en la confirmación del pedido. Se cobrarán 12€ ",
    "de portes en envíos de mercancía con importe inferior a 300€+ IVA (poufs, ",
    "metrajes, etc.) A partir de 300€, los portes serán gratuitos. ",
   /*  "*Los pedidos se realizarán a través del email pedidos@singular.com. Una vez enviada la confirmación del pedido, se considerará conforme si no se recibe una respuesta en el plazo de 2 días.  ",
    "Transcurridos 5 días del envío de dicha confirmación, el pedido no se podrá cambiar ni cancelar. Se cobrarán 12€ de portes en envíos de mercancía con importe inferior a 300€+ IVA (poufs,   ", */
    "metrajes, etc.) A partir de 300€, los portes serán gratuitos.   ",
    "*La fecha de emisión definirá la validez del presupuesto",
    "más info en pie de página.",
    "*El número de referencia servirá para localizar el",
    "presupuesto ya realizado."
  ];

  aclaraciones.forEach((texto, index) => {
    drawText(page, texto, 52, 65 - (index * 5), 5, helveticaFont, color838383);
  });

  // Descargar el PDF
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Presupuesto_${numeroReferencia}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // 🎯 UMAMI EVENT TRACKING - Successful PDF Generation
  try {
    if (typeof umami !== 'undefined' && umami.track) {
      // Get current price for tracking
      const precioFinal = precioTotalDescElement ? 
        (precioTotalDescElement.textContent || precioTotalDescElement.innerText).replace(/[^\d.,]/g, '') : 
        '';
      
      // Track PDF generation event with useful metadata
      umami.track('pdf-generated', {
        modelo: modelo,
        referencia: numeroReferencia,
        precio_total: precioFinal,
        empresa: nombreEmpresa,
        fecha: formattedDate,
        tiene_descuento: descuentoAplicadoElement && descuentoAplicadoElement.textContent !== '0%',
        num_piezas: selectIds.filter(id => {
          const el = document.getElementById(id);
          return el && el.value !== "None";
        }).length
      });
      
      console.log('✅ Umami event tracked: pdf-generated');
    } else {
      console.warn('⚠️ Umami tracking not available');
    }
  } catch (error) {
    console.error('❌ Error tracking Umami event:', error);
  }
}

// Función para generar el PDF con validación
document.addEventListener("DOMContentLoaded", () => {
  console.log("Adding event listener")
  const botonPdf = document.getElementById("generateBtn");

  botonPdf.addEventListener("click", () => {
    // 🎯 UMAMI EVENT TRACKING - PDF Generation Attempt
    try {
      if (typeof umami !== 'undefined' && umami.track) {
        umami.track('pdf-generation-attempt');
        console.log('✅ Umami event tracked: pdf-generation-attempt');
      }
    } catch (error) {
      console.error('❌ Error tracking Umami event:', error);
    }

    const campos = [
    /*   { id: "nombreCliente", label: "Nombre y Apellido" },
      { id: "emailCliente", label: "Email", tipo: "email" },
      { id: "codigoPostal", label: "Código Postal" },
      { id: "calle", label: "Calle" },
      { id: "puertaPiso", label: "Puerta/Piso" }, */
      { id: "nombreEmpresa", label: "Nombre Empresa" },
      /* { id: "emailEmpresa", label: "Email Empresa", tipo: "email" }, */
    ];

    let formularioValido = true;
    let mensajesError = [];

    campos.forEach((campo) => {
      const input = document.getElementById(campo.id);
      if (!input.value.trim()) {
        formularioValido = false;
        mensajesError.push(`- ${campo.label} es obligatorio.`);
      } else if (
        campo.tipo === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
      ) {
        formularioValido = false;
        mensajesError.push(`- El formato del email no es válido.`);
      }
    });

    if (!formularioValido) {
      // 🎯 UMAMI EVENT TRACKING - Validation Error
      try {
        if (typeof umami !== 'undefined' && umami.track) {
          umami.track('pdf-validation-error', {
            error_count: mensajesError.length,
            missing_fields: mensajesError.map(msg => msg.split(' es obligatorio')[0].replace('- ', '')).join(', ')
          });
          console.log('✅ Umami event tracked: pdf-validation-error');
        }
      } catch (error) {
        console.error('❌ Error tracking Umami event:', error);
      }

      Swal.fire({
        icon: "error",
        title: "Campos incompletos o inválidos",
        html: `<div class="textAlert">${mensajesError
          .map((msg) => `<p>${msg}</p>`)
          .join("")}</div>`,
        confirmButtonText: "Aceptar",
        customClass: {
          popup: "popupAlert",
          title: "titleAlert",
          html: "textAlert",
          confirmButton: "btnAlert",
        },
      });
      return;
    }

    // Si todo es válido
    botonPdf.classList.add("active");
    createPDF();
  });
});
    