const reponse = await fetch("gallery.json");
const gallery = await reponse.json();
const token = JSON.parse(localStorage.getItem("token"))
console.log("token =>",token)

function genererprojet(gallery) {
  for (let i = 0; i < gallery.length; i++) {
    const article = gallery[i];
console.log("article", article)

    const sectionGallery = document.querySelector(".gallerymodalS");

    const photoElement = document.createElement("div");
    photoElement.classList.add("projet");

    const imageElement = document.createElement("img");
    imageElement.classList.add("photomodal");
    imageElement.src = article.imageUrl;

    const iconeElement = document.createElement("div");
    
    iconeElement.classList.add("deletePhoto");
    iconeElement.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    sectionGallery.appendChild(photoElement);

    photoElement.appendChild(imageElement);

    photoElement.appendChild(iconeElement);

    iconeElement.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const projetID = 1;
      let monToken = localStorage.getItem("token");
    console.log("monToken", monToken )
      try {
        let response = await fetch(`http://localhost:5678/api/works/${projetID}`, {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${monToken}`,
          },
        });
    
        if (response.ok) {
          
          photoElement.remove();
        } else {
          
          console.error("Erreur lors de la suppression du projet - Statut :", response.status);
          console.error("Message d'erreur :", response.statusText);
          alert("Erreur lors de la suppression du projet");
        }
      } catch (error) {
        
        console.error("Erreur :", error);
        alert("Erreur lors de la suppression du projet");
      }
    });
}
}

genererprojet(gallery);
