emailjs.init({ publicKey: "oiBY7QlJnAHEZrQkx" }); //se inicia el servicio de emailjs usando la public key

document.querySelector('#contacto').addEventListener('submit', function(event) { //se manda a traer el formulario de contacto y se agrega el evento que se escuchara al dar clic en el boton
  event.preventDefault();
  
  //se obtienen los valores del formulario y el id de su validaciones 
  const name = document.querySelector('#validationName').value.trim();  
  const lastName = document.querySelector('#validationLastName').value.trim();
  const email = document.querySelector('#validationEmail').value.trim();
  const tel = document.querySelector('#validationPhone').value.trim();
  const coment = document.querySelector('#AreaComent').value.trim();
  
  // Validaciones de inputs y de email con emailRegex 
  let isValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Crear elemento para alertas
  const alertContainer = document.getElementById('form-alert-container') || document.createElement('div'); // se inicializa la alerta del contenedor en caso de que haya alguna
  alertContainer.id = 'form-alert-container';
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '100px';
  alertContainer.style.right = '20px';  
  alertContainer.style.zIndex = '1000';
  document.body.appendChild(alertContainer); //se asigna como hijo de body a el alertcontainer
  
  // se limpian las alertas del formulario
  alertContainer.innerHTML = '';
  
  // Validar name si esta vacio se pide un name
  if (name === '') {
    showBootstrapAlert( 'Por favor ingresa tu nombre', 'danger', );
    isValid = false;
  }
  
  // Validar apellido si es vacio pide un apellido
  if (lastName === '') {
    showBootstrapAlert('Por favor ingresa tu apellido', 'danger');
    isValid = false;
  }
  
  // Validar email si es vacio pedir ingresar un correo si no hay una estructura valida con el regex pedir un correo valido
  if (email === '') {
    showBootstrapAlert('Por favor ingresa tu correo electrónico', 'danger');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showBootstrapAlert('Por favor ingresa un correo electrónico válido', 'danger');
    isValid = false;
  }
  
  // Validar teléfono si el telefono es vacio pedir el numero si hay un caracter que no sea numero se pide que el telefono tenga numeros
  if (tel === '') {
    showBootstrapAlert('Por favor ingresa tu número de teléfono', 'danger');
    isValid = false;
  } else if (!/^[0-9]+$/.test(tel)) {
    showBootstrapAlert('El teléfono solo debe contener números', 'danger');
    isValid = false;
  }
  
  // Validar comentario se pide que no haya un comentario vacio
  if (coment === '') {
    showBootstrapAlert('Por favor ingresa tu comentario o mensaje', 'danger');
    isValid = false;
  }
  
  // Si todo esta lleno y es valido se envia el formulario al correo electronico de soporte de la empresa.
  if (isValid) {
    const serviceID = "service_gj73m43"; //se usa el ID del servicio de emailjs
    const templateID = "template_zxuohuk"; //se usa la plantilla asignada para enviar un mensaje 

    emailjs.send(serviceID, templateID, {//se manda la promesa se manda usando la public key emailjs
      nombre: name,
      apellido: lastName, 
      email: email,
      tel: tel,
      mensaje: coment
    })
    .then(function(response) {
      showBootstrapAlert('Correo enviado exitosamente', 'success');
      // Opcional: resetear el formulario después de enviar
      document.querySelector('#contacto').reset();
    }, function(error) {
      showBootstrapAlert('Error al enviar el correo: ' + error.text, 'danger');
    });
  }
  
  // Función para mostrar alertas de Bootstrap
  function showBootstrapAlert(message, type) {
    const alertDiv = document.createElement('div');
    

    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
      ${message}
      
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    new bootstrap.Alert(alertDiv);
    
    // Cerrar automáticamente después de 5 segundos
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
      bsAlert.close();
    }, 5000);
  }
});

// Función para incluir header y footer
document.addEventListener("DOMContentLoaded", () => {   // sirve para esperar a que todo el contenido html este cargado
      fetch("../componentes/header.html")   // Carga el archivo header que esta en la carpeta componentes
        .then(res => res.text())  // Convierte el contenido del archivo en texto 
        .then(data => document.getElementById("nav-placeholder").innerHTML = data); // Inserta ese texto dentro del elemento que tenga el id nav-placeholder

      fetch("../componentes/footer.html")  
        .then(res => res.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);
    });