// Función genérica para cargar componentes
async function loadComponent(containerId, filePath) {
  try {
    const response = await fetch(filePath);
    if (response.ok) {
      const html = await response.text();
      document.getElementById(containerId).innerHTML = html;
    } else {
      console.error(`Error al cargar ${filePath}:`, response.status);
    }
  } catch (error) {
    console.error(`Error al cargar ${filePath}:`, error);
  }
}

// Carga el navbar y el footer
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('navbar-container', 'componentes/navbar.html');
  loadComponent('footer-container', 'componentes/footer.html');
  
});

