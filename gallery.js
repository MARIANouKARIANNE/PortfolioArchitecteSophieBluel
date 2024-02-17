// requete HTTP GET pour récupérer fichier JSON " gallery.json"
const reponse = await fetch("gallery.json");
const gallery = await reponse.json();
// génére les éléments HTML à chaque projet dans la galerie
function genererprojet(gallery) {
  //parcours de chaque projet dans la galerie
  for (let i = 0; i < gallery.length; i++) {
    const article = gallery[i];

    const sectionGallery = document.querySelector(".galleryS");
    // création d'une div pour représenter chaque projet
    const photoElement = document.createElement("div");
    photoElement.classList.add("projet");
    photoElement.setAttribute("ArticleID", article.id);
    photoElement.setAttribute("ArticleCategroryName", article.category.name);
    // création élement img pour afficher l'image
    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    // création élément p pour afficher nom du projet
    const nomElement = document.createElement("p");
    nomElement.innerText = article.title;
    //ajout de l'élément "img" et "p" à "div"
    sectionGallery.appendChild(photoElement);

    photoElement.appendChild(imageElement);
    photoElement.appendChild(nomElement);
  }
}
// appel la fonction pour afficher tout les projets au chargement de la page
genererprojet(gallery);

const buttonfiltretous = document.querySelector(".filtretous");

buttonfiltretous.addEventListener("click", function () {
  const gallerytous = gallery.filter(function (projet) {
    // utilisation de l'id de l'user pour générer tout les projets d'un coup
    return projet.userId === 1;
  });
  document.querySelector(".galleryS").innerHTML = "";
  genererprojet(gallerytous);
});
// pour tout les autres boutons j'utilise leur category.id

const buttonfiltreobjets = document.querySelector(".filtreobjets");

buttonfiltreobjets.addEventListener("click", function () {
  const galleryobjet = gallery.filter(function (projet) {
    return projet.category.id === 1;
  });
  // efface le contenu de la gallery 
  document.querySelector(".galleryS").innerHTML = "";
  // génére uniquement les projets qui correspondent au filtre 
  genererprojet(galleryobjet);
});
const buttonfiltreappartement = document.querySelector(".filtreappartement");

buttonfiltreappartement.addEventListener("click", function () {
  const galleryappartement = gallery.filter(function (projet) {
    return projet.category.id === 2;
  });
  document.querySelector(".galleryS").innerHTML = "";
  genererprojet(galleryappartement);
});

const buttonfiltrehotelrestaurant = document.querySelector(
  ".filtrehotelrestaurant"
);

buttonfiltrehotelrestaurant.addEventListener("click", function () {
  const galleryhotelrestaurant = gallery.filter(function (projet) {
    return projet.category.id === 3;
  });
  document.querySelector(".galleryS").innerHTML = "";
  genererprojet(galleryhotelrestaurant);
});
