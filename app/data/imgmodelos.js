const modeloImg = {
  Bianca: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/BIANCA/IMAGEN_BIANCA.png",
    },
  ],
  Vera: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/VERA/IMAGEN_VERA.png",
    },
  ],
  Luna: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/LUNA/IMAGEN_LUNA.png",
    },
  ],
  Aura: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/AURA/IMAGEN_AURA.png",
    },
  ],
  Nora: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/NORA/IMAGEN_NORA.png",
    },
  ],
  Dafne: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/DAFNE/IMAGEN_DAFNE.png",
    },
  ],
  Olivia: [
    {
      img: "https://francokohler.github.io/SPresupuestadoraImg/MODELOS/OLIVIA/IMAGEN_OLIVIA.png",
    },
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  const modeloSelect = document.getElementById("modelo");
  const divReferencia = document.getElementById("imgReferencia");

  function actualizarImgSegunModelo() {
    const modeloSeleccionado = modeloSelect.value;

    divReferencia.innerHTML = "";

    const newImg = document.createElement("img");

    if (modeloImg[modeloSeleccionado]) {
      newImg.src = modeloImg[modeloSeleccionado][0].img;
      newImg.alt = modeloSeleccionado;
      newImg.classList.add("referencia-img");
      divReferencia.appendChild(newImg);
    }
  }

  modeloSelect.addEventListener("change", actualizarImgSegunModelo);

  actualizarImgSegunModelo();
});
