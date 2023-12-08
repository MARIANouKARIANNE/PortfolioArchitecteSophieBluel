const reponse = await fetch("gallery.json");
const gallery = await reponse.json();

function genererprojet(gallery) {
  for (let i = 0; i < gallery.length; i++) {
    const article = gallery[i];

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
      const iconeElement = article.id;
      let monToken = localStorage.getItem("token");
      console.log(iconeElement);
      let response = await fetch("http://localhost:5678/api/works/1", {
        method : "DELETE",
        headers : {
          accept : "*/*",
          authorization:`Bearer ${monToken}`,
        },
      }
    );
    if (response.ok){
      return false ;
    }
    else{
      alert("erreur lors de la supression");
    }

  })
}
}

genererprojet(gallery);
