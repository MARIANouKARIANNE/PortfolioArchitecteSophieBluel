// récupérer la galerie depuis le backend
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

// génére les éléments HTML pour chaque projet dans la galerie
async function genererprojetFromBackend(gallery) {
  try {
    const sectionGallery = document.querySelector(".galleryS");

    for (let i = 0; i < gallery.length; i++) {
      const article = gallery[i];

      const photoElement = document.createElement("div");
      photoElement.classList.add("projet");
      photoElement.setAttribute("ArticleID", article.id);
      photoElement.setAttribute("ArticleCategroryName", article.category.name);

      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;

      const nomElement = document.createElement("p");
      nomElement.innerText = article.title;

      sectionGallery.appendChild(photoElement);
      photoElement.appendChild(imageElement);
      photoElement.appendChild(nomElement);
    }
  } catch (error) {
    console.log("Une erreur s'est produite lors de la génération des projets depuis le backend :", error);
  }
}

// appel la fonction pour afficher tous les projets au chargement de la page
fetchGalleryFromBackend()
  .then(gallery => {
    if (!gallery) {
      console.log("Impossible de récupérer les données de la galerie depuis le backend");
      return;
    }
    genererprojetFromBackend(gallery);
  })
  .catch(error => {
    console.log("Une erreur s'est produite lors de la récupération des données de la galerie depuis le backend :", error);
  });

// Filtrage des projets par catégorie
async function filtrerProjetParCategorie(categorieId) {
  try {
    const gallery = await fetchGalleryFromBackend();

    if (!gallery) {
      console.log("Impossible de récupérer les données de la galerie depuis le backend");
      return;
    }

    const galleryFiltree = gallery.filter(projet => projet.category.id === categorieId);

    const sectionGallery = document.querySelector(".galleryS");
    sectionGallery.innerHTML = ""; // efface le contenu de la galerie

    genererprojetFromBackend(galleryFiltree);
  } catch (error) {
    console.log("Une erreur s'est produite lors du filtrage des projets :", error);
  }
}


async function filtrerProjetParUtilisateur(userId) {
  try {
    const gallery = await fetchGalleryFromBackend();

    if (!gallery) {
      console.log("Impossible de récupérer les données de la galerie depuis le backend");
      return;
    }

    const galleryFiltree = gallery.filter(projet => projet.userId === userId);

    const sectionGallery = document.querySelector(".galleryS");
    sectionGallery.innerHTML = ""; // efface le contenu de la galerie

    genererprojetFromBackend(galleryFiltree);
  } catch (error) {
    console.log("Une erreur s'est produite lors du filtrage des projets :", error);
  }
}

// Filtrage par utilisateur ( un seul donc affiche tout les projets )
const buttonfiltretous = document.querySelector(".filtretous");
buttonfiltretous.addEventListener("click", () => {
  filtrerProjetParUtilisateur(1); // Utilise l'ID de l'utilisateur approprié
});

// Filtrage par catégorie
const buttonfiltreobjets = document.querySelector(".filtreobjets");
buttonfiltreobjets.addEventListener("click", () => {
  filtrerProjetParCategorie(1); // Utilise l'ID de catégorie approprié
});

const buttonfiltreappartement = document.querySelector(".filtreappartement");
buttonfiltreappartement.addEventListener("click", () => {
  filtrerProjetParCategorie(2); // Utilise l'ID de catégorie approprié
});

const buttonfiltrehotelrestaurant = document.querySelector(".filtrehotelrestaurant");
buttonfiltrehotelrestaurant.addEventListener("click", () => {
  filtrerProjetParCategorie(3); // Utilise l'ID de catégorie approprié
});