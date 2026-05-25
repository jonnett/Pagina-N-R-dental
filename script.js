document.addEventListener("DOMContentLoaded", function() {

    //MENÚ HAMBURGUESA
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
            });
        });
    }


    //CARRUSEL PRINCIPAL (SOBRE NOSOTROS)
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides[currentSlide].classList.add("active");
        if (dots[currentSlide]) dots[currentSlide].classList.add("active");
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            startSlideShow();
        });
        prevBtn.addEventListener("click", () => {
            prevSlide();
            startSlideShow();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlideShow();
        });
    });

    // Inicializar carrusel si existe
    if (slides.length > 0) {
        startSlideShow();
    }


    //LÓGICA COMBINADA: BUSCADOR Y BOTONERA DE FILTROS
    const buscador = document.getElementById("buscadorEspecialista");
    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const tarjetas = document.querySelectorAll(".profesional-card");
    const mensajeNoEncontrado = document.getElementById("mensajeNoEncontrado");
    
    let filtroActivo = "todos"; // Almacena el filtro de botón actual

    function filtrarEspecialistas() {
        const textoBusqueda = buscador ? buscador.value.toLowerCase().trim() : "";
        let encontrados = 0;

        tarjetas.forEach(tarjeta => {
            const especialidadesData = tarjeta.getAttribute("data-especialidad") ? tarjeta.getAttribute("data-especialidad").toLowerCase() : "";
            const nombreEspecialista = tarjeta.querySelector("h3") ? tarjeta.querySelector("h3").textContent.toLowerCase() : "";
            
            //Verificar coincidencia con el botón de filtro elegido
            let coincideFiltro = false;
            if (filtroActivo === "todos") {
                coincideFiltro = true;
            } else if (filtroActivo === "general") {
                coincideFiltro = especialidadesData.includes("general");
            } else if (filtroActivo === "endodoncia") {
                coincideFiltro = especialidadesData.includes("endodoncia");
            } else if (filtroActivo === "ortodoncia") {
                coincideFiltro = especialidadesData.includes("ortodoncia");
            } else if (filtroActivo === "odontopediatria") {
                coincideFiltro = especialidadesData.includes("odontopediatria") || especialidadesData.includes("niños");
            } else if (filtroActivo === "implantologia") {
                coincideFiltro = especialidadesData.includes("implantologia") || especialidadesData.includes("periodoncia");
            }

            //Verificar coincidencia con lo escrito en la barra de búsqueda
            const coincideTexto = nombreEspecialista.includes(textoBusqueda) || especialidadesData.includes(textoBusqueda);

            //Mostrar u ocultar respetando AMBAS condiciones
            if (coincideFiltro && coincideTexto) {
                tarjeta.style.display = "block";
                // Pequeño retardo para suavizar la transición visual de entrada
                setTimeout(() => tarjeta.style.opacity = "1", 10); 
                encontrados++;
            } else {
                tarjeta.style.display = "none";
                tarjeta.style.opacity = "0";
            }
        });

        // Controlar el mensaje de error cuando la búsqueda queda vacía
        if (mensajeNoEncontrado) {
            if (encontrados === 0) {
                mensajeNoEncontrado.style.display = "block";
            } else {
                mensajeNoEncontrado.style.display = "none";
            }
        }
    }

    // Evento para cuando el usuario escribe en el buscador
    if (buscador) {
        buscador.addEventListener("input", filtrarEspecialistas);
    }

    // Eventos para cuando el usuario presiona un botón de la botonera
    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function() {
            // Cambiar la clase activa visualmente entre botones
            botonesFiltro.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Actualizar la variable del filtro global y ejecutar la lógica
            filtroActivo = this.getAttribute("data-filtro");
            filtrarEspecialistas();
        });
    });


    // MODO OSCURO (THEME TOGGLE) 
    const themeToggleBtn = document.getElementById("themeToggle");
    
    // Comprobar si el usuario ya tenía una preferencia guardada de antes
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                themeToggleBtn.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                themeToggleBtn.textContent = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }


    //BOTÓN VOLVER ARRIBA
    const botonArriba = document.getElementById("botonArriba");

    if (botonArriba) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                botonArriba.classList.add("show");
            } else {
                botonArriba.classList.remove("show");
            }
        });

        botonArriba.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    //ANIMACIÓN FADE-IN AL HACER SCROLL (INTERSECTION OBSERVER)
    const fadeElements = document.querySelectorAll(".fade-in");

    if ('IntersectionObserver' in window) {
        const appearanceOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearanceObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appear");
                    observer.unobserve(entry.target); 
                }
            });
        }, appearanceOptions);

        fadeElements.forEach(element => {
            appearanceObserver.observe(element);
        });
    } else {
        // Soporte para navegadores muy antiguos que no entienden IntersectionObserver
        fadeElements.forEach(element => element.classList.add("appear"));
    }

});