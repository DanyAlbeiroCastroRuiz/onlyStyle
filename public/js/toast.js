/**
 * Muestra una notificación toast
 * @param {string} msg - Mensaje a mostrar
 * @param {'success'|'error'|'info'} type - Tipo de notificación
 */
function showToast(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }


  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-msg">${msg}</span>
  `;

  container.appendChild(toast);

  // Auto-remove después de 4s (coincide con la animación CSS)
  setTimeout(() => toast.remove(), 4000);
}
