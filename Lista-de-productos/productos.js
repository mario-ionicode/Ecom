const mainContainer = document.querySelector(".container");

// Lista inicial de productos
let productosReposteria = [{
  id: 1,
  nombre: "Pastel de chocolate",
  imagen: "Productos/Pastel_de_chocolate.jpg",
  precio: 300, descripcion: "Pastel de chocolate",
  disponible: true
},
{
  id: 2,
  nombre: "Cheesecake",
  imagen: "Productos/cheesecake.webp",
  precio: 250,
  descripcion: "Clásico cheesecake",
  disponible: true
},
{
  id: 3,
  nombre: "Tarta de manzana",
  imagen: "Productos/tarta de manzana.jpg",
  precio: 260,
  descripcion: "Tarta fresca de manzana",
  disponible: true
},
{
  id: 4,
  nombre: "Cupcakes",
  imagen: "Productos/cupcakes.webp",
  precio: 120,
  descripcion: "Coloridos cupcakes",
  disponible: true
},
{
  id: 5,
  nombre: "Brownies",
  imagen: "Productos/brownies.webp",
  precio: 150,
  descripcion: "Brownies húmedos",
  disponible: true
},
{
  id: 6,
  nombre: "Galletas",
  imagen: "Productos/galletas.webp",
  precio: 80,
  descripcion: "Galletas variadas",
  disponible: true
},
{
  id: 7,
  nombre: "Eclairs",
  imagen: "Productos/eclairs.jpg",
  precio: 200,
  descripcion: "Eclairs rellenos",
  disponible: true
},
{
  id: 8,
  nombre: "Donas",
  imagen: "Productos/donas.webp",
  precio: 90,
  descripcion: "Donas glaseadas",
  disponible: true
},
{
  id: 9,
  nombre: "Macarons",
  imagen: "Productos/macarons.jpg",
  precio: 220,
  descripcion: "Macarons surtidos",
  disponible: true
},
{
  id: 10,
  nombre: "Panqué de limón",
  imagen: "Productos/panque de limon.webp",
  precio: 180,
  descripcion: "Panqué fresco de limón",
  disponible: true
},];

// Carrito
let carrito = [];
let totalCarrito = 0;

// Renderizado de los productos
const renderProductos = (producto) => {
  // Detecta los nombres correctos según el origen del producto
  const nombre      = producto.nombre || producto.name || "Sin nombre";
  const descripcion = producto.descripcion || producto.description || "Sin descripción";
  const precio      = producto.precio || producto.price || 0;
  const imagen      = producto.imagen || producto.imageDataUrl || "Productos/default.jpg";
 console.log("URL de imagen:", imagen);

  const cardProducto = `
    <div class="cartas m-2 tooltip-trigger" style="width: 18rem;">
      <img src="${imagen}" class="card-img-top card-img tooltip-trigger" alt="${descripcion || 'Imagen del producto'}">
      <h5 class="card-title">${nombre}</h5>
      <div class="card-body tooltip-trigger">
        <p class="card-text">$${precio}</p>
        <div class="tooltip-trigger"><p class="card-text tooltip-text">${descripcion}</p></div>
      </div>
      <button class="btn-mas">+</button>
      <button class="btn-menos">-</button>
      <button class="boton">Agregar al carrito</button>
    </div>
  `;
  mainContainer.insertAdjacentHTML("beforeend", cardProducto);
};

// Renderizar todos los productos
productosReposteria.forEach(producto => {
  renderProductos(producto);
});

// Función para agregar al carrito
function agregarAlCarrito(productoId) {
  const producto = productosReposteria.find(p => p.id === productoId);
  if (!producto) return;

  const productoEnCarrito = carrito.find(p => p.id === productoId);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  totalCarrito += producto.precio;

  mostrarCarrito();

}

// mostrar los productos guardados
const productosGuardados = JSON.parse(localStorage.getItem("items")) || [];

productosGuardados.forEach(producto => {
  console.log("Producto para render:", producto);
  const imagen = producto.imageDataUrl || producto.imagen || "Productos/default.jpg";
  console.log("URL de imagen que se usará:", imagen);
  renderProductos(producto);
  console.log("Productos desde localStorage:", productosGuardados);
});

