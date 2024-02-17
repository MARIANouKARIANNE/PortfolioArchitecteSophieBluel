// sélection des éléments HTML nécessaires
let emplacementphoto = document.getElementById("emplacementPhoto");
let inputFile = document.getElementById("input-file");
let DivPhoto = document.getElementById("divPhoto");
//récupération du token
const token = JSON.parse(localStorage.getItem("token"));
console.log("token =>", token);
// événement déclenché lors du changement de fichier sélectionné
inputFile.onchange = function () {
  //affichage de l'image sélectionné dans l'élément d'affichage
  emplacementphoto.src = URL.createObjectURL(inputFile.files[0]);
  // Div masqué quans une photo est dans l'élément d'affichage
  DivPhoto.style.display = "none";
};

const form = document.getElementById("form");
let selectedCategory;
//écouteur d'événement pour soumettre le formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // sélection de la catégorie choisie dans le select
  const categorySelect = document.getElementById(
    "categorySelect",
    selectedCategory
  );
  selectedCategory = categorySelect.value;
  // création d'un objet FormData contenant les donnés du formulaire
  const formData = new FormData(form);
  // la catégorie selectionné est ajouté au formulaire
  formData.append("categorySelect", selectedCategory);
  // envoie de la requete POST avec les données du formulaire
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
      const nouvellesDonneesElementbis = data;

      // création nouvel élement pour la gallerie
      const conteneurGalerie = document.querySelector(".galleryS");
      if (conteneurGalerie) {
        const nouvelElementGalerie = creerNouvelElementGalerie(
          nouvellesDonneesElement
        );
        conteneurGalerie.appendChild(nouvelElementGalerie.cloneNode(true));
      } else {
        console.log("Erreur : Conteneur de galerie non trouvé.");
      }

      // création  nouvel élément pour la gallerie modale
      const conteneurGalerieModale = document.querySelector(".gallerymodalS");
      if (conteneurGalerieModale) {
        const nouvelElementGalerieModale = creerNouvelElementGaleriebis(
          nouvellesDonneesElementbis
        );
        conteneurGalerieModale.appendChild(nouvelElementGalerieModale);
      } else {
        console.error("Erreur : Conteneur de galerie modale non trouvé.");
      }
      inputFile.value = "";
      updateLabelVisibility();
    })
    .catch((err) => {
      console.log("Erreur :", err);
    });
});

// créer un nouvel élement dans la galerie
function creerNouvelElementGalerie(data) {
  const nouvelElementGalerie = document.createElement("div");
  nouvelElementGalerie.innerHTML = `
    <img src="${data.imageUrl}" alt="${data.title}">
    <h4>${data.title}</h4>
   
  `;

  return nouvelElementGalerie;
}

// création d'un nouvel élément dans la galerie modale
function creerNouvelElementGaleriebis(data) {
  const nouvelElementGaleriebis = document.createElement("div");
  nouvelElementGaleriebis.innerHTML = `
    <img src="${data.imageUrl}" alt="${data.title}">
   
  `;
  const iconeElement = document.createElement("div");
  iconeElement.classList.add("deletePhoto");
  iconeElement.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  nouvelElementGaleriebis.appendChild(iconeElement);

  return nouvelElementGaleriebis;
}
