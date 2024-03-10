async function fetchGalleryFromBackend() {
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer les données de la galerie depuis le backend");
    }

    const gallery = await response.json();
    return gallery;
  } catch (error) {
    console.log("Une erreur s'est produite lors de la récupération des données de la galerie depuis le backend :", error);
    return null;
  }
}

async function supprimerProjet(projetId) {
  try {
    const token = localStorage.getItem("token");
    console.log("token =>", token);

    const projetElement = document.querySelector(`[ArticleID="${projetId}"]`);
    console.log(projetElement);

    const response = await fetch(`http://localhost:5678/api/works/${projetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.ok) {
      const projetElement = document.querySelector(`[ArticleID="${projetId}"]`);
      if (projetElement) {
        projetElement.remove();
        console.log(`Projet avec l'ID ${projetId} supprimé de la galerie principale`);
      } else {
        console.log(
          `L'élément avec l'ID ${projetId} n'a pas été trouvé dans la galerie principale.`
        );
      }

      const modalGalerieElement = document.querySelector(
        `[ArticleID="${projetId}"]`
      );
      if (modalGalerieElement) {
        modalGalerieElement.remove();
        console.log(`Projet avec l'ID ${projetId} supprimé de la galerie modale`);
      } else {
        console.log(
          `L'élément avec l'ID ${projetId} n'a pas été trouvé dans la galerie modale.`
        );
      }
    } else {
      console.log("Échec de la suppression du projet");
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression du projet :", error);
  }
}

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

    const iconeElement = document.createElement("div");
    iconeElement.classList.add("deletePhoto");
    iconeElement.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    sectionGallery.appendChild(photoElement);
    photoElement.appendChild(imageElement);
    photoElement.appendChild(iconeElement);

    iconeElement.addEventListener("click", () => {
      supprimerProjet(article.id);
    });
  }
}

const gallery = await fetchGalleryFromBackend();
genererprojet(gallery);