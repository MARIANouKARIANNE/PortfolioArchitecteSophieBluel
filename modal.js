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
    modal.removeaddEventListener("click",closeModal)
    modal.querySelector(".js-close-modal").removeaddEventListener("click",closeModal)
    modal.querySelector(".js-modal-stop").removeaddEventListener("click",stopPropagation)
    modal=null
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