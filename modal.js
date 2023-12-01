const openModal = function (e){
    e.preventDefault()
    const target=document.querySelector(e.target.getAttribute("href"))
    target.style.display=null
}


document.querySelectorAll(".js-modal").forEach(a=> {
    a.addEventListener("click", openModal)
 })