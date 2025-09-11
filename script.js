// Función para actualizar el header según el tema
function updateHeaderTheme() {
    const header = document.querySelector('header');
    const isDarkMode = document.body.classList.contains('dark-theme');
    
    if (!header) return;
    
    if (isDarkMode) {
        header.style.background = window.pageYOffset > 100 
            ? 'rgba(15, 23, 42, 0.98)'
            : 'rgba(15, 23, 42, 0.95)';
    } else {
        header.style.background = window.pageYOffset > 100 
            ? 'rgba(255, 255, 255, 0.98)'
            : 'rgba(255, 255, 255, 0.95)';
    }
}

// =================================
// NAVEGACIÓN SUAVE
// =================================

// Navegación suave para todos los enlaces de ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =================================
// GESTIÓN UNIFICADA DE SCROLL
// =================================

// Función throttle para optimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Handler unificado para todos los efectos de scroll
const unifiedScrollHandler = throttle(() => {
    const scrollY = window.pageYOffset;
    const progressBar = document.querySelector('.scroll-progress');
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const isDarkMode = document.body.classList.contains('dark-theme');

    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    // Efectos del header - RESPETA EL TEMA OSCURO
    if (header) {
        if (scrollY > 100) {
            if (isDarkMode) {
                header.style.background = 'rgba(15, 23, 42, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }
        } else {
            if (isDarkMode) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
            header.style.boxShadow = 'none';
        }
    }

    // Parallax sutil para el hero
    if (hero) {
        const rate = scrollY * -0.3; // Reducido para un efecto más sutil
        hero.style.transform = `translateY(${rate}px)`;
    }

    // Destacar enlace de navegación activo
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Barra de progreso de scroll (si existe)
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    }
}, 16);

window.addEventListener('scroll', unifiedScrollHandler);

// =================================
// ANIMACIÓN DE APARICIÓN AL HACER SCROLL
// =================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Inicializar animaciones cuando el DOM esté listo
function initializeAnimations() {
    // Agregar clase fade-in a elementos que queremos animar
    const elementsToAnimate = document.querySelectorAll('.skill-item, .project-card, .about-content > *');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// =================================
// EFECTO DE ESCRITURA PARA EL TÍTULO HERO
// =================================

function initTypeWriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #333'; // Cursor parpadeante
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Remover cursor al finalizar
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Iniciar el efecto de escritura después de 1 segundo
    setTimeout(typeWriter, 1000);
}

// =================================
// ANIMACIÓN MEJORADA PARA SKILLS
// =================================

function initSkillsAnimations() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach((skill, index) => {
        // Añadir un pequeño retraso escalonado para la aparición de skills
        skill.style.animationDelay = `${index * 0.1}s`;
        
        // Efecto hover mejorado con transición suave
        skill.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
}

// =================================
// CONTADOR ANIMADO MEJORADO
// =================================

function animateCounter(element, target, duration = 2000, suffix = '') {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        const current = Math.floor(start);
        element.textContent = current + suffix;
        
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        }
    }, 16);
}

// =================================
// VALIDACIÓN MEJORADA DE FORMULARIO
// =================================

function validateForm(formElement) {
    if (!formElement) return false;
    
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        let inputIsValid = true;
        
        // Validación requerido
        if (input.hasAttribute('required') && !value) {
            inputIsValid = false;
        }
        
        // Validación específica por tipo
        if (value && input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            inputIsValid = emailRegex.test(value);
        }
        
        // Aplicar clases de error
        input.classList.toggle('error', !inputIsValid);
        
        if (!inputIsValid) isValid = false;
    });
    
    return isValid;
}

// =================================
// GESTIÓN DE TEMA OSCURO MEJORADA
// =================================

function initThemeToggle() {
    // Crear botón de toggle si no existe
    let themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', 'Cambiar tema');
        
        // Agregar al header
        const header = document.querySelector('header nav');
        if (header) {
            header.appendChild(themeToggle);
        }
    }
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-theme');
    
    // Actualizar icono
    const themeToggle = document.querySelector('.theme-toggle i');
    if (themeToggle) {
        themeToggle.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Actualizar header
    updateHeaderTheme();
    
    // Guardar preferencia
    localStorage.setItem('darkTheme', isDark);
    
    // Transición suave
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
}

// =================================
// INICIALIZACIÓN PRINCIPAL
// =================================

document.addEventListener('DOMContentLoaded', () => {
    // Remover clase de loading
    document.body.classList.remove('loading');
    
    // Inicializar tema del header
    updateHeaderTheme();

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
    
    // Inicializar todas las funcionalidades
    setTimeout(() => {
        document.body.classList.add('loaded');
        initializeAnimations();
        initTypeWriterEffect();
        initSkillsAnimations();
        initThemeToggle();
    }, 100);
});

// =================================
// UTILIDADES ADICIONALES
// =================================

// Función para lazy loading de imágenes (opcional)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para smooth scroll personalizada (fallback para navegadores antiguos)
function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Debugging helper (remover en producción)
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Página cargada en: ${loadTime}ms`);
    }
}

// Inicializar debugging en desarrollo
// logPerformance();