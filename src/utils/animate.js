export function animate(node, params) {
  const { 
    animation = 'fadeIn', 
    duration = 1, 
    delay = 0,
    threshold = 0.1
  } = params;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        node.style.animation = `${animation} ${duration}s ease-out ${delay}s forwards`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold });

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}

// Registro de animaciones globales
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.2; }
      50% { transform: scale(1.05); opacity: 0.3; }
      100% { transform: scale(1); opacity: 0.2; }
    }
  `;
  document.head.appendChild(style);
}
