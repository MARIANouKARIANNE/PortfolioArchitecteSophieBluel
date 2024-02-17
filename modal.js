let modal = null;

// fonction pour ouvrir la modale
const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  modal = target;
  // clique en dehors de la modale = modale fermée
  modal.addEventListener("click", closeModal);
  // clique sur le bouton croix = modale fermée
  modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
  // empeche la propagation de l'événement
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};
// fonction pour fermer la modale
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  //réinitialise la variable à null
  modal = null;
};

let add = null;

// fonction pour ouvir la partie ajout photo de la modale
const OpenAdd = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = null;
  add = target;
  add.addEventListener("click", OpenAdd);
  modal
    .querySelector(".bouton-stop")
    .addEventListener("click", stopPropagation);
};
// fonction pour l'élément d'ajout
const CloseAdd = function (e) {
  if (add === null) return;
  e.preventDefault();
  add.style.display = "none";
  add.addEventListener("click", closeModal);
};
// fonction pour retourner à la première partie de la modale
const returnmodal = function (e) {
  if (add === null) return;
  e.preventDefault();
  //masque l'élément
  add.style.display = "none";
  //ferme la partie ajout photo et affiche la partie gallerie
  add.addEventListener("click", CloseAdd);
  modal.querySelector(".js-return-bouton").addEventListener("click", CloseAdd);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};
// écouteur d'évenement  pour tout les cliques sur ".js-modal" pour ouvrir la modale
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal(e);
  }
});
// écouteur dévénementt pour tout les cliques sur ".js-bouton" qui ouvre la deuxième partie de la modale
document.querySelectorAll(".js-bouton").forEach((a) => {
  a.addEventListener("click", OpenAdd);
});
// écouteur pour revenir à la partie galerie de la modale
document.querySelectorAll(".js-return-bouton").forEach((a) => {
  a.addEventListener("click", CloseAdd);
});
