const preciosVera = {
  comunVERM110D: [
    { material: "SERIE 2", precio: 1034 },
    { material: "SERIE 3", precio: 1104 },
    { material: "SERIE 4", precio: 1174 },
    { material: "SERIE 5", precio: 1262 },
  ],
  comunVERM100D: [
    { material: "SERIE 2", precio: 1002 },
    { material: "SERIE 3", precio: 1068 },
    { material: "SERIE 4", precio: 1134 },
    { material: "SERIE 5", precio: 1217 },
  ],
  comunVERM90D: [
    { material: "SERIE 2", precio: 981 },
    { material: "SERIE 3", precio: 1043 },
    { material: "SERIE 4", precio: 1104 },
    { material: "SERIE 5", precio: 1181 },
  ],
  comunVERM80D: [
    { material: "SERIE 2", precio: 932 },
    { material: "SERIE 3", precio: 990 },
    { material: "SERIE 4", precio: 1049 },
    { material: "SERIE 5", precio: 1122 },
  ],
  sinBrazo110: [
    { material: "SERIE 2", precio: 807 },
    { material: "SERIE 3", precio: 867 },
    { material: "SERIE 4", precio: 926 },
    { material: "SERIE 5", precio: 1001 },
  ],
  sinBrazo100: [
    { material: "SERIE 2", precio: 776 },
    { material: "SERIE 3", precio: 831 },
    { material: "SERIE 4", precio: 886 },
    { material: "SERIE 5", precio: 955 },
  ],
  sinBrazo90: [
    { material: "SERIE 2", precio: 748 },
    { material: "SERIE 3", precio: 799 },
    { material: "SERIE 4", precio: 850 },
    { material: "SERIE 5", precio: 913 },
  ],
  sinBrazo80: [
    { material: "SERIE 2", precio: 711 },
    { material: "SERIE 3", precio: 759 },
    { material: "SERIE 4", precio: 807 },
    { material: "SERIE 5", precio: 867 },
  ],
  terminal110: [
    { material: "SERIE 2", precio: 1096 },
    { material: "SERIE 3", precio: 1181 },
    { material: "SERIE 4", precio: 1265 },
    { material: "SERIE 5", precio: 1370 },
  ],
  terminal100: [
    { material: "SERIE 2", precio: 1063 },
    { material: "SERIE 3", precio: 1144 },
    { material: "SERIE 4", precio: 1225 },
    { material: "SERIE 5", precio: 1327 },
  ],
  terminal90: [
    { material: "SERIE 2", precio: 1045 },
    { material: "SERIE 3", precio: 1123 },
    { material: "SERIE 4", precio: 1202 },
    { material: "SERIE 5", precio: 1301 },
  ],
  terminal80: [
    { material: "SERIE 2", precio: 992 },
    { material: "SERIE 3", precio: 1067 },
    { material: "SERIE 4", precio: 1142 },
    { material: "SERIE 5", precio: 1236 },
  ],
  chaise110: [
    { material: "SERIE 2", precio: 1207 },
    { material: "SERIE 3", precio: 1291 },
    { material: "SERIE 4", precio: 1376 },
    { material: "SERIE 5", precio: 1481 },
  ],
  chaise100: [
    { material: "SERIE 2", precio: 1172 },
    { material: "SERIE 3", precio: 1253 },
    { material: "SERIE 4", precio: 1334 },
    { material: "SERIE 5", precio: 1435 },
  ],
  chaise90: [
    { material: "SERIE 2", precio: 1151 },
    { material: "SERIE 3", precio: 1230 },
    { material: "SERIE 4", precio: 1308 },
    { material: "SERIE 5", precio: 1407 },
  ],
  chaise80: [
    { material: "SERIE 2", precio: 1093 },
    { material: "SERIE 3", precio: 1168 },
    { material: "SERIE 4", precio: 1243 },
    { material: "SERIE 5", precio: 1337 },
  ],
  rincon: [
    { material: "SERIE 2", precio: 1073 },
    { material: "SERIE 3", precio: 1160 },
    { material: "SERIE 4", precio: 1246 },
    { material: "SERIE 5", precio: 1354 },
  ],
  pouf: [
    { material: "SERIE 2", precio: 427 },
    { material: "SERIE 3", precio: 454 },
    { material: "SERIE 4", precio: 481 },
    { material: "SERIE 5", precio: 515 },
  ],
};
const piezasVera = [
  {
    id: "None",
    title: "Sin pieza seleccionada",
    imageUrl: "..",
    categoria: "VERA",
  },
  // New pieces with arms added below
  {
    id: "VERM11OD",
    title: "Mód. 110 con brazo der. (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM110D.png",
    price: preciosVera.comunVERM110D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 140,
  },
  {
    id: "VERM11OI",
    title: "Mód. 110 con brazo izq. (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM110I.png",
    price: preciosVera.comunVERM110D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 140,
  },
  {
    id: "VERM100D",
    title: "Mód. 100 con brazo der. (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM100D.png",
    price: preciosVera.comunVERM100D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 130,
  },
  {
    id: "VERM100I",
    title: "Mód. 100 con brazo izq. (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM100I.png",
    price: preciosVera.comunVERM100D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 130,
  },
  {
    id: "VERM90D",
    title: "Mód. 90 con brazo der. (120 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM90D.png",
    price: preciosVera.comunVERM90D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 120,
  },
  {
    id: "VERM90I",
    title: "Mód. 90 con brazo izq. (120 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM90I.png",
    price: preciosVera.comunVERM90D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 120,
  },
  {
    id: "VERM80D",
    title: "Mód. 80 con brazo der. (110 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM80D.png",
    price: preciosVera.comunVERM80D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 100,
  },
  {
    id: "VERM80I",
    title: "Mód. 80 con brazo izq. (110 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM80I.png",
    price: preciosVera.comunVERM80D,
    categoria: "MÓDULOS CON BRAZO",
    medidap: 112,
    medida: 110,
  },
  {
    id: "VERM110S",
    title: "Mód. 110 sin brazo (110 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM110S.png",
    price: preciosVera.sinBrazo110,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 112,
    medida: 110,
  },
  {
    id: "VERM100S",
    title: "Mód. 100 sin brazo (100 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM100S.png",
    price: preciosVera.sinBrazo100,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 112,
    medida: 100,
  },
  {
    id: "VERM90S",
    title: "Mód. 90 sin brazo (90 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM90S.png",
    price: preciosVera.sinBrazo90,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 112,
    medida: 90,
  },
  {
    id: "VERM80S",
    title: "Mód. 80 sin brazo (80 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERM80S.png",
    price: preciosVera.sinBrazo80,
    categoria: "MÓDULOS SIN BRAZO",
    medidap: 112,
    medida: 80,
  },
  
  {
    id: "VERT110D",
    title: "Terminal 110 der. (160 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT110D.png",
    price: preciosVera.terminal110,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 160,
  },
  {
    id: "VERT110I",
    title: "Terminal 110 izq. (160 cm)",
    imageUrl:
    "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT110I.png",
    price: preciosVera.terminal110,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 160,
  },
  {
    id: "VERT100D",
    title: "Terminal 100 der. (150 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT100D.png",
    price: preciosVera.terminal100,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 150,
  },
  {
    id: "VERT100I",
    title: "Terminal 100 izq. (150 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT100I.png",
    price: preciosVera.terminal100,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 150,
  },
  {
    id: "VERT90D",
    title: "Terminal 90 der. (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT90D.png",
    price: preciosVera.terminal90,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 140,
  },
  {
    id: "VERT90I",
    title: "Terminal 90 izq. (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT90I.png",
    price: preciosVera.terminal90,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 140,
  },
  {
    id: "VERT80D",
    title: "Terminal 80 der. (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT80D.png",
    price: preciosVera.terminal80,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 130,
  },
  {
    id: "VERT80I",
    title: "Terminal 80 izq. (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERT80I.png",
    price: preciosVera.terminal80,
    categoria: "TERMINALES",
    medidap: 112,
    medida: 130,
  },
  {
    id: "VERC110D",
    title: "Chaise Longue 110 der. (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC110D.png",
    price: preciosVera.chaise110,
    categoria: "CHAISE",
    medidap: 110,
    medida: 165,
  },
  {
    id: "VERC110I",
    title: "Chaise Longue 110 izq. (140 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC110I.png",
    price: preciosVera.chaise110,
    categoria: "CHAISE",
    medidap: 165,
    medida: 140,
  },
  {
    id: "VERC100D",
    title: "Chaise Longue 100 der. (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC100D.png",
    price: preciosVera.chaise100,
    categoria: "CHAISE",
    medidap: 165,
    medida: 130,
  },
  {
    id: "VERC100I",
    title: "Chaise Longue 100 izq. (130 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC100I.png",
    price: preciosVera.chaise100,
    categoria: "CHAISE",
    medidap: 165,
    medida: 130,
  },
  {
    id: "VERC90D",
    title: "Chaise Longue 90 der. (120 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC90D.png",
    price: preciosVera.chaise90,
    categoria: "CHAISE",
    medidap: 165,
    medida: 120,
  },
  {
    id: "VERC90I",
    title: "Chaise Longue 90 izq. (120 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC90I.png",
    price: preciosVera.chaise90,
    categoria: "CHAISE",
    medidap: 165,
    medida: 120,
  },
  {
    id: "VERC80D",
    title: "Chaise Longue 80 der. (110 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC80D.png",
    price: preciosVera.chaise80,
    categoria: "CHAISE",
    medidap: 165,
    medida: 110,
  },
  {
    id: "VERC80I",
    title: "Chaise Longue 80 izq. (110 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERC80I.png",
    price: preciosVera.chaise80,
    categoria: "CHAISE",
    medidap: 165,
    medida: 110,
  },
  {
    id: "VERR108S",
    title: "Rincón cerrado (112 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERR108S.png",
    price: preciosVera.rincon,
    categoria: "RINCON",
    medida: 112,
    medidap: 112,
  },
  {
    id: "VERP60S",
    title: "Pouff (60 cm)",
    imageUrl:
      "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/VERP60S.png",
    price: preciosVera.pouf,
    categoria: "POUFF",
    medidap: 112,
    medida: 60,
  },
];