// Incrementar cantidad
function incrementarCantidad(productoId) {
  const productoEnCarrito = carrito.find(p => p.id === productoId);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
    totalCarrito += productoEnCarrito.precio;
  } else {
    const producto = productosReposteria.find(p => p.id === productoId);
    if (producto) {
      carrito.push({ ...producto, cantidad: 1 });
      totalCarrito += producto.precio;
    }
  }
  mostrarCarrito();

}

// Disminuir cantidad
function disminuirCantidad(productoId) {
  const productoEnCarrito = carrito.find(p => p.id === productoId);
  if (productoEnCarrito && productoEnCarrito.cantidad > 0) {
    productoEnCarrito.cantidad -= 1;
    totalCarrito -= productoEnCarrito.precio;

    if (productoEnCarrito.cantidad === 0) {
      carrito = carrito.filter(p => p.id !== productoId);
    }
  }
  mostrarCarrito();
}



// Mostrar carrito
function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
  <div style="display: flex; align-items: center; gap: 8px;">
    <img src="${item.imagen}" alt="${item.nombre}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;">
    <div style="flex-grow: 1;">
      <strong>${item.nombre}</strong> x${item.cantidad}<br>
      $${item.precio * item.cantidad}
    </div>
    <button class="btn-eliminar-item" data-id="${item.id}" style="background: none; border: none; color:rgb(3, 94, 95); font-size: 50px; cursor: pointer;">x</button>
  </div>
`;
    lista.appendChild(li);
  });

  //Eliminar uno
const botonesEliminar = document.querySelectorAll(".btn-eliminar-item");
botonesEliminar.forEach(boton => {
  boton.addEventListener("click", () => {
    const id = parseInt(boton.getAttribute("data-id"));
    disminuirCantidad(id);
  });
});

  document.getElementById("total-carrito").textContent = `Total: $${totalCarrito}`;

  actualizarContadorPopup();
  animarPopupShake();
}

// Abrir y cerrar carrito
function abrirCarrito() {
  document.getElementById("carrito-lateral").classList.add("mostrar");
  document.getElementById("popup-carrito").style.display = "none";
}

function cerrarCarrito() {
  document.getElementById("carrito-lateral").classList.remove("mostrar");
  actualizarContadorPopup();
}

// Actualizar contador popup
function actualizarContadorPopup() {
  const contador = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById("contador-popup").textContent = contador;

  if (contador > 0 && !document.getElementById("carrito-lateral").classList.contains("mostrar")) {
    document.getElementById("popup-carrito").style.display = "block";
  } else {
    document.getElementById("popup-carrito").style.display = "none";
  }
}

// Animar efecto shake
function animarPopupShake() {
  const popup = document.getElementById("popup-carrito");
  popup.classList.add("shake");

  setTimeout(() => {
    popup.classList.remove("shake");
  }, 500);
}

// Evento botón cerrar
document.getElementById("cerrar-carrito").addEventListener("click", cerrarCarrito);

// Evento click en popup
document.getElementById("popup-carrito").addEventListener("click", abrirCarrito);

// Agregar eventos a botones dinámicos
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const botonesAgregar = document.querySelectorAll(".boton");
    const botonesMas = document.querySelectorAll(".btn-mas");
    const botonesMenos = document.querySelectorAll(".btn-menos");

    //Boton agregar al carrito
    botonesAgregar.forEach((boton, index) => {
      boton.addEventListener("click", () => {
        agregarAlCarrito(productosReposteria[index].id);
      });
    });

    //Boton incrementar
    botonesMas.forEach((boton, index) => {
      boton.addEventListener("click", () => {
        incrementarCantidad(productosReposteria[index].id);
      });
    });

    //Boton disminuir
    botonesMenos.forEach((boton, index) => {
      boton.addEventListener("click", () => {
        disminuirCantidad(productosReposteria[index].id);
      });
    });
  }, 500);
});

// Insertar header y footer
document.addEventListener("DOMContentLoaded", () => {
  fetch("../componentes/header.html")
    .then(res => res.text())
    .then(data => document.getElementById("nav-placeholder").innerHTML = data);

  fetch("../componentes/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer-placeholder").innerHTML = data);
});