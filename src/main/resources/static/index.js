$(document).ready(function(){

    $('.navbar-nav a, .scroll-link').on('click', function(e){
        if(this.hash !== ''){
            e.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        }
    });
    $(window).scroll(function(){
        const scrollDistance = $(window).scrollTop();

        $('.section').each(function(i){
            if($(this).position().top <= scrollDistance + 100){
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    }).scroll();
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('shrink');
        } else {
            navbar.classList.add('shrink');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let lastScrollTime = 0;

    function isInViewport(elem) {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function handleScroll(event) {
        event.preventDefault();

        const now = Date.now();
        const delta = now - lastScrollTime;
        lastScrollTime = now;

        if (delta < 200 || isScrolling) {
            return;
        }

        isScrolling = true;

        const deltaY = event.deltaY;
        let targetSection = null;

        if (deltaY > 0) {
            for (let i = 0; i < sections.length; i++) {
                if (isInViewport(sections[i])) {
                    targetSection = sections[i + 1];
                    break;
                }
            }
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (isInViewport(sections[i])) {
                    targetSection = sections[i - 1];
                    break;
                }
            }
        }
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            isScrolling = false;
        }, 1000); 
    }

    window.addEventListener('wheel', handleScroll);

    const navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');
    const mainContent = document.getElementById('main-content');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();  // Prevenir el comportamiento predeterminado del enlace
            const template = link.getAttribute('data-template');  // Obtener el nombre de la plantilla
            
            // Cargar la plantilla
            loadTemplate(template);
        });
    });

    // Cargar la plantilla por defecto (por ejemplo, "main-template.html")
    loadTemplate('main-template.html');

    // Función para cargar las plantillas
    function loadTemplate(template) {
        fetch(template)
            .then(response => response.text())  // Obtener el contenido del archivo HTML
            .then(html => {
                // Insertar el contenido de la plantilla en el contenedor principal
                mainContent.innerHTML = html;
                if (template === 'menu-template.html') {
                    // Si se carga la plantilla del menú, obtener los ítems del menú
                    loadMenuItems();
                }
            })
            .catch(error => console.error('Error al cargar la plantilla:', error));
    }

    // Función para cargar los ítems del menú
    function loadMenuItems() {
        const bentoContainer = document.getElementById('bento-container');
        
        // Obtener los ítems del menú desde el servidor (reemplaza la URL con tu API real)
        fetch('http://localhost:8080/dishes')
            .then(response => response.json())  // Parsear la respuesta a JSON
            .then(items => {
                // Iterar sobre los ítems y agregar cada uno al contenedor
                items.forEach(item => {
                    const box = document.createElement('div');
                    box.classList.add('bento-item');
                    box.setAttribute('data-id', item.id);
                    box.style.backgroundImage = `url(${item.image_url})`;  // Establecer la imagen de fondo
                    
                    const bentoText = document.createElement('div');
                    bentoText.classList.add('bento-text');

                    const name = document.createElement('h3');
                    name.textContent = item.name;  // Nombre del ítem
                    bentoText.appendChild(name);

                    const description = document.createElement('p');
                    description.textContent = item.description;  // Descripción del ítem
                    bentoText.appendChild(description);

                    const price = document.createElement('a');
                    price.classList.add('price-button');
                    price.textContent = `$${item.price.toFixed(2)}`;  // Precio del ítem
                    price.addEventListener('click', function() {
                        addToCart(item);  // Llamamos a la función para agregar al carrito
                    });
                    bentoText.appendChild(price);

                    box.appendChild(bentoText);
                    bentoContainer.appendChild(box);
                });
            })
            .catch(error => console.error('Error al cargar los ítems del menú:', error));
    }
});


