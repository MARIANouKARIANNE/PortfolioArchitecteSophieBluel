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
    fetch ("http://localhost:5678/api/users/login", {
        method : "POST",
        headers : {
            accept : "application/json",
            "content-type":"application/json",
        },
        body:JSON.stringify({email : email, password:password}),
    })
    .then (authResponse => {
        console.log ("authResponse:", authResponse);
        if (authResponse.status === 200) {
        window.location.replace("/index.html");
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
    .then (userData => {
        console.log("userData :", userData);
        if(userData){
            window.localStorage.setItem("userData", JSON.stringify(userData));
            window.location.replace="admin.html";
        }
    })
    .catch(error =>console.error(error));
});


    


