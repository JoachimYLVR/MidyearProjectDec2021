import "../css/style.scss";

const dropdownRef = document.querySelector(".dropdown");
const choiceRef = dropdownRef.querySelector(".dropdown-content");
const selectRef = document.querySelector(".selection");

console.log(selectRef.innerHTML);

dropdownRef.addEventListener("click", ()=>{
    if(dropdownRef.classList.contains("is-active")){
        dropdownRef.classList.remove("is-active")
    }else{
        dropdownRef.classList.add("is-active")
    }
    
});

choiceRef.addEventListener("click", (e)=>{
    e.preventDefault();
    selectRef.innerHTML = e.target.innerHTML;
})