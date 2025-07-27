/* this.itemes obtiene los productos guardados, si no hay inicia un array vacío
this.currentid si ya hay uno usa como base para no comenzar desde 0*/ 
class ItemsController {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("items")) || [];
    this.currentId = this.items.length ? this.items.at(-1).id : 0;
  }
/*addItem crea un objeto */
  addItem(name, flavour, description, price, imageDataUrl) {
    const newItem = {
      id: ++this.currentId,
      name,
      flavour,
      description,
      price: parseFloat(price), //Conivert el precio a numero 
      imageDataUrl,          //  Se guarda la imagen codificada
    };
    this.items.push(newItem);
    localStorage.setItem("items", JSON.stringify(this.items));
    return newItem;
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
/*Alerta para los errores*/ 

function mostrarAlerta(mensajes, tipo = "danger") {
  alertContainer.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show mt-4" role="alert">
      <ul class="mb-0">${mensajes.map(m => `<li>${m}</li>`).join("")}</ul>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;
}
/*Accedemos al doom con document */

const itemsController = new ItemsController();
const form = document.querySelector("#newItemForm");
const alertContainer = document.getElementById("alertContainer");
const imageInput = document.querySelector("#newItemImage");
 // const previewImg = document.getElementById("imagePreview");

//Imagen Preview
/*imageInput.addEventListener("change", async () => {
  const file = imageInput.files[0];

  if (file && file.type.startsWith("image/")) {
    const imageDataUrl = await fileToDataUrl(file); 
    previewImg.src = imageDataUrl;
    previewImg.classList.remove("d-none");
  } else {
    previewImg.classList.add("d-none");
    previewImg.src = "#";
  }
});*/



//Formulario
form.addEventListener("submit", async (event) => {
  event.preventDefault();
/*Valores del formualario */
  const name  = document.querySelector("#newItemName").value.trim();
  const flavour  = document.querySelector("#newItemFlavour").value.trim();
  const description = document.querySelector("#newItemDescription").value.trim();
  const price  = document.querySelector("#newItemPrice").value.trim();
  const file  = imageInput.files[0];

  const errores = [];

  // Validación de campos de texto
  if (!name) {
    errores.push("El nombre es obligatorio.");
  }

  if (!flavour) {
    errores.push("El sabor es obligatorio.");
  }

  if (!description) {
    errores.push("La descripción es obligatoria.");
  }

  // Validación de precio
  const precioNum = parseFloat(price);
  if (!price || isNaN(precioNum) || precioNum <= 0) {
    errores.push("El precio debe ser un número mayor que 0.");
  }

  // Validación de imagen
 if (!file) {
    errores.push("Debes seleccionar una imagen.");
  } else if (!file.type.startsWith("image/")) {
    errores.push("El archivo seleccionado no es una imagen.");
  }
  
  // Mostrar errores si existen
  if (errores.length > 0) {
    mostrarAlerta(errores, "danger");
    return;
  }


  /* Convierte la imagen a Base‑64 */
  const imageDataUrl = await fileToDataUrl(file);

  /*Guardar el producto*/ 
  const newItem = itemsController.addItem(
    name, flavour, description, price, imageDataUrl
  );
  console.log("Nuevo JSON:", JSON.stringify(newItem));
  console.log(newItem.imageDataUrl);

  /*Resetea para inciar otro registro */
  form.reset();
  //previewImg?.classList.add("d-none");
  mostrarAlerta(["Producto guardado con éxito ✅"], "success");

  //redirigir automáticamente a la galería
  window.location.href = "../Lista-de-productos/productos.html";
});
console.log(localStorage.getItem("items"));
/*Animación  */
lottie.loadAnimation({
  container: document.getElementById("lottie-container"),
  renderer:  "svg",
  loop:      true,
  autoplay:  true,
  path:      "animations/bakery.json",
});

/*Nospermite borrar el local storage*/
document.getElementById("btnClear").addEventListener("click", () => {
  localStorage.removeItem("items");      // borra almacenamiento
  itemsController.items = [];            // vacía array en memoria
  itemsController.currentId = 0;         // reinicia IDs

  mostrarAlerta(["Catálogo vacío 🗑️"], "success");
});
