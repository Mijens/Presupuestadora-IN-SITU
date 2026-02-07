/*---------------PRECIOS AURA----------------------*/
const preciosAura = {
  comunAURM110D: [
    { material: "SERIE 2", precio: 985 },
    { material: "SERIE 3", precio: 1055 },
    { material: "SERIE 4", precio: 1126 },
    { material: "SERIE 5", precio: 1213 },
  ],
  comunAURM100D: [
    { material: "SERIE 2", precio: 954 },
    { material: "SERIE 3", precio: 1020 },
    { material: "SERIE 4", precio: 1086 },
    { material: "SERIE 5", precio: 1168 },
  ],
  comunAURM90D: [
    { material: "SERIE 2", precio: 926 },
    { material: "SERIE 3", precio: 987 },
    { material: "SERIE 4", precio: 1049 },
    { material: "SERIE 5", precio: 1126 },
  ],
  comunAURM80D: [
    { material: "SERIE 2", precio: 880 },
    { material: "SERIE 3", precio: 938 },
    { material: "SERIE 4", precio: 996 },
    { material: "SERIE 5", precio: 1070 },
  ],
  comunAURM110S: [
    { material: "SERIE 2", precio: 766 },
    { material: "SERIE 3", precio: 825 },
    { material: "SERIE 4", precio: 885 },
    { material: "SERIE 5", precio: 959 },
  ],
  comunAURM100S: [
    { material: "SERIE 2", precio: 734 },
    { material: "SERIE 3", precio: 789 },
    { material: "SERIE 4", precio: 844 },
    { material: "SERIE 5", precio: 913 },
  ],
  comunAURM90S: [
    { material: "SERIE 2", precio: 706 },
    { material: "SERIE 3", precio: 757 },
    { material: "SERIE 4", precio: 808 },
    { material: "SERIE 5", precio: 871 },
  ],
  comunAURM80S: [
    { material: "SERIE 2", precio: 671 },
    { material: "SERIE 3", precio: 719 },
    { material: "SERIE 4", precio: 767 },
    { material: "SERIE 5", precio: 827 },
  ],
  comunAURT110D: [
    { material: "SERIE 2", precio: 1103 },
    { material: "SERIE 3", precio: 1187 },
    { material: "SERIE 4", precio: 1271 },
    { material: "SERIE 5", precio: 1376 },
  ],
  comunAURT100D: [
    { material: "SERIE 2", precio: 1070 },
    { material: "SERIE 3", precio: 1151 },
    { material: "SERIE 4", precio: 1232 },
    { material: "SERIE 5", precio: 1333 },
  ],
  comunAURT90D: [
    { material: "SERIE 2", precio: 1044 },
    { material: "SERIE 3", precio: 1123 },
    { material: "SERIE 4", precio: 1202 },
    { material: "SERIE 5", precio: 1300 },
  ],
  comunAURT80D: [
    { material: "SERIE 2", precio: 992 },
    { material: "SERIE 3", precio: 1067 },
    { material: "SERIE 4", precio: 1142 },
    { material: "SERIE 5", precio: 1235 },
  ],
  comunAURC110D: [
    { material: "SERIE 2", precio: 1159 },
    { material: "SERIE 3", precio: 1243 },
    { material: "SERIE 4", precio: 1327 },
    { material: "SERIE 5", precio: 1433 },
  ],
  comunAURC100D: [
    { material: "SERIE 2", precio: 1124 },
    { material: "SERIE 3", precio: 1205 },
    { material: "SERIE 4", precio: 1286 },
    { material: "SERIE 5", precio: 1387 },
  ],
  comunAURC90D: [
    { material: "SERIE 2", precio: 1103 },
    { material: "SERIE 3", precio: 1181 },
    { material: "SERIE 4", precio: 1260 },
    { material: "SERIE 5", precio: 1359 },
  ],
  comunAURC80D: [
    { material: "SERIE 2", precio: 1047 },
    { material: "SERIE 3", precio: 1122 },
    { material: "SERIE 4", precio: 1197 },
    { material: "SERIE 5", precio: 1291 },
  ],
  comunAURR108S: [
    { material: "SERIE 2", precio: 930 },
    { material: "SERIE 3", precio: 995 },
    { material: "SERIE 4", precio: 1059 },
    { material: "SERIE 5", precio: 1140 },
  ],
  comunAURP60S: [
    { material: "SERIE 2", precio: 415 },
    { material: "SERIE 3", precio: 442 },
    { material: "SERIE 4", precio: 469 },
    { material: "SERIE 5", precio: 502 },
  ],
};
const piezasAura = [
  {
    id: "None",
    title: "Sin pieza seleccionada",
    imageUrl: "..",
    categoria: "AURA",
    medida: 0,
  },
  {
    id: "AURM110D",
    title: "Mód. 110 con brazo der. (136 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM110D.png",
    price: preciosAura.comunAURM110D,
    medida: 136,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM110I",
    title: "Mód. 110 con brazo izq. (136 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM110I.png",
    price: preciosAura.comunAURM110D,
    medida: 136,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM100D",
    title: "Mód. 100 con brazo der. (126 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM100D.png",
    price: preciosAura.comunAURM100D,
    medida: 126,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM100I",
    title: "Mód. 100 con brazo izq. (126 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM100I.png",
    price: preciosAura.comunAURM100D,
    medida: 126,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM90D",
    title: "Mód. 90 con brazo der. (116 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM90D.png",
    price: preciosAura.comunAURM90D,
    medida: 116,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM90I",
    title: "Mód. 90 con brazo izq. (116 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM90I.png",
    price: preciosAura.comunAURM90D,
    medida: 116,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM80D",
    title: "Mód. 80 con brazo der. (106 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM80D.png",
    price: preciosAura.comunAURM80D,
    medida: 106,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM80I",
    title: "Mód. 80 con brazo izq. (106 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM80I.png",
    price: preciosAura.comunAURM80D,
    medida: 106,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 108,
  },
  {
    id: "AURM110S",
    title: "Mód. 110 sin brazo (110 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM110S.png",
    price: preciosAura.comunAURM110S,
    medida: 110,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 108,
  },
  {
    id: "AURM100S",
    title: "Mód. 100 sin brazo (100 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM100S.png",
    price: preciosAura.comunAURM100S,
    medida: 100,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 108,
  },
  {
    id: "AURM90S",
    title: "Mód. 90 sin brazo (90 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM90S.png",
    price: preciosAura.comunAURM90S,
    medida: 90,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 108,
  },
  {
    id: "AURM80S",
    title: "Mód. 80 sin brazo (80 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURM80S.png",
    price: preciosAura.comunAURM80S,
    medida: 80,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 108,
  },
  {
    id: "AURT110D",
    title: "Terminal 110 derecho (160 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT110D.png",
    price: preciosAura.comunAURT110D,
    medida: 160,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT110I",
    title: "Terminal 110 izquierdo (160 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT110I.png",
    price: preciosAura.comunAURT110D,
    medida: 160,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT100D",
    title: "Terminal 100 derecho (150 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT100D.png",
    price: preciosAura.comunAURT100D,
    medida: 150,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT100I",
    title: "Terminal 100 izquierdo (150 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT100I.png",
    price: preciosAura.comunAURT100D,
    medida: 150,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT90D",
    title: "Terminal 90 derecho (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT90D.png",
    price: preciosAura.comunAURT90D,
    medida: 140,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT90I",
    title: "Terminal 90 izquierdo (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT90I.png",
    price: preciosAura.comunAURT90D,
    medida: 140,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT80D",
    title: "Terminal 80 derecho (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT80D.png",
    price: preciosAura.comunAURT80D,
    medida: 130,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURT80I",
    title: "Terminal 80 izquierdo (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURT80I.png",
    price: preciosAura.comunAURT80D,
    medida: 130,
    categoria: "TERMINAL",
    medidap: 108,
  },
  {
    id: "AURC110D",
    title: "Chaise longue 110 der. (136 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC110D.png",
    price: preciosAura.comunAURC110D,
    medida: 136,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC110I",
    title: "Chaise longue 110 izq. (136 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC110I.png",
    price: preciosAura.comunAURC110D,
    medida: 136,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC100D",
    title: "Chaise longue 100 der. (126 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC100D.png",
    price: preciosAura.comunAURC100D,
    medida: 126,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC100I",
    title: "Chaise longue 100 izq. (126 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC100I.png",
    price: preciosAura.comunAURC100D,
    medida: 126,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC90D",
    title: "Chaise longue 90 der. (116 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC90D.png",
    price: preciosAura.comunAURC90D,
    medida: 116,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC90I",
    title: "Chaise longue 90 izq. (116 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC90I.png",
    price: preciosAura.comunAURC90D,
    medida: 116,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC80D",
    title: "Chaise longue 80 der. (106 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC80D.png",
    price: preciosAura.comunAURC80D,
    medida: 106,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURC80I",
    title: "Chaise longue 80 izq. (106 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURC80I.png",
    price: preciosAura.comunAURC80D,
    medida: 106,
    categoria: "CHAISE LONGUE",
    medidap: 165,
  },
  {
    id: "AURP60S",
    title: "Pouff (60 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURP60S.png",
    price: preciosAura.comunAURP60S,
    medida: 60,
    categoria: "POUFF",
    medidap: 108,
  },
  {
    id: "AURR108S",
    title: "Rincón cerrado (108 cm) *incluye 3 cojínes 45x45",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/AURR108S.png",
    price: preciosAura.comunAURR108S,
    medida: 108,
    categoria: "RINCÓN",
    medidap: 108,
  },
];const fundaAura = [
  // --- FUNDAS CHAISE LONGUE ---
  {
    id: "AURC80DF",
    title: "FUNDA CHAISE LONGUE 80 DER.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 383 },
      { material: "SERIE 3", precio: 439 },
      { material: "SERIE 4", precio: 494 },
      { material: "SERIE 5", precio: 564 },
    ],
  },
  {
    id: "AURC80IF",
    title: "FUNDA CHAISE LONGUE 80 IZQ.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 383 },
      { material: "SERIE 3", precio: 439 },
      { material: "SERIE 4", precio: 494 },
      { material: "SERIE 5", precio: 564 },
    ],
  },
  {
    id: "AURC90DF",
    title: "FUNDA CHAISE LONGUE 90 DER.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 404 },
      { material: "SERIE 3", precio: 462 },
      { material: "SERIE 4", precio: 520 },
      { material: "SERIE 5", precio: 593 },
    ],
  },
  {
    id: "AURC90IF",
    title: "FUNDA CHAISE LONGUE 90 IZQ.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 404 },
      { material: "SERIE 3", precio: 462 },
      { material: "SERIE 4", precio: 520 },
      { material: "SERIE 5", precio: 593 },
    ],
  },
  {
    id: "AURC100DF",
    title: "FUNDA CHAISE LONGUE 100 DER.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 407 },
      { material: "SERIE 3", precio: 467 },
      { material: "SERIE 4", precio: 527 },
      { material: "SERIE 5", precio: 602 },
    ],
  },
  {
    id: "AURC100IF",
    title: "FUNDA CHAISE LONGUE 100 IZQ.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 407 },
      { material: "SERIE 3", precio: 467 },
      { material: "SERIE 4", precio: 527 },
      { material: "SERIE 5", precio: 602 },
    ],
  },
  {
    id: "AURC110DF",
    title: "FUNDA CHAISE LONGUE 110 DER.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 412 },
      { material: "SERIE 3", precio: 474 },
      { material: "SERIE 4", precio: 536 },
      { material: "SERIE 5", precio: 614 },
    ],
  },
  {
    id: "AURC110IF",
    title: "FUNDA CHAISE LONGUE 110 IZQ.",
    categoria: "FUNDAS CHAISE LONGUE",
    price: [
      { material: "SERIE 2", precio: 412 },
      { material: "SERIE 3", precio: 474 },
      { material: "SERIE 4", precio: 536 },
      { material: "SERIE 5", precio: 614 },
    ],
  },

  // --- FUNDAS MÓDULOS CON BRAZO ---
  {
    id: "AURM80DF",
    title: "FUNDA MÓD. 80 CON BRAZO DER.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 359 },
      { material: "SERIE 3", precio: 402 },
      { material: "SERIE 4", precio: 446 },
      { material: "SERIE 5", precio: 500 },
    ],
  },
  {
    id: "AURM80IF",
    title: "FUNDA MÓD. 80 CON BRAZO IZQ.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 359 },
      { material: "SERIE 3", precio: 402 },
      { material: "SERIE 4", precio: 446 },
      { material: "SERIE 5", precio: 500 },
    ],
  },
  {
    id: "AURM90DF",
    title: "FUNDA MÓD. 90 CON BRAZO DER.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 378 },
      { material: "SERIE 3", precio: 424 },
      { material: "SERIE 4", precio: 469 },
      { material: "SERIE 5", precio: 526 },
    ],
  },
  {
    id: "AURM90IF",
    title: "FUNDA MÓD. 90 CON BRAZO IZQ.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 378 },
      { material: "SERIE 3", precio: 424 },
      { material: "SERIE 4", precio: 469 },
      { material: "SERIE 5", precio: 526 },
    ],
  },
  {
    id: "AURM100DF",
    title: "FUNDA MÓD. 100 CON BRAZO DER.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 384 },
      { material: "SERIE 3", precio: 433 },
      { material: "SERIE 4", precio: 482 },
      { material: "SERIE 5", precio: 543 },
    ],
  },
  {
    id: "AURM100IF",
    title: "FUNDA MÓD. 100 CON BRAZO IZQ.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 384 },
      { material: "SERIE 3", precio: 433 },
      { material: "SERIE 4", precio: 482 },
      { material: "SERIE 5", precio: 543 },
    ],
  },
  {
    id: "AURM110DF",
    title: "FUNDA MÓD. 110 CON BRAZO DER.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 391 },
      { material: "SERIE 3", precio: 443 },
      { material: "SERIE 4", precio: 495 },
      { material: "SERIE 5", precio: 560 },
    ],
  },
  {
    id: "AURM110IF",
    title: "FUNDA MÓD. 110 CON BRAZO IZQ.",
    categoria: "FUNDAS MÓDULOS CON BRAZO",
    price: [
      { material: "SERIE 2", precio: 391 },
      { material: "SERIE 3", precio: 443 },
      { material: "SERIE 4", precio: 495 },
      { material: "SERIE 5", precio: 560 },
    ],
  },

  // --- FUNDAS MÓDULOS SIN BRAZO ---
  {
    id: "AURM110SF",
    title: "FUNDA MÓD. 110 SIN BRAZO",
    categoria: "FUNDAS MÓDULOS SIN BRAZO",
    price: [
      { material: "SERIE 2", precio: 345 },
      { material: "SERIE 3", precio: 389 },
      { material: "SERIE 4", precio: 433 },
      { material: "SERIE 5", precio: 488 },
    ],
  },
  {
    id: "AURM100SF",
    title: "FUNDA MÓD. 100 SIN BRAZO",
    categoria: "FUNDAS MÓDULOS SIN BRAZO",
    price: [
      { material: "SERIE 2", precio: 338 },
      { material: "SERIE 3", precio: 379 },
      { material: "SERIE 4", precio: 420 },
      { material: "SERIE 5", precio: 471 },
    ],
  },
  {
    id: "AURM90SF",
    title: "FUNDA MÓD. 90 SIN BRAZO",
    categoria: "FUNDAS MÓDULOS SIN BRAZO",
    price: [
      { material: "SERIE 2", precio: 332 },
      { material: "SERIE 3", precio: 370 },
      { material: "SERIE 4", precio: 407 },
      { material: "SERIE 5", precio: 454 },
    ],
  },
  {
    id: "AURM80SF",
    title: "FUNDA MÓD. 80 SIN BRAZO",
    categoria: "FUNDAS MÓDULOS SIN BRAZO",
    price: [
      { material: "SERIE 2", precio: 315 },
      { material: "SERIE 3", precio: 351 },
      { material: "SERIE 4", precio: 387 },
      { material: "SERIE 5", precio: 431 },
    ],
  },

  // --- FUNDA POUFF ---
  {
    id: "AURP60SF",
    title: "FUNDA POUFF",
    categoria: "FUNDA POUFF",
    price: [
      { material: "SERIE 2", precio: 280 },
      { material: "SERIE 3", precio: 300 },
      { material: "SERIE 4", precio: 320 },
      { material: "SERIE 5", precio: 345 },
    ],
  },

  // --- FUNDA RINCÓN ---
  {
    id: "AURR108SF",
    title: "FUNDA RINCÓN CERRADO",
    categoria: "FUNDA RINCÓN",
    price: [
      { material: "SERIE 2", precio: 383 },
      { material: "SERIE 3", precio: 431 },
      { material: "SERIE 4", precio: 479 },
      { material: "SERIE 5", precio: 539 },
    ],
  },

  // --- FUNDAS TERMINAL ---
  {
    id: "AURT80DF",
    title: "FUNDA TERMINAL 80 DER.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 383 },
      { material: "SERIE 3", precio: 439 },
      { material: "SERIE 4", precio: 494 },
      { material: "SERIE 5", precio: 564 },
    ],
  },
  {
    id: "AURT80IF",
    title: "FUNDA TERMINAL 80 IZQ.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 383 },
      { material: "SERIE 3", precio: 439 },
      { material: "SERIE 4", precio: 494 },
      { material: "SERIE 5", precio: 564 },
    ],
  },
  {
    id: "AURT90DF",
    title: "FUNDA TERMINAL 90 DER.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 404 },
      { material: "SERIE 3", precio: 462 },
      { material: "SERIE 4", precio: 520 },
      { material: "SERIE 5", precio: 593 },
    ],
  },
  {
    id: "AURT90IF",
    title: "FUNDA TERMINAL 90 IZQ.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 404 },
      { material: "SERIE 3", precio: 462 },
      { material: "SERIE 4", precio: 520 },
      { material: "SERIE 5", precio: 593 },
    ],
  },
  {
    id: "AURT100DF",
    title: "FUNDA TERMINAL 100 DER.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 407 },
      { material: "SERIE 3", precio: 467 },
      { material: "SERIE 4", precio: 527 },
      { material: "SERIE 5", precio: 602 },
    ],
  },
  {
    id: "AURT100IF",
    title: "FUNDA TERMINAL 100 IZQ.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 407 },
      { material: "SERIE 3", precio: 467 },
      { material: "SERIE 4", precio: 527 },
      { material: "SERIE 5", precio: 602 },
    ],
  },
  {
    id: "AURT110DF",
    title: "FUNDA TERMINAL 110 DER.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 412 },
      { material: "SERIE 3", precio: 474 },
      { material: "SERIE 4", precio: 536 },
      { material: "SERIE 5", precio: 614 },
    ],
  },
  {
    id: "AURT110IF",
    title: "FUNDA TERMINAL 110 IZQ.",
    categoria: "FUNDAS TERMINAL",
    price: [
      { material: "SERIE 2", precio: 412 },
      { material: "SERIE 3", precio: 474 },
      { material: "SERIE 4", precio: 536 },
      { material: "SERIE 5", precio: 614 },
    ],
  },
];
