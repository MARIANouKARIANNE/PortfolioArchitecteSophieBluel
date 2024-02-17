// effectue une requete HTTP GET pour récupérer le fichier JSON
const reponse = await fetch("gallery.json");
const gallery = await reponse.json();
//récupère le token d'authentiication depuis le localStorage
const token = JSON.parse(localStorage.getItem("token"));
console.log("token =>", token);
// fonction pour générer les éléments HTML correspondant à chaque projet dans la gallerie
function genererprojet(gallery) {
  for (let i = 0; i < gallery.length; i++) {
    const article = gallery[i];
    console.log("article", article);

    const sectionGallery = document.querySelector(".gallerymodalS");

    const photoElement = document.createElement("div");
    photoElement.classList.add("projet");
    photoElement.setAttribute("ArticleID", article.id);
    photoElement.setAttribute("ArticleCategroryName", article.category.name);

    const imageElement = document.createElement("img");
    imageElement.classList.add("photomodal");
    imageElement.src = article.imageUrl;
    // création d'une div pour l'icone de supppresion du projet
    const iconeElement = document.createElement("div");

    iconeElement.classList.add("deletePhoto");
    iconeElement.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    sectionGallery.appendChild(photoElement);

    photoElement.appendChild(imageElement);

    photoElement.appendChild(iconeElement);
    // écouteur d'évenement au clique sur le bouton de supression
    iconeElement.addEventListener("click", () => {
      supprimerProjet(article.id);
    });
  }
}

// fonction asynchrone pour supprimer le projet
async function supprimerProjet(projetId) {
  console.log(projetId);
  //sélectionne l'élement HTML correspondant au projet à supprimer
  const projetElement = document.querySelector(`[ArticleID="${projetId}"]`);
  console.log(projetElement);
  try {
    // Effectue une requete HTTP DELETE pour supprimer le projet à l'id correspondant
    const response = await fetch(
      `http://localhost:5678/api/works/${projetId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // verifie que suppression c'esr déroulé correctement µP
    if (response.ok) {
      // supprime l'élément correspondant au projet de la galerie
      const projetElement = document.querySelector(`[ArticleID="${projetId}"]`);
      if (projetElement) {
        projetElement.remove();
        console.log(`Projet avec l'ID ${projetId} supprimé de #galleryS`);
      } else {
        console.log(
          `L'élément avec l'ID ${projetId} n'a pas été trouvé dans #galleryS.`
        );
      }

      // supprime l'élément correspondant au projet de la galerie modale
      const modalGalerieElement = document.querySelector(
        `[ArticleID="${projetId}"]`
      );
      if (modalGalerieElement) {
        modalGalerieElement.remove();
        console.log(`Projet avec l'ID ${projetId} supprimé de #gallerymodalS`);
      } else {
        console.log(
          `L'élément avec l'ID ${projetId} n'a pas été trouvé dans #gallerymodalS.`
        );
      }
    } else {
      console.log("Échec de la suppression du projet");
    }
  } catch (error) {
    console.log("Erreur lors de la suppression du projet:", error);
  }
}
// apelle de la fonction qui génére les projets de la gallerie modale
genererprojet(gallery);
