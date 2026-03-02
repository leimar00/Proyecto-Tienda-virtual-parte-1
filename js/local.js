//variables locales de admin
const d = document;

let nameUser = d.querySelector("#nombre-usuario");
let btnLogout = d.querySelector("#btnLogout");

//funcion para poner el nombre del usuario
d.addEventListener("DOMContentLoaded", () => {
    getUser();

});

let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.usuario;
}

btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userLogin");
    window.location.href = "login.html";
});