const reponse = await fetch("gallery.json");
const gallery = await reponse.json();

function genererprojet(gallery) {
  for (let i = 0; i < gallery.length; i++) {

    const article = gallery[i];

    const sectionGallery = document.querySelector(".galleryS");

    const photoElement = document.createElement("div");
    photoElement.classList.add("projet");

    const imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    const nomElement = document.createElement("p");
    nomElement.innerText = article.title;

    sectionGallery.appendChild(photoElement);

    photoElement.appendChild(imageElement);
    photoElement.appendChild(nomElement);
  }
}

genererprojet(gallery);

const buttonfiltretous = document.querySelector(".filtretous");

buttonfiltretous.addEventListener("click", function () {
  const gallerytous = gallery.filter(function (projet) {
    return projet.userId === 1;
  });
  document.querySelector(".galleryS").innerHTML = "";
  genererprojet(gallerytous);
});

const buttonfiltreobjets = document.querySelector(".filtreobjets");

buttonfiltreobjets.addEventListener("click", function () {
  const galleryobjet = gallery.filter(function (projet) {
    return projet.category.id === 1;
  });
  document.querySelector(".galleryS").innerHTML = "";
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

const buttonfiltrehotelrestaurant = document.querySelector(".filtrehotelrestaurant");

buttonfiltrehotelrestaurant.addEventListener("click", function () {
  const galleryhotelrestaurant = gallery.filter(function (projet) {
    return projet.category.id === 3;
  });
  document.querySelector(".galleryS").innerHTML = "";
  genererprojet(galleryhotelrestaurant);
});
