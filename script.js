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

    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    }

    // Efectos del header - RESPETA EL TEMA OSCURO
    if (header) {
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
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
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
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
// TRADUCCIONES
// =================================

const translations = {
    es: {
        'nav-about': 'Acerca de mí',
        'nav-skills': 'Herramientas y habilidades',
        'nav-projects': 'Proyectos',
        'nav-contact': 'Contacto',
        'hero-title': 'Allan Orellana',
        'hero-subtitle': 'Analista de Datos y Especialista en Business Intelligence',
        'hero-description': 'Transformo datos complejos en insights accionables que impulsan el crecimiento empresarial. Especializado en análisis de datos, dashboards interactivos, automatizaciones y una combinación de herramientas low-code para crear soluciones y optimizar procesos.',
        'cta-button': 'Conoce mi trabajo',
        'about-title': 'Acerca de mí',
        'skills-title': 'Herramientas y habilidades',
        'skills': [
            {
                name: 'Power BI',
                img: 'assets/Power BI logo.png',
                alt: 'Power BI logo',
                front: [],
                back: [
                    'Creación de dashboards e informes interactivos',
                    'Transformación de datos con Power Query y DAX',
                    'Modelado semántico y actualización automática mediante Gateway'
                ]
            },
            {
                name: 'Tableau',
                img: 'assets/Tableau logo.png',
                alt: 'Tableau logo',
                front: [],
                back: [
                    'Diseño de dashboards interactivos y visualizaciones avanzadas',
                    'Conexión y análisis de datos de múltiples fuentes',
                    'Storytelling con datos y animaciones'
                ]
            },
            {
                name: 'Excel',
                img: 'assets/Excel logo.png',
                alt: 'Excel logo',
                front: [],
                back: [
                    'Análisis y resumen de datos con tablas dinámicas',
                    'Transformación de datos con Power Query y Power Pivot',
                    'Creación de informes y dashboards',
                    'Uso de fórmulas avanzadas para el análisis'
                ]
            },
            {
                name: 'SQL',
                img: 'assets/SQL logo.png',
                alt: 'SQL logo',
                front: [],
                back: [
                    'Consultas para combinar, filtrar y ordenar datos',
                    'Extracción y análisis de datos con SQL',
                    'Integración de consultas y resultados con Power BI'
                ]
            },
            {
                name: 'Power Automate',
                img: 'assets/Power Automate logo.png',
                alt: 'Power Automate logo',
                front: [],
                back: [
                    'Automatización de flujos y envío de notificaciones',
                    'Integración de servicios de Microsoft y aplicaciones de terceros',
                    'Recopilación y sincronización de datos',
                    'Optimización de procesos repetitivos'
                ]
            },
            {
                name: 'Power Apps',
                img: 'assets/Power Apps logo.png',
                alt: 'Power Apps logo',
                front: [],
                back: [
                    'Creación de aplicaciones personalizadas con low-code',
                    'Integración con servicios y datos de Microsoft',
                    'Digitalización y optimización de procesos'
                ]
            },
            {
                name: 'Python',
                img: 'assets/Python logo.png',
                alt: 'Python logo',
                front: [],
                back: [
                    'Análisis exploratorio de datos (EDA)',
                    'Automatización de tareas',
                    'Aprendizaje activo de análisis de datos con Pandas y NumPy'
                ]
            },
            {
                name: 'JavaScript',
                img: 'assets/JavaScript logo.png',
                alt: 'JavaScript logo',
                front: [],
                back: [
                    'Manipulación de elementos del DOM',
                    'Creación de interacciones en páginas HTML'
                ]
            },
            {
                name: 'HTML',
                img: 'assets/HTML logo.png',
                alt: 'HTML 5 logo',
                front: [],
                back: [
                    'Creación de interfaces HTML para aplicaciones desarrolladas con Google Apps Script',
                    'Integración de interfaces HTML con la lógica de Apps Script',
                    'Creación de plantillas HTML para correos y notificaciones'
                ]
            },
            {
                name: 'SharePoint',
                img: 'assets/SharePoint logo.png',
                alt: 'SharePoint logo',
                front: [],
                back: [
                    'Creación de sitios colaborativos',
                    'Integración con Power Automate y Power Apps',
                    'Publicación y acceso a dashboards'
                ]
            },
            {
                name: 'OneDrive',
                img: 'assets/OneDrive logo.png',
                alt: 'OneDrive logo',
                front: [],
                back: [
                    'Almacenamiento y sincronización de conjuntos de datos',
                    'Compartición controlada de archivos e informes',
                    'Integración con Power BI, Power Apps, Power Automate y SharePoint'
                ]
            },
            {
                name: 'Photoshop',
                img: 'assets/PhotoShop logo.png',
                alt: 'Photoshop logo',
                front: [],
                back: [
                    'Edición y composición de imágenes',
                    'Diseño de recursos visuales personalizados',
                    'Aplicación de branding y principios UI/UX a dashboards'
                ]
            },
            {
                name: 'React',
                img: 'assets/React logo.png',
                alt: 'React logo',
                front: [],
                back: [
                    'Desarrollo de interfaces interactivas',
                    'Construcción de componentes reutilizables',
                    'Gestión del estado y del flujo de datos'
                ]
            },
            {
                name: 'PostgreSQL',
                img: 'assets/PostgreSQL logo.png',
                alt: 'PostgreSQL logo',
                front: [],
                back: [
                    'Diseño y optimización de bases de datos relacionales',
                    'Consultas SQL para análisis y gestión de datos',
                    'Gestión de transacciones y control de acceso a datos'
                ]
            },
            {
                name: 'Google Apps Script',
                img: 'assets/Apps Script logo.png',
                alt: 'Google Apps Script logo',
                front: [],
                back: [
                    'Desarrollo de aplicaciones para Google Workspace',
                    'Creación de soluciones conectadas a servicios de Google',
                    'Automatización de flujos mediante scripts y disparadores'
                ]
            }
        ],
        'projects-title': 'Proyectos',
        'projects': [
            {
                title: 'Fashion Store',
                desc: 'Ver las tendencias principales con la información de ventas y nivel de satisfacción de clientes.',
                tech: ['Excel', 'Power BI'],
                img: 'assets/FashionStores.jpg',
                alt: 'Captura de proyecto power BI',
                links: [
                    { url: 'https://app.powerbi.com/view?r=eyJrIjoiNzUzYTU4N2QtNzYxNi00ODRlLWIwNTEtNjdhOGFiODFlNzFmIiwidCI6IjFlNjYyYzA0LTk4MmQtNGM5Yi1iZTg5LWE4N2FhMzFiYmVhZCIsImMiOjR9', icon: 'fas fa-external-link-alt', text: 'Ver' }
                ]
            },
            {
                title: 'Solicitudes departamento de flota',
                desc: 'Pensado para el seguimiento de solicitudes del departamento de flota y principales tendencias de solicitudes.',
                tech: ['Power BI'],
                img: 'assets/FleetRequests.png',
                alt: 'Captura del proyecto Fleet Department Requests',
                icon: 'Captura de proyecto power BI',
                links: [
                    { url: 'https://app.powerbi.com/view?r=eyJrIjoiY2M3NGVhODItYWNkNC00YTMyLTlmZmQtNjUwZTYyZGIzMGE0IiwidCI6IjFlNjYyYzA0LTk4MmQtNGM5Yi1iZTg5LWE4N2FhMzFiYmVhZCIsImMiOjR9&pageName=d36d6047e02b70cc2cae', icon: 'fas fa-external-link-alt', text: 'Ver' }
                ]
            },
            {
                title: 'Analítica Retail',
                desc: 'Dashboard interactivo de análisis de ventas minoristas con segmentación RFM de clientes. Procesamiento ETL con Python y visualización en Power BI.',
                tech: ['Python', 'Power BI'],
                img: 'assets/RetailAnalytics.jpg',
                icon: 'Captura de proyecto power BI',
                links: [
                    { url: 'https://github.com/AllanBOG/Portfolio/blob/main/data_processing.py', icon: 'fab fa-github', text: 'Código' },
                    { url: 'https://app.powerbi.com/view?r=eyJrIjoiNDVkMjMzODMtODlmOC00YzY2LTgyZTktMWJjMTdhZmEwMzllIiwidCI6IjFlNjYyYzA0LTk4MmQtNGM5Yi1iZTg5LWE4N2FhMzFiYmVhZCIsImMiOjR9&pageName=409938f12b04936c2adb', icon: 'fas fa-external-link-alt', text: 'Ver' }
                ]
            },
            {
                title: 'ZentiaFlow',
                desc: 'Plataforma SaaS desarrollada con React para apoyar la gestión de clínicas.',
                tech: ['React', 'SaaS'],
                thumbnail: 'assets/ZentiaFlow 1.png',
                thumbnailAlt: 'Captura de la aplicación ZentiaFlow',
                gallery: ['assets/ZentiaFlow 1.png', 'assets/ZentiaFlow 2.png'],
                links: []
            },
            {
                title: 'Aplicación de Bodega',
                desc: 'Aplicación desarrollada con Google Apps Script y HTML para apoyar el registro y seguimiento del inventario.',
                tech: ['Google Apps Script', 'HTML'],
                thumbnail: 'assets/Bodega app 1.png',
                thumbnailAlt: 'Captura de la aplicación de bodega',
                gallery: ['assets/Bodega app 1.png', 'assets/Bodega app 2.png'],
                links: []
            }
        ],
        'contact-title': 'Contacto',
        'about-text': [
            'Soy un analista de datos apasionado con más de 3 años de experiencia ayudando a tomar decisiones informadas basadas en datos. Mi enfoque se centra en convertir números y datos complejos en narrativas claras y accionables.',
            '<strong>◎ Análisis & Visualización:</strong> Diseño de dashboards interactivos en Power BI y Excel (Power Query, DAX) para monitoreo KPI y tendencias. Desarrollo de informes automatizados que ahorran tiempo y reducen errores manuales.',
            '<strong>◎ Automatización & Desarrollo:</strong> Creación de flujos de trabajo con Power Automate y aplicaciones low-code en Power Apps. Soluciones personalizadas con Python (Pandas, NumPy) para análisis avanzados o integración de sistemas.',
            '<strong>◎ Diseño & UX/UI:</strong> Combino diferentes herramientas como PhotoShop o Ilustrator para mejorar las visualizaciones y materiales gráficos, asegurando claridad e impacto.'
        ]
    },
    en: {
        'nav-about': 'About Me',
        'nav-skills': 'Skills & Tools',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'hero-title': 'Allan Orellana',
        'hero-subtitle': 'Data Analyst & Business Intelligence Specialist',
        'hero-description': 'I transform complex data into actionable insights that drive business growth. Specialized in data analysis, interactive dashboards, automation, and a combination of low-code tools to create solutions and optimize processes.',
        'cta-button': 'View my work',
        'about-title': 'About Me',
        'skills-title': 'Skills & Tools',
        'skills': [
            {
                name: 'Power BI',
                img: 'assets/Power BI logo.png',
                alt: 'Power BI logo',
                front: [],
                back: [
                    'Creation of interactive dashboards and reports',
                    'Data transformation with Power Query and DAX',
                    'Semantic modeling and automatic refresh through Gateway'
                ]
            },
            {
                name: 'Tableau',
                img: 'assets/Tableau logo.png',
                alt: 'Tableau logo',
                front: [],
                back: [
                    'Design of interactive dashboards and advanced visualizations',
                    'Connecting and analyzing data from multiple sources',
                    'Data storytelling and animations'
                ]
            },
            {
                name: 'Excel',
                img: 'assets/Excel logo.png',
                alt: 'Excel logo',
                front: [],
                back: [
                    'Summarizing and analyzing data with pivot tables',
                    'Transforming data with Power Query and Power Pivot',
                    'Creating reports and dashboards',
                    'Using advanced formulas for analysis'
                ]
            },
            {
                name: 'SQL',
                img: 'assets/SQL logo.png',
                alt: 'SQL logo',
                front: [],
                back: [
                    'Queries to combine, filter, and sort data',
                    'Extracting and analyzing data with SQL',
                    'Connecting queries and results to Power BI'
                ]
            },
            {
                name: 'Power Automate',
                img: 'assets/Power Automate logo.png',
                alt: 'Power Automate logo',
                front: [],
                back: [
                    'Automating workflows and sending notifications',
                    'Integrating Microsoft services and third-party applications',
                    'Collecting and synchronizing data',
                    'Optimizing repetitive processes'
                ]
            },
            {
                name: 'Power Apps',
                img: 'assets/Power Apps logo.png',
                alt: 'Power Apps logo',
                front: [],
                back: [
                    'Building custom low-code applications',
                    'Integrating Microsoft services and data',
                    'Digitizing and optimizing processes'
                ]
            },
            {
                name: 'Python',
                img: 'assets/Python logo.png',
                alt: 'Python logo',
                front: [],
                back: [
                    'Exploratory data analysis (EDA)',
                    'Task automation',
                    'Actively learning data analysis with Pandas and NumPy'
                ]
            },
            {
                name: 'JavaScript',
                img: 'assets/JavaScript logo.png',
                alt: 'JavaScript logo',
                front: [],
                back: [
                    'Manipulating DOM elements',
                    'Building interactions on HTML pages'
                ]
            },
            {
                name: 'HTML',
                img: 'assets/HTML logo.png',
                alt: 'HTML 5 logo',
                front: [],
                back: [
                    'Building HTML interfaces for applications developed with Google Apps Script',
                    'Connecting HTML interfaces with Apps Script logic',
                    'Creating HTML templates for emails and notifications'
                ]
            },
            {
                name: 'SharePoint',
                img: 'assets/SharePoint logo.png',
                alt: 'SharePoint logo',
                front: [],
                back: [
                    'Creation of collaborative sites',
                    'Integration with Power Automate and Power Apps',
                    'Publishing dashboards and providing access'
                ]
            },
            {
                name: 'OneDrive',
                img: 'assets/OneDrive logo.png',
                alt: 'OneDrive logo',
                front: [],
                back: [
                    'Storage and synchronization of datasets',
                    'Controlled sharing of files and reports',
                    'Integration with Power BI, Power Apps, Power Automate, and SharePoint'
                ]
            },
            {
                name: 'Photoshop',
                img: 'assets/PhotoShop logo.png',
                alt: 'Photoshop logo',
                front: [],
                back: [
                    'Image editing and composition',
                    'Designing custom visual assets',
                    'Applying branding and UI/UX principles to dashboards'
                ]
            },
            {
                name: 'React',
                img: 'assets/React logo.png',
                alt: 'React logo',
                front: [],
                back: [
                    'Developing interactive user interfaces',
                    'Building reusable components',
                    'Managing state and data flow'
                ]
            },
            {
                name: 'PostgreSQL',
                img: 'assets/PostgreSQL logo.png',
                alt: 'PostgreSQL logo',
                front: [],
                back: [
                    'Designing and optimizing relational databases',
                    'Using SQL queries for data analysis and management',
                    'Managing transactions and data access control'
                ]
            },
            {
                name: 'Google Apps Script',
                img: 'assets/Apps Script logo.png',
                alt: 'Google Apps Script logo',
                front: [],
                back: [
                    'Developing applications for Google Workspace',
                    'Building solutions connected to Google services',
                    'Automating workflows with scripts and triggers'
                ]
            }
        ],
        'projects-title': 'Projects',
        'projects': [
            {
                title: 'Fashion Store',
                desc: 'See the main trends with sales information and customer satisfaction levels.',
                tech: ['Excel', 'Power BI', 'Python'],
                img: 'assets/FashionStores.jpg',
                alt: 'Power BI project screenshot',
                links: [
                    { url: 'https://app.powerbi.com/view?r=eyJrIjoiNzUzYTU4N2QtNzYxNi00ODRlLWIwNTEtNjdhOGFiODFlNzFmIiwidCI6IjFlNjYyYzA0LTk4MmQtNGM5Yi1iZTg5LWE4N2FhMzFiYmVhZCIsImMiOjR9', icon: 'fas fa-external-link-alt', text: 'View' }
                ]
            },
            {
                title: 'Fleet department requests',
                desc: 'Designed for tracking fleet department requests and main request trends.',
                tech: ['Power BI'],
                img: 'assets/FleetRequests.png',
                alt: 'Fleet Department Requests project screenshot',
                icon: 'Power BI project screenshot',
                links: [
                    { url: 'https://app.powerbi.com/view?r=eyJrIjoiY2M3NGVhODItYWNkNC00YTMyLTlmZmQtNjUwZTYyZGIzMGE0IiwidCI6IjFlNjYyYzA0LTk4MmQtNGM5Yi1iZTg5LWE4N2FhMzFiYmVhZCIsImMiOjR9&pageName=d36d6047e02b70cc2cae', icon: 'fas fa-external-link-alt', text: 'View' }
                ]
            },
            {
                title: 'Retail Analytics',
                desc: 'Interactive retail sales analytics dashboard with RFM customer segmentation. ETL processing with Python and Power BI visualization.',
                tech: ['Python', 'Power BI'],
                img: 'assets/RetailAnalytics.jpg',
                icon: 'Power BI project screenshot',
                links: [
                    { url: 'https://github.com/AllanBOG/Portfolio/blob/main/data_processing.py', icon: 'fab fa-github', text: 'Code' },
                    { url: 'https://app.powerbi.com/view?r=eyJrIjoiNDVkMjMzODMtODlmOC00YzY2LTgyZTktMWJjMTdhZmEwMzllIiwidCI6IjFlNjYyYzA0LTk4MmQtNGM5Yi1iZTg5LWE4N2FhMzFiYmVhZCIsImMiOjR9&pageName=409938f12b04936c2adb', icon: 'fas fa-external-link-alt', text: 'View' }
                ]
            },
            {
                title: 'ZentiaFlow',
                desc: 'A React-based SaaS platform designed to support clinic management.',
                tech: ['React', 'SaaS'],
                thumbnail: 'assets/ZentiaFlow 1.png',
                thumbnailAlt: 'Screenshot of the ZentiaFlow application',
                gallery: ['assets/ZentiaFlow 1.png', 'assets/ZentiaFlow 2.png'],
                links: []
            },
            {
                title: 'Warehouse Application',
                desc: 'An application built with Google Apps Script and HTML to support inventory recording and tracking.',
                tech: ['Google Apps Script', 'HTML'],
                thumbnail: 'assets/Bodega app 1.png',
                thumbnailAlt: 'Screenshot of the warehouse application',
                gallery: ['assets/Bodega app 1.png', 'assets/Bodega app 2.png'],
                links: []
            }
        ],
        'contact-title': 'Contact',
        'about-text': [
            'I am a passionate data analyst with over 3 years of experience helping organizations make data-driven decisions. My focus is on turning numbers and complex data into clear, actionable narratives.',
            '<strong>◎ Analysis & Visualization:</strong> Design of interactive dashboards in Power BI and Excel (Power Query, DAX) for KPI monitoring and trends. Development of automated reports that save time and reduce manual errors.',
            '<strong>◎ Automation & Development:</strong> Creation of workflows with Power Automate and low-code apps in Power Apps. Custom solutions with Python (Pandas, NumPy) for advanced analysis or system integration.',
            '<strong>◎ Design & UX/UI:</strong> I combine tools like PhotoShop or Illustrator to enhance visualizations and graphic materials, ensuring clarity and impact.'
        ]
    }
};

// =================================
// EFECTO DE ESCRITURA PARA EL TÍTULO HERO
// =================================

function runTypeWriterEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;

    const text = heroTitle.getAttribute('data-typewriter') || '';
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #333';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    }
    setTimeout(typeWriter, 500);
}

// =================================
// GESTIÓN DE IDIOMA (SOLO UNA VEZ)
// =================================

function setLanguage(lang) {
    document.documentElement.lang = lang;
    const langButton = document.querySelector('.lang-text');
    if (langButton) {
        langButton.textContent = lang === 'es' ? 'EN' : 'ES';
    }
    const elementsToTranslate = document.querySelectorAll('[data-lang]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            // Si es el h1, solo actualiza el atributo data-typewriter, NO el textContent
            if (element.matches('.hero h1')) {
                element.setAttribute('data-typewriter', translations[lang][key]);
                element.textContent = ''; // Vacía el h1 para que el efecto escriba desde cero
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    renderAbout(lang); // Actualiza el contenido del About
    renderSkills(lang); // Actualiza las skills
    renderProjects(lang); // Actualiza los proyectos
    localStorage.setItem('language', lang);

    // Ejecuta el efecto de escritura solo después de actualizar el atributo
    runTypeWriterEffect();
}

function initLanguageToggle() {
    let languageToggle = document.querySelector('.language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    const savedLang = localStorage.getItem('language') || 'es';
    setLanguage(savedLang);
}

function toggleLanguage() {
    const currentLang = document.documentElement.lang || 'es';
    const newLang = currentLang === 'es' ? 'en' : 'es';
    setLanguage(newLang);
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
// INICIALIZACIÓN PRINCIPAL
// =================================

document.addEventListener('DOMContentLoaded', () => {
    // Remover clase de loading
    document.body.classList.remove('loading');

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('darkTheme');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
    
    // Inicializar todas las funcionalidades
    setTimeout(() => {
        document.body.classList.add('loaded');
        initializeAnimations();
        //runTypeWriterEffect();
        initSkillsAnimations();
        initLanguageToggle();
        initProjectGallery();
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

function renderAbout(lang) {
    const aboutTextArr = translations[lang]['about-text'];
    const aboutTextDiv = document.querySelector('.about-text');
    if (aboutTextDiv && Array.isArray(aboutTextArr)) {
        aboutTextDiv.innerHTML = aboutTextArr.map(p => `<p>${p}</p>`).join('');
    }
}
// =================================
// RENDERIZADO DINÁMICO DE SKILLS
// =================================
function renderSkills(lang) {
    const skills = translations[lang]['skills'];
    const container = document.querySelector('.skills-container');
    if (!container) return;
    container.innerHTML = '';
    skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = `skill-item skill-${skill.name.toLowerCase().replace(/\s/g, '')}`;
        div.innerHTML = `
            <div class="skill-content">
                <div class="skill-front">
                    <div class="skill-logo">
                        <img src="${skill.img}" alt="${skill.alt}" loading="lazy">
                    </div>
                    <div class="skill-name">${skill.name}</div>
                </div>
                <div class="skill-back">
                    ${skill.back.map(level => `<div class="skill-level">${level}</div>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    initSkillsAnimations();
}


// =================================
// RENDERIZADO DINÁMICO DE PROYECTOS
// =================================
function renderProjects(lang) {
    const projects = translations[lang]['projects'];
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        const thumbnail = project.img || project.thumbnail;
        const thumbnailAlt = project.alt || project.thumbnailAlt || '';
        card.innerHTML = `
            <div class="project-image">
                ${
                    thumbnail
                        ? `<img src="${thumbnail}" alt="${thumbnailAlt}" loading="lazy">`
                        : `<i class="${project.icon || ''}"></i>`
                }
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.desc}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.links.map(link =>
                        `<a href="${link.url}" class="project-link" target="_blank">
                            <i class="${link.icon}"></i> ${link.text}
                        </a>`
                    ).join('')}
                    ${project.gallery?.length ? `<button class="project-link project-gallery-trigger" type="button" data-gallery-index="${index}">
                        <i class="fas fa-images" aria-hidden="true"></i> ${lang === 'es' ? 'Ver imágenes' : 'View images'}
                    </button>` : ''}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initProjectGallery() {
    const grid = document.querySelector('.projects-grid');
    const dialog = document.querySelector('#project-gallery');
    if (!grid || !dialog) return;

    const image = dialog.querySelector('.gallery-image');
    const title = dialog.querySelector('.gallery-title');
    const counter = dialog.querySelector('.gallery-counter');
    const closeButton = dialog.querySelector('.gallery-close');
    const previousButton = dialog.querySelector('.gallery-previous');
    const nextButton = dialog.querySelector('.gallery-next');
    let images = [];
    let currentIndex = 0;
    let projectTitle = '';
    let language = 'es';

    const updateGallery = () => {
        image.src = images[currentIndex];
        image.alt = `${projectTitle} - ${language === 'es' ? 'imagen' : 'image'} ${currentIndex + 1}`;
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
    };

    grid.addEventListener('click', event => {
        const trigger = event.target.closest('[data-gallery-index]');
        if (!trigger) return;

        language = document.documentElement.lang === 'en' ? 'en' : 'es';
        const project = translations[language].projects[Number(trigger.dataset.galleryIndex)];
        if (!project?.gallery?.length) return;

        images = project.gallery;
        projectTitle = project.title;
        currentIndex = 0;
        title.textContent = projectTitle;
        closeButton.setAttribute('aria-label', language === 'es' ? 'Cerrar galería' : 'Close gallery');
        closeButton.title = language === 'es' ? 'Cerrar galería' : 'Close gallery';
        previousButton.setAttribute('aria-label', language === 'es' ? 'Imagen anterior' : 'Previous image');
        nextButton.setAttribute('aria-label', language === 'es' ? 'Imagen siguiente' : 'Next image');
        dialog.showModal();
        updateGallery();
    });

    previousButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateGallery();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateGallery();
    });

    closeButton.addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') previousButton.click();
        if (event.key === 'ArrowRight') nextButton.click();
    });
}

// Inicializar debugging en desarrollo
// logPerformance();