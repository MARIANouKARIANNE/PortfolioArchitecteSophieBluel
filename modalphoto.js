let emplacementphoto = document.getElementById("emplacementPhoto");
let inputFile = document.getElementById("input-file");
const token = JSON.parse(localStorage.getItem("token"));
console.log("token =>", token);

inputFile.onchange = function () {
  emplacementphoto.src = URL.createObjectURL(inputFile.files[0]);
};

const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Le serveur a répondu avec le statut ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Réponse du serveur :", data);

      
      const nouvellesDonneesElement = data;

      
      const conteneurGalerie = document.querySelector(".galleryS");
      if (conteneurGalerie) {
        const nouvelElementGalerie = creerNouvelElementGalerie(nouvellesDonneesElement);
        conteneurGalerie.appendChild(nouvelElementGalerie.cloneNode(true));
      } else {
        console.error("Erreur : Conteneur de galerie non trouvé.");
      }

      
      const conteneurGalerieModale = document.querySelector(".gallerymodalS");
      if (conteneurGalerieModale) {
        const nouvelElementGalerieModale = creerNouvelElementGalerie(nouvellesDonneesElement);
        conteneurGalerieModale.appendChild(nouvelElementGalerieModale);
      } else {
        console.error("Erreur : Conteneur de galerie modale non trouvé.");
      }
    })
    .catch((err) => {
      console.error("Erreur :", err);
    });
});

function creerNouvelElementGalerie(data) {
  
  const nouvelElementGalerie = document.createElement("div");
  nouvelElementGalerie.innerHTML = `
    <img src="${data.imageUrl}" alt="${data.title}">
    <h4>${data.title}</h4>
    <p>${data.category}</p>
  `;

  return nouvelElementGalerie;
}

