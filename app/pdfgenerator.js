/*------GENERADOR DE PDF OPTIMIZADO-------*/

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

// Función para esperar a que las imágenes se carguen
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
          img.onerror = () => resolve();
        }
      })
  );
  await Promise.all(promises);
}

// Función para capturar elementos como PNG con área extendida - OPTIMIZADA
async function capturePNG(selectorOrEl, options = {}) {
  const el = typeof selectorOrEl === "string"
    ? document.querySelector(selectorOrEl)
    : selectorOrEl;
  if (!el) return null;

  // Guardar estilos originales
  const originalPaddingTop = el.style.paddingTop;
  const originalPaddingBottom = el.style.paddingBottom;
  const originalPaddingRight = el.style.paddingRight;
  const originalPaddingLeft = el.style.paddingLeft;
  
  // Detectar móvil
  const isMobile = window.innerWidth <= 768;
  
  // Padding FIJO - valores EXTREMOS para móvil para evitar cortes
  const paddingValues = isMobile 
    ? { top: '80px', right: '300px', bottom: '250px', left: '50px', desplazamiento: 50 }
    : { top: '50px', right: '40px', bottom: '40px', left: '10px', desplazamiento: 45 };
  
  console.log(`📱 Captura - isMobile: ${isMobile}, padding: T:${paddingValues.top} R:${paddingValues.right} B:${paddingValues.bottom} Desp:${paddingValues.desplazamiento}`);
  
  // Guardar posiciones originales de las cotas
  const txtAncho = el.querySelector("#ancho");
  const lineaAncho = el.querySelector("#lineaAncho");
  const txtProfundidad = el.querySelector("#profundidad");
  const lineaProfundidad = el.querySelector("#lineaProfundidad");
  
  const originalTopAncho = txtAncho ? txtAncho.style.top : null;
  const originalTopLineaAncho = lineaAncho ? lineaAncho.style.top : null;
  const originalTopProfundidad = txtProfundidad ? txtProfundidad.style.top : null;
  const originalTopLineaProfundidad = lineaProfundidad ? lineaProfundidad.style.top : null;
  
  // Guardar posiciones originales de las piezas
  const piezas = el.querySelectorAll(".img-config");
  const originalPiezasTops = Array.from(piezas).map(p => p.style.top);
  
  // Aplicar padding con !important
  el.style.setProperty('padding-top', paddingValues.top, 'important');
  el.style.setProperty('padding-bottom', paddingValues.bottom, 'important');
  el.style.setProperty('padding-right', paddingValues.right, 'important');
  el.style.setProperty('padding-left', paddingValues.left, 'important');
  
  // Ajustar cotas de ANCHO (arriba)
  if (txtAncho) txtAncho.style.top = isMobile ? '5px' : '5px';
  if (lineaAncho) lineaAncho.style.top = isMobile ? '30px' : '30px';
  
  // Ajustar cotas de PROFUNDIDAD y piezas (moverlas abajo)
  const desp = paddingValues.desplazamiento;
  if (txtProfundidad) {
    const currentTop = parseInt(txtProfundidad.style.top) || 0;
    txtProfundidad.style.top = `${currentTop + desp}px`;
  }
  if (lineaProfundidad) {
    const currentTop = parseInt(lineaProfundidad.style.top) || 0;
    lineaProfundidad.style.top = `${currentTop + desp}px`;
  }
  piezas.forEach(pieza => {
    const currentTop = parseInt(pieza.style.top) || 0;
    pieza.style.top = `${currentTop + desp}px`;
  });
  
  // Forzar recalculo del layout
  el.offsetHeight;
  
  // ⚡ OPTIMIZACIÓN: Reducir espera de 300ms a 100ms
  await wait(100);

  // Opciones de html2canvas - ⚡ OPTIMIZADO: scale reducido de 2 a 1.5
  const defaultOptions = {
    scale: 1.5, // ⚡ REDUCIDO de 2 a 1.5 (33% más rápido, calidad aún buena)
    useCORS: true,
    allowTaint: true,
    backgroundColor: 'white',
    scrollY: -window.scrollY,
    scrollX: -window.scrollX,
    logging: false,
    ...options
  };

  const prevStyles = {
    display: el.style.display,
    visibility: el.style.visibility,
    opacity: el.style.opacity
  };

  el.style.display = "block";
  el.style.visibility = "visible";
  el.style.opacity = "1";
  
  el.offsetHeight;
  
  await waitForImagesToLoad(el);
  // ⚡ OPTIMIZACIÓN: Reducir espera de 500ms a 200ms
  await wait(200);

  try {
    const canvas = await html2canvas(el, defaultOptions);

    // IMPORTANTE: Restaurar padding y posiciones originales inmediatamente
    el.style.paddingTop = originalPaddingTop;
    el.style.paddingBottom = originalPaddingBottom;
    el.style.paddingRight = originalPaddingRight;
    el.style.paddingLeft = originalPaddingLeft;
    
    if (txtAncho && originalTopAncho !== null) {
      txtAncho.style.top = originalTopAncho;
    }
    if (lineaAncho && originalTopLineaAncho !== null) {
      lineaAncho.style.top = originalTopLineaAncho;
    }
    if (txtProfundidad && originalTopProfundidad !== null) {
      txtProfundidad.style.top = originalTopProfundidad;
    }
    if (lineaProfundidad && originalTopLineaProfundidad !== null) {
      lineaProfundidad.style.top = originalTopLineaProfundidad;
    }
    
    // Restaurar posiciones de las piezas
    piezas.forEach((pieza, index) => {
      if (originalPiezasTops[index]) {
        pieza.style.top = originalPiezasTops[index];
      }
    });
    
    Object.keys(prevStyles).forEach(key => {
      el.style[key] = prevStyles[key];
    });

    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl || !dataUrl.startsWith("data:image/png")) {
      return null;
    }
    return dataUrl;

  } catch (error) {
    console.error("Error capturando elemento:", error);
    // Restaurar padding y posiciones en caso de error
    el.style.paddingTop = originalPaddingTop;
    el.style.paddingBottom = originalPaddingBottom;
    el.style.paddingRight = originalPaddingRight;
    el.style.paddingLeft = originalPaddingLeft;
    
    if (txtAncho && originalTopAncho !== null) {
      txtAncho.style.top = originalTopAncho;
    }
    if (lineaAncho && originalTopLineaAncho !== null) {
      lineaAncho.style.top = originalTopLineaAncho;
    }
    if (txtProfundidad && originalTopProfundidad !== null) {
      txtProfundidad.style.top = originalTopProfundidad;
    }
    if (lineaProfundidad && originalTopLineaProfundidad !== null) {
      lineaProfundidad.style.top = originalTopLineaProfundidad;
    }
    
    // Restaurar posiciones de las piezas
    piezas.forEach((pieza, index) => {
      if (originalPiezasTops[index]) {
        pieza.style.top = originalPiezasTops[index];
      }
    });
    
    Object.keys(prevStyles).forEach(key => {
      el.style[key] = prevStyles[key];
    });
    return null;
  }
}

// Función para embeber PNG en PDF
async function embedPngSafe(pdfDoc, dataUrl) {
  if (!dataUrl || !dataUrl.startsWith("data:image/png")) return null;
  try {
    return await pdfDoc.embedPng(dataUrl);
  } catch (e) {
    console.warn("embedPng failed:", e);
    return null;
  }
}

// Función para capturar y embeber imagen
async function captureAndEmbedImage(pdfDoc, page, selector, x, y, maxWidth, maxHeight) {
  const imgData = await capturePNG(selector);
  const pdfImage = await embedPngSafe(pdfDoc, imgData);
  
  if (pdfImage) {
    const { width: imgWidth, height: imgHeight } = pdfImage;
    
    // Detectar móvil y aplicar escala adicional
    const isMobile = window.innerWidth <= 768;
    const mobileScale = isMobile ? 0.85 : 1; // Reducir al 85% en móvil
    
    const scaleX = maxWidth / imgWidth;
    const scaleY = maxHeight / imgHeight;
    const scale = Math.min(scaleX, scaleY, 1) * mobileScale;
    
    const finalWidth = imgWidth * scale;
    const finalHeight = imgHeight * scale;
    
    // Alinear a la izquierda y arriba
    const offsetX = 0;
    const offsetY = maxHeight - finalHeight;
    
    console.log(`📄 PDF Image - isMobile: ${isMobile}, scale: ${scale.toFixed(2)}, size: ${finalWidth.toFixed(0)}x${finalHeight.toFixed(0)}`);
    
    page.drawImage(pdfImage, {
      x: x + offsetX,
      y: y + offsetY,
      width: finalWidth,
      height: finalHeight
    });
    
    return true;
  }
  return false;
}

