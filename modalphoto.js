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
    .then((res) => res.text())
    .then((data) => {
      console.log(data);

      
    })
    .catch((err) => console.log(err));
});



