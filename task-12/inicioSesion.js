/**
 * Supongo que ya hay un usario registado eje
 
const usuarioPrueba = {
    email: "marcos21@gmail.com",
    password: "123456"
};

//si no existe guarda el arreglo y conviertlo a json
if(!localStorage.getItem("usuarios")){
    localStorage.setItem("usuarios", JSON.stringify([usuarioPrueba]));
}*/

const form = document.getElementById("loginForm");
const alerta = document.getElementById("alerta");
const emailInputDOM = document.getElementById("email");
const passwordInputDOM = document.getElementById("password");

function mostrarError(mensaje) {
    alerta.textContent = mensaje;
    // Remueve las clases de éxito y oculta, luego añade las de error
    alerta.classList.remove("d-none", "alert-success");
    alerta.classList.add("alert-danger");
}

function mostrarExito(mensaje) {
    alerta.textContent = mensaje;
    // Remueve las clases de error y oculta, luego añade las de éxito
    alerta.classList.remove("d-none", "alert-danger");
    alerta.classList.add("alert-success");
}

function ocultarAlerta() {
    alerta.classList.add("d-none");
}

emailInputDOM.addEventListener("input", ocultarAlerta);
passwordInputDOM.addEventListener("input", ocultarAlerta);
/*
Acceder al DOOM
*/
form.addEventListener("submit", function(e){
    e.preventDefault();

    const emailInput = emailInputDOM.value.trim();
    const passwordInput = passwordInputDOM.value.trim();

    //validación
    if (!emailInput || !passwordInput){
        mostrarError("Completa todos los campos");
        return;
    }

    //recuperamos el localStorage 
    const usuariosRegistrados = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    
    //buscamos que no coincida con find 
    const usuarioValido = usuarios.find(
        (u) => u.email === emailInput && u.password === passwordInput
    );

    if(usuarioValido){
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));
        mostrarExito(`Bienvenido, ${usuarioValido.nombre}`);

        setTimeout(() => {
            location.href = "../paginadeinici/paginadeinicio.html";
        }, 2000); //espera 2 s
    }else{
        mostrarError("Datos inválidos");  
    }
});