/*--------FUNCIÓN PRINCIPAL PARA CREAR PDF--------*/
async function createPDF() {
  // ⚡ OPTIMIZACIÓN: Reducir espera inicial de 50ms a 10ms
  await new Promise((resolve) => setTimeout(resolve, 10));
  
  // Obtener datos del formulario
  const nombreCliente = document.getElementById("nombreCliente").value.trim();
  
  // Obtener piezas seleccionadas
  const piezasSeleccionadas = obtenerPiezasSeleccionadas();
  const piezasFiltradas = piezasSeleccionadas.filter((pieza) => pieza.id !== "None");
  
  // Obtener cojines
  const cantidadCojines = parseInt(document.getElementById("cojines").value) || 0;
  
  // Obtener tejido seleccionado
  const tejidoSeleccionado = document.getElementById("tejidos").value;
  
  // Calcular precios
  const precioPiezas = piezasFiltradas.reduce((total, pieza) => {
    return total + obtenerPrecioPorMaterial(pieza.id, "SERIE 2");
  }, 0);

  let precioUnitarioCojin = 0;
  let precioCojines = 0;
  if (cantidadCojines > 0) {
    precioUnitarioCojin = preciosCojinesPorTejido[tejidoSeleccionado] || 0;
    const multiplicador = obtenerMultiplicadorTarifa();
    precioUnitarioCojin = precioUnitarioCojin * multiplicador;
    precioCojines = precioUnitarioCojin * cantidadCojines;
  }

  const precioTotal = precioPiezas + precioCojines;

  // Crear documento PDF
  const pdfDoc = await PDFLib.PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  
  // Cargar fuentes
  const helveticaFont = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const helveticaBoldFont = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  
  // Dimensiones de página
  const pageWidth = page.getWidth();
  const pageHeight = page.getHeight();

  // Colores
  const colorNegro = PDFLib.rgb(0, 0, 0);
  const colorGris = PDFLib.rgb(0.4, 0.4, 0.4);
  const colorLinea = PDFLib.rgb(0.8, 0.8, 0.8);

  // Función auxiliar para dibujar texto
  function drawText(text, x, y, size, font, color = colorNegro) {
    page.drawText(text, { x, y, size, font, color });
  }

  // ============================================
  // ENCABEZADO CON LOGO
  // ============================================
  // Intentar cargar y embeber el logo
  try {
    const logoUrl = './assets/logo.png'; // Ruta al logo
    const response = await fetch(logoUrl);
    const logoBytes = await response.arrayBuffer();
    const logoImage = await pdfDoc.embedPng(logoBytes);
    
    const logoWidth = 100;
    const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
    
    page.drawImage(logoImage, {
      x: pageWidth - logoWidth - 40,
      y: 778, // Alineado con PRESUPUESTO
      width: logoWidth,
      height: logoHeight
    });
  } catch (error) {
    console.warn("No se pudo cargar el logo:", error);
    drawText("IN SITU", pageWidth - 100, 790, 12, helveticaBoldFont);
  }
  
  // Línea separadora debajo del logo
  page.drawRectangle({
    x: 50, 
    y: 775, 
    width: 495, 
    height: 0.5,
    borderColor: colorLinea, 
    borderWidth: 0.5,
  });

  // ============================================
  // INFORMACIÓN DEL PRESUPUESTO
  // ============================================
  drawText("PRESUPUESTO", 50, 750, 12, helveticaBoldFont);
  drawText(`Nombre cliente: ${nombreCliente}`, 50, 730, 8, helveticaFont, colorGris);
  drawText(`Fecha de emisión: ${formattedDate}`, 50, 715, 8, helveticaFont, colorGris);
  drawText(`Nº de referencia: ${numeroReferencia}`, 50, 700, 8, helveticaBoldFont);

  // ============================================
  // CONFIGURACIÓN (Centro superior - bajado más para mostrar cota superior)
  // ============================================
  const isMobilePDF = window.innerWidth <= 768;
  let yPosition = isMobilePDF ? 665 : 640; // Bajado de 675 a 665 para dar más aire en móvil
  
  drawText("CONFIGURACIÓN", 50, yPosition, 12, helveticaBoldFont);
  yPosition -= 15;
  
  // Capturar imagen de la configuración
  console.log("Capturando configuración...");
  
  // Obtener altura real del contenedor de configuración
  const imagenPiezasEl = document.querySelector("#imagenPiezas");
  const alturaReal = imagenPiezasEl ? imagenPiezasEl.offsetHeight : 280;
  // En móvil, capturar MUCHA más altura para configuraciones grandes
  const alturaCaptura = isMobilePDF ? Math.min(alturaReal * 1.5, 400) : Math.min(alturaReal * 0.8, 280);
  
  console.log(`📄 PDF - isMobile: ${isMobilePDF}, yPosition: ${yPosition}, alturaCaptura: ${alturaCaptura}, alturaReal: ${alturaReal}`);
  
  const configSuccess = await captureAndEmbedImage(
    pdfDoc, page, "#imagenPiezas", 
    50,
    yPosition - alturaCaptura,
    450,
    alturaCaptura
  );
  
  if (!configSuccess) {
    console.warn("No se pudo capturar la configuración");
  }

  // ============================================
  // TARIFA / DETALLE (Construir de abajo hacia arriba dinámicamente)
  // ============================================
  
  // Calcular cuántas líneas necesitamos
  const numPiezas = piezasFiltradas.length;
  const numCojines = cantidadCojines > 0 ? 1 : 0;
  const totalLineas = numPiezas + numCojines;
  
  // Calcular altura necesaria
  const lineHeight = 15;
  const alturaNecesaria = 
    25 + // Título TARIFA
    25 + // Encabezados
    (totalLineas * lineHeight) + // Líneas de items
    20 + // Línea separadora + espacio
    20;  // TOTAL
  
  // Empezar desde arriba del texto legal (con margen de seguridad)
  const margenSuperiorLegal = 50; // Altura del texto legal
  const margenSeguridad = 20;
  yPosition = margenSuperiorLegal + margenSeguridad + alturaNecesaria; // Reasignar en lugar de declarar
  
  // TÍTULO TARIFA
  const yTitulo = yPosition;
  drawText("TARIFA", 50, yTitulo, 12, helveticaBoldFont);
  yPosition -= 25;

  // Encabezados de tabla
  drawText("PIEZA", 70, yPosition, 9, helveticaBoldFont);
  drawText("VALOR", 480, yPosition, 9, helveticaBoldFont); // Cambiado de "VALOR U." a "VALOR"
  yPosition -= 5;
  
  // Línea separadora
  page.drawRectangle({
    x: 50, 
    y: yPosition, 
    width: 495, 
    height: 0.5,
    borderColor: colorLinea, 
    borderWidth: 0.5,
  });
  
  yPosition -= 20;

  // Piezas
  if (piezasFiltradas.length > 0) {
    piezasFiltradas.forEach((pieza) => {
      const precioPieza = obtenerPrecioPorMaterial(pieza.id, "SERIE 2");
      const textoPieza = `${pieza.id} ${pieza.nombre}${tejidoSeleccionado && tejidoSeleccionado !== 'None' ? ' / TEJIDO ' + tejidoSeleccionado : ''}`;
      const textoPrecio = `${precioPieza.toFixed(2)}€`;
      
      drawText(textoPieza, 70, yPosition, 8, helveticaFont, colorGris);
      drawText(textoPrecio, 480, yPosition, 8, helveticaFont, colorGris); // Cambiado de 500 a 480 para alinear con el encabezado
      yPosition -= 15;
    });
  }

  // Cojines
  if (cantidadCojines > 0) {
    const textoCojin = `COJÍN DE ADORNO 45X45 CM${tejidoSeleccionado && tejidoSeleccionado !== 'None' ? ' / TEJIDO ' + tejidoSeleccionado : ''}`;
    const textoPrecioCojin = `${precioUnitarioCojin.toFixed(2)}€ X${cantidadCojines}`;
    
    drawText(textoCojin, 70, yPosition, 8, helveticaFont, colorGris);
    drawText(textoPrecioCojin, 480, yPosition, 8, helveticaFont, colorGris); // Cambiado de 500 a 480 para alinear con el encabezado
    yPosition -= 20;
  }

  // Línea antes del total
  page.drawRectangle({
    x: 50, 
    y: yPosition, 
    width: 495, 
    height: 0.5,
    borderColor: colorLinea, 
    borderWidth: 0.5,
  });
  
  yPosition -= 20;

  // PRECIO TOTAL con +IVA y nota de portes
  drawText("*Portes no incluidos", 70, yPosition, 8, helveticaFont, colorGris);
  drawText("*Color de tejido a definir con representante", 70, yPosition - 12, 8, helveticaFont, colorGris);
  drawText("TOTAL", 415, yPosition, 10, helveticaBoldFont);
  drawText(`${precioTotal.toFixed(2)}€ +IVA`, 455, yPosition, 10, helveticaFont);

  // ============================================
  // CONDICIONES (PIE DE PÁGINA - bajado para evitar solapamiento)
  // ============================================
  const condicionesY = 50;
  const condicionesTexto = "*Presupuesto con validez de 60 días desde la fecha de emisión. Los plazos de entrega pueden variar según disponibilidad de tejidos. El valor no incluye portes. La fecha de emisión define la validez del presupuesto; el Nº de referencia permite localizarlo. Para más información consultar enviando un correo a hola@in-situ.io Para más información sobre el tejido seleccionado descargue las fichas técnicas desde nuestra web www.in-situ.io/tejidos";
  
  // Dividir el texto en líneas
  const maxWidth = 495;
  const palabras = condicionesTexto.split(' ');
  let lineas = [];
  let lineaActual = '';
  
  palabras.forEach(palabra => {
    const testLinea = lineaActual + (lineaActual ? ' ' : '') + palabra;
    const anchoLinea = helveticaFont.widthOfTextAtSize(testLinea, 7);
    
    if (anchoLinea > maxWidth) {
      lineas.push(lineaActual);
      lineaActual = palabra;
    } else {
      lineaActual = testLinea;
    }
  });
  
  if (lineaActual) {
    lineas.push(lineaActual);
  }
  
  // Dibujar las líneas
  let yCondiciones = condicionesY;
  lineas.forEach(linea => {
    drawText(linea, 50, yCondiciones, 7, helveticaFont, colorGris);
    yCondiciones -= 10;
  });

  // ============================================
  // GUARDAR Y DESCARGAR PDF
  // ============================================
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = `Presupuesto_${nombreCliente}_${numeroReferencia}.pdf`;
  link.click();
  
  URL.revokeObjectURL(url);
}

/*--------EVENT LISTENER PARA EL BOTÓN--------*/
document.addEventListener("DOMContentLoaded", function () {
  const botonPdf = document.getElementById("generarPdfBtn");
  
  if (botonPdf) {
    botonPdf.addEventListener("click", async function () {
      const nombreCliente = document.getElementById("nombreCliente").value.trim();
      
      // Validar que el nombre esté ingresado
      if (!nombreCliente) {
        alert("Por favor, ingrese el nombre del cliente");
        return;
      }
      
      // Validar que haya un tejido seleccionado
      const tejidoSeleccionado = document.getElementById("tejidos").value;
      if (!tejidoSeleccionado || tejidoSeleccionado === 'None' || tejidoSeleccionado === '') {
        alert("Por favor, seleccione un tejido/colección antes de generar el presupuesto");
        return;
      }
      
      // Validar que haya al menos una pieza seleccionada
      const piezasSeleccionadas = obtenerPiezasSeleccionadas();
      if (piezasSeleccionadas.length === 0) {
        alert("Por favor, seleccione al menos una pieza");
        return;
      }
      
      // Mostrar indicador de carga
      const textoOriginal = botonPdf.textContent;
      botonPdf.textContent = "Generando PDF...";
      botonPdf.disabled = true;
      botonPdf.style.cursor = "wait";
      
      // Generar el PDF
      try {
        await createPDF();
        botonPdf.textContent = "✓ PDF generado";
        setTimeout(() => {
          botonPdf.textContent = textoOriginal;
          botonPdf.disabled = false;
          botonPdf.style.cursor = "pointer";
        }, 2000);
      } catch (error) {
        console.error("Error generando PDF:", error);
        alert("Hubo un error al generar el PDF. Por favor, intente nuevamente.");
        botonPdf.textContent = textoOriginal;
        botonPdf.disabled = false;
        botonPdf.style.cursor = "pointer";
      }
    });
  }
});