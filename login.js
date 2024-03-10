const form = document.querySelector(".form");
const errorMessage = document.getElementById ("errorMessage");
form.addEventListener("click",(e)=> {
    e.preventDefault();
    const email = document.querySelector ("#email").value;
    const password = document.querySelector("#password").value;
    console.log("email:", email);
    console.log("password :" , password);
    if (!email || !password) {
        document.getElementById("errorMessage").innerHTML="merci de bien vouloir remplir les champs" ;
        return;
    }
    // envoie d'une requete POST vers l'API avec les infos d'identification
    fetch ("http://localhost:5678/api/users/login", {
        method : "POST",
        headers : {
            accept : "application/json",
            "content-type":"application/json",
        },
        body:JSON.stringify({email : email, password:password}),
    })
    .then ((authResponse) => {
        console.log ("authResponse:", authResponse);
        // réponsse statut de l'API 
        if (authResponse.status === 200) {
        return authResponse.json()
        }
        else if  (authResponse.status === 401){
            errorMessage.textContent="accès non autorisé";
        }
        else if (authResponse.status === 404){
            errorMessage.textContent="utilisateur non trouvé";
        }else{
            errorMessage.textContent = `Errror : ${authResponse.status}`;
        }
    })
    .then ((userData) => {
        console.log("userData :", userData);
        // si les donnés utilisateurs sont renvoyé ( statut 200 ) , les enregistre localement et renvoie sur une autre page ( admin )
        if (userData) {
            localStorage.setItem("token", userData.token);
            window.location.replace("indexadmin.html");
          }
    })
    .catch(error =>console.error(error));
});


    


