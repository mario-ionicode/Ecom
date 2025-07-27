//funcion del boton para que suba al inicio de la pagina
window.onscroll = function() { mostrarBoton() }; //se le asigna la funcion mostrarBoton al evento onscroll del objeto window

function mostrarBoton() { //funcion que se ejecuta al hacer scroll
    // Verifica si el scroll en el body es mayor a 20 píxeles || que el scroll en el documento es mayor a 20 píxeles
    // Esto es para detectar si el usuario ha desplazado hacia abajo en la página
    // y muestra el botón si es así, o lo oculta si no utilizando el estilo display
    // "block" para mostrarlo y "none" para ocultarlo.
    // Se utiliza getElementById para obtener el elemento con el id "ir-arriba"

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("ir-arriba").style.display = "block";
    } else {
        document.getElementById("ir-arriba").style.display = "none";
    }
}

document.getElementById("ir-arriba").onclick = function() { //funcion que se ejecuta al hacer click en el boton
    // Al hacer click en el botón, se desplaza la página hacia arriba
    // utilizando scrollTop para establecer la posición de desplazamiento del documento
    // a 0, lo que lleva al usuario al inicio de la página.
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

