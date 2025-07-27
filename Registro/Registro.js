document.querySelector('#registro').addEventListener('submit', function(event) {
  event.preventDefault();
 
  // Obtener valores del formulario
  const name = document.querySelector('#validationNombre').value.trim();  
  const lastName = document.querySelector('#validationApellido').value.trim();
  const email = document.querySelector('#validationEmailR').value.trim();
  const tel = document.querySelector('#validationPhoneR').value.trim();
  const password = document.querySelector('#validationPassword').value.trim();
  const passwordR = document.querySelector('#validationPasswordR').value.trim();


  // Validaciones
  let isValid = true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10,15}$/;
 
  // Crear contenedor para alertas
  const alertContainer = document.getElementById('form-alert-container') || document.createElement('div');
  alertContainer.id = 'form-alert-container';
  alertContainer.style.position = 'fixed';
  alertContainer.style.top = '20px';
  alertContainer.style.right = '20px';  
  alertContainer.style.zIndex = '1000';
  alertContainer.style.maxWidth = '400px';
  document.body.appendChild(alertContainer);
 
  // Limpiar alertas anteriores
  alertContainer.innerHTML = '';
 
  // Validaciones
  if (name === '') {
    showAlert('Por favor ingresa tu nombre', 'danger');
    isValid = false;
  } else if (name.length < 2) {
    showAlert('El nombre debe tener al menos 2 caracteres', 'danger');
    isValid = false;
  }
 
  if (lastName === '') {
    showAlert('Por favor ingresa tu apellido', 'danger');
    isValid = false;
  } else if (lastName.length < 2) {
    showAlert('El apellido debe tener al menos 2 caracteres', 'danger');
    isValid = false;
  }
 
  if (email === '') {
    showAlert('Por favor ingresa tu correo electrónico', 'danger');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showAlert('Por favor ingresa un correo electrónico válido', 'danger');
    isValid = false;
  }
 
  if (tel === '') {
    showAlert('Por favor ingresa tu número de teléfono', 'danger');
    isValid = false;
  } else if (!phoneRegex.test(tel)) {
    showAlert('El teléfono debe contener entre 10 y 15 dígitos numéricos', 'danger');
    isValid = false;
  }


  if (password === '') {
    showAlert('Por favor ingresa una contraseña', 'danger');
    isValid = false;
  } else if (password.length < 8) {
    showAlert('La contraseña debe tener al menos 8 caracteres', 'danger');
    isValid = false;
  } else if (!/[A-Z]/.test(password)) {
    showAlert('La contraseña debe contener al menos una letra mayúscula', 'danger');
    isValid = false;
  } else if (!/[0-9]/.test(password)) {
    showAlert('La contraseña debe contener al menos un número', 'danger');
    isValid = false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    showAlert('La contraseña debe contener al menos un carácter especial', 'danger');
    isValid = false;
  }


  if (passwordR === '') {
    showAlert('Por favor confirma tu contraseña', 'danger');
    isValid = false;
  } else if (password !== passwordR) {
    showAlert('Las contraseñas no coinciden', 'danger');
    isValid = false;
  }


  // Si todo es válido
  if (isValid) {
    // Crear objeto con los datos del usuario
    const userData = {
      nombre: name,
      apellido: lastName,
      email: email,
      telefono: tel,
      password: password, // ¡Cuidado! Almacenar contraseñas en texto plano es inseguro
      registro: new Date().toISOString()
    };


    // Guardar en localStorage (llamando correctamente a la función)
    saveToLocalStorage(userData);
   
    // Mostrar alerta de éxito
    showAlert('Registro exitoso!', 'success');
   
    // Limpiar formulario
    this.reset();
  }
 
  // Función para mostrar alertas
  function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
   
    if (type === 'danger') {
      alertDiv.style.background = 'linear-gradient(135deg, rgba(198, 114, 225, 0.9), rgba(255, 255, 255, 0.7), rgba(198, 114, 225, 0.9))';
      alertDiv.style.border = '1px solid rgba(198, 114, 225, 0.5)';
      alertDiv.style.color = '#000';
    } else if (type === 'success') {
      alertDiv.style.background = 'linear-gradient(135deg, rgba(11, 150, 153, 0.9), rgba(7, 110, 112, 0.9), rgba(11, 150, 153, 0.9))';
      alertDiv.style.border = '1px solid rgba(11, 150, 153, 0.5)';
      alertDiv.style.color = '#fff';
    }
   
    alertDiv.innerHTML = `
      <strong>${type === 'danger' ? 'Error:' : 'Éxito:'}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
   
    alertContainer.appendChild(alertDiv);
   
    setTimeout(() => {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
      bsAlert.close();
    }, 5000);
  }
});


// Función para guardar en localStorage (definida correctamente fuera del event listener)
function saveToLocalStorage(userData) {
  // Obtener usuarios existentes o crear array vacío
  const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
 
  // Verificar si el usuario ya existe
  const userExists = users.some(user => user.email === userData.email);
 
  if (userExists) {
    alert('Este correo electrónico ya está registrado');
    return false;
  }
 
  // Agregar nuevo usuario
  users.push(userData);
 
  // Guardar en localStorage
  localStorage.setItem('registeredUsers', JSON.stringify(users));
  return true;
}


window.addEventListener('DOMContentLoaded', function() {
  if (typeof includeHTML === 'function') {
    includeHTML();
  }
});
