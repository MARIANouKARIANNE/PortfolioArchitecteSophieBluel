let modal=null


const openModal = function (e){
    e.preventDefault()
    const target=document.querySelector(e.target.getAttribute("href"))
    target.style.display=null
    modal=target
    modal.addEventListener("click",closeModal)
    modal.querySelector(".js-close-modal").addEventListener("click",closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click",stopPropagation)
}

const closeModal = function(e){
    if (modal===null) return
    e.preventDefault()
    modal.style.display="none"
    //modal.removeaddEventListener("click",closeModal)
    //modal.querySelector(".js-close-modal").removeaddEventListener("click",closeModal)
   // modal.querySelector(".js-modal-stop").removeaddEventListener("click",stopPropagation)
    modal=null

    console.log("bonjour")
}
let add = null

const OpenAdd = function (e){
    e.preventDefault()
    const target=document.querySelector(e.target.getAttribute("href"))
    target.style.display=null
    add = target
    add.addEventListener("click", OpenAdd)
    //modal.querySelector(".js-close-bouton").addEventListener("click",CloseAdd)
    modal.querySelector(".bouton-stop").addEventListener("click",stopPropagation)
}

const CloseAdd = function (e){
    if (add===null)return
    e.preventDefault()
    add.style.display="none"
    add.addEventListener("click",CloseAdd)
   // modal.querySelector(".js-close-bouton").removeaddEventListener("click",CloseAdd)
   //modal.querySelector(".js-close-bouton").removeaddEventListener("click",closeModal)
    //modal.querySelector(".bouton-stop").removeaddEventListener("click",stopPropagation)
}

const returnmodal = function (e){
    if (add===null)return
    e.preventDefault()
    add.style.display="none"
    add.addEventListener("click",CloseAdd)
    modal.querySelector(".js-return-bouton").addEventListener("click",CloseAdd)
   
}


const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener("click", openModal)
 })
 window.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
        closeModal(e)
    }
 })

 document.querySelectorAll(".js-bouton").forEach(a=>{
    a.addEventListener("click", OpenAdd)
 })

 document.querySelectorAll(".js-return-bouton").forEach(a=>{
    a.addEventListener("click", CloseAdd)
 })

 