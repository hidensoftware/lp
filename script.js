document.addEventListener('DOMContentLoaded', () => {
  // 1. Renderiza os ícones
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. FAQ Accordion (Delegação de evento infalível)
  document.addEventListener('click', (event) => {
    const questionBtn = event.target.closest('.faq-question');
    if (!questionBtn) return;

    const currentItem = questionBtn.closest('.faq-item');
    if (!currentItem) return;

    const isCurrentlyActive = currentItem.classList.contains('active');

    // Fecha todos os itens abertos
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.classList.remove('active');
    });

    // Abre o item clicado (se não estava aberto)
    if (!isCurrentlyActive) {
      currentItem.classList.add('active');
    }
  });

  // 3. Navbar Inteligente (esconde ao descer, aparece ao subir)
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  if (navbarWrapper) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        navbarWrapper.classList.remove('nav-hidden');
        navbarWrapper.classList.remove('scrolled');
      } else {
        navbarWrapper.classList.add('scrolled');

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navbarWrapper.classList.add('nav-hidden');
        } else if (currentScrollY < lastScrollY) {
          navbarWrapper.classList.remove('nav-hidden');
        }
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // 4. Scroll suave para links com âncora
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});