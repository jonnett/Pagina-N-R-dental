document.addEventListener("DOMContentLoaded", function() {
    //ESTRUCTURA DE DATOS: ARREGLO DE OBJETOS 
    // Almacena los datos estructurados de los especialistas para renderizado dinámico.
    const listaEspecialistas = [
        {
            id: 1,
            nombre: "Dra. Elba Rivera Del Portillo",
            imagen: "assets/fotos/especialistas/elba.png",
            dataEspecialidad: "diagnostico patologia mucosa oral huesos maxilares cirujano dentista general",
            estudios: [
                "Cirujano dentista Universidad de Valparaíso año 2014.",
                "Diplomado en diagnóstico de patología de los huesos maxilares. Universidad Católica año 2024.",
                "Diplomado de actualización en diagnóstico y tratamiento de patología de la mucosa oral. Universidad Católica año 2023."
            ]
        },
        {
            id: 2,
            nombre: "Dr. Luis Nehme Sancho",
            imagen: "assets/fotos/especialistas/luis.png",
            dataEspecialidad: "endodoncia conducto dolor infeccion",
            estudios: [
                "Cirujano Dentista Universidad de Valparaíso año 2014.",
                "Especialidad de endodoncia U. De Chile año 2021."
            ]
        },
        {
            id: 3,
            nombre: "Dr. Manuel Manríquez",
            imagen: "assets/fotos/especialistas/manuel.png",
            dataEspecialidad: "ortodoncia brackets dientes alineacion",
            estudios: [
                "Cirujano dentista Universidad de Valparaíso año 2018.",
                "Especialista en Ortodoncia y Ortopedia Dento Maxilo Facial, Universidad de Valparaíso (c).",
                "Diplomado en Crecimiento y Desarrollo Craneofacial Aplicado a la Ortodoncia Interceptiva, Pontificia Universidad Católica de Chile."
            ]
        },
        {
            id: 4,
            nombre: "Dra. Shigrid Parra Mella",
            imagen: "assets/fotos/especialistas/shigrid.png",
            dataEspecialidad: "niños odontopediatria infantil general",
            estudios: [
                "Cirujano dentista Universidad de Concepción año 2019.",
                "Especialista en Odontopediatría Universidad Andrés Bello año 2024."
            ]
        },
        {
            id: 5,
            nombre: "Dr. Daniel Dalmazzo Contreras",
            imagen: "assets/fotos/especialistas/daniel.png",
            dataEspecialidad: "implantologia implantes encias periodoncia",
            estudios: [
                "Cirujano Dentista Universidad Mayor, año 2005.",
                "Especialista en Periodoncia e implantología, Universidad Mayor, año 2010."
            ]
        },
        {
            id: 6,
            nombre: "Dr. Camilo Quispe",
            imagen: "assets/fotos/especialistas/camilo.png",
            dataEspecialidad: "odontologia familiar limpieza caries restauracion dentista general",
            estudios: [
                "Cirujano Dentista Universidad de Valparaíso año 2015."
            ]
        },
        {
            id: 7,
            nombre: "Dr. Nicolas Coria Labarca",
            imagen: "assets/fotos/especialistas/nicolas.png",
            dataEspecialidad: "odontologia general limpieza caries restauracion evaluacion dentista general",
            estudios: [
                "Cirujano Dentista Universidad de Antofagasta año 2018."
            ]
        }
    ];


    //MENÚ HAMBURGUESA Y ACCESIBILIDAD ARIA
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const desplegado = navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
            
            // Actualización dinámica de atributos ARIA exigidos por la pauta
            hamburger.setAttribute("aria-expanded", desplegado ? "true" : "false");
            hamburger.setAttribute("aria-label", desplegado ? "Cerrar menú de navegación" : "Abrir menú de navegación");
        });

        document.querySelectorAll(".nav-menu a:not(.dropbtn)").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                hamburger.setAttribute("aria-label", "Abrir menú de navegación");
            });
        });
    }
    const dropbtn = document.querySelector(".dropbtn");
    const dropdown = document.querySelector(".dropdown");
     if ( dropbtn && dropdown) {
        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    }

    // === LÓGICA DE PAGINACIÓN ===
    let paginaActual = 1;
    let especialistasActuales = listaEspecialistas; 

    // Calcula cuántos profesionales caben en "una sola línea" según el tamaño de la pantalla
    function calcularElementosPorPagina() {
        const ancho = window.innerWidth;
        if (ancho <= 768) return 1;  // Celulares: 1 por línea
        if (ancho <= 1024) return 2; // Tablets: 2 por línea
        return 3;                    // Computadoras: 3 por línea
    }

    let elementosPorPagina = calcularElementosPorPagina();

    // Recalcular paginación al redimensionar la ventana
    window.addEventListener("resize", () => {
        const nuevosElementos = calcularElementosPorPagina();
        if (nuevosElementos !== elementosPorPagina) {
            elementosPorPagina = nuevosElementos;
            paginaActual = 1;
            renderizarPaginacion(especialistasActuales);
        }
    });

    //CARGA DINÁMICA DE CONTENIDO EN EL DOM 
    /**
     * Renderiza las tarjetas de especialistas en el DOM basándose en un arreglo provisto.
     * @param {Array} especialistas - Listado de objetos de especialistas a dibujar.
     */
    function renderizarEspecialistas(especialistas) {
        const contenedor = document.getElementById("contenedorEspecialistas");
        if (!contenedor) return;
        
        contenedor.innerHTML = ""; // Limpieza controlada del contenedor antes de pintar

        especialistas.forEach(profesional => {
            const card = document.createElement("div");
            card.className = "profesional-card fade-in appear"; 
            card.setAttribute("data-especialidad", profesional.dataEspecialidad);

            // Contenedor de imagen
            const divImg = document.createElement("div");
            divImg.className = "profesional-img";
            const img = document.createElement("img");
            img.src = profesional.imagen;
            img.alt = profesional.nombre;
            divImg.appendChild(img);

            // Nombre
            const h3 = document.createElement("h3");
            h3.textContent = profesional.nombre;

            // Capa interactiva Hover
            const divInfo = document.createElement("div");
            divInfo.className = "info-extra";

            profesional.estudios.forEach(estudio => {
                const pEstudio = document.createElement("p");
                pEstudio.textContent = estudio;
                divInfo.appendChild(pEstudio);
            });

            // Ensamblaje de la tarjeta
            card.appendChild(divImg);
            card.appendChild(h3);
            card.appendChild(divInfo);

            contenedor.appendChild(card);
        });
    }

    // Corta el arreglo y crea los cuadritos de números
    function renderizarPaginacion(especialistas) {
        especialistasActuales = especialistas; 
        
        // 1. Cortar la lista para la página actual
        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        const especialistasPagina = especialistas.slice(inicio, fin);
        
        // 2. Renderizar solo esa parte
        renderizarEspecialistas(especialistasPagina);

        // 3. Crear los controles de paginación (1, 2, 3...) dinámicamente
        let contenedorPaginacion = document.getElementById("paginacionEspecialistas");
        
        // Si no existe, lo inyectamos automáticamente bajo los especialistas
        if (!contenedorPaginacion) {
            contenedorPaginacion = document.createElement("div");
            contenedorPaginacion.id = "paginacionEspecialistas";
            contenedorPaginacion.className = "paginacion-container";
            const contenedorPadre = document.getElementById("contenedorEspecialistas").parentNode;
            contenedorPadre.insertBefore(contenedorPaginacion, document.getElementById("contenedorEspecialistas").nextSibling);
        }
        
        contenedorPaginacion.innerHTML = ""; // Limpiamos números anteriores
        const totalPaginas = Math.ceil(especialistas.length / elementosPorPagina);

        // No mostrar la paginación si todos caben en una sola página
        if (totalPaginas <= 1) return; 

        for (let i = 1; i <= totalPaginas; i++) {
            const btn = document.createElement("button");
            btn.className = `btn-paginacion ${i === paginaActual ? "active" : ""}`;
            btn.textContent = i;
            
            btn.addEventListener("click", () => {
                paginaActual = i;
                renderizarPaginacion(especialistasActuales);
            });
            
            contenedorPaginacion.appendChild(btn);
        }
    }

    // Inicializar la carga con paginación al entrar a la página
    renderizarPaginacion(listaEspecialistas);

    //FILTRO Y BUSQUEDA INTERACTIVA EN TIEMPO REAL 
    const buscador = document.getElementById("buscadorEspecialista");
    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const mensajeNoEncontrado = document.getElementById("mensajeNoEncontrado");
    
    let filtroActivo = "todos";

    /**
     * Procesa la entrada del buscador y la botonera activa utilizando métodos de filtrado estructurados.
     */
    function filtrarEspecialistas() {
        const textoBusqueda = buscador ? buscador.value.toLowerCase().trim() : "";

        // Uso estricto de .filter() sobre el arreglo de objetos 
        const especialistasFiltrados = listaEspecialistas.filter(profesional => {
            const especialidadesData = profesional.dataEspecialidad.toLowerCase();
            const nombreEspecialista = profesional.nombre.toLowerCase();

            // Validación de la botonera de categorías
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

            // Validación del campo de texto
            const coincideTexto = nombreEspecialista.includes(textoBusqueda) || especialidadesData.includes(textoBusqueda);

            return coincideFiltro && coincideTexto;
        });

        // Renderizado del DOM reactivo con el resultado filtrado y paginado
        paginaActual = 1;
        renderizarPaginacion(especialistasFiltrados);

        // Control del mensaje de registros vacíos
        if (mensajeNoEncontrado) {
            mensajeNoEncontrado.style.display = (especialistasFiltrados.length === 0) ? "block" : "none";
        }
    }

    if (buscador) {
        buscador.addEventListener("input", filtrarEspecialistas);
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function() {
            botonesFiltro.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            filtroActivo = this.getAttribute("data-filtro");
            filtrarEspecialistas();
        });
    });

    //VALIDACIÓN SEGURA DE FORMULARIO 
    const formContacto = document.getElementById("formContacto");
    const inputNombre = document.getElementById("nombre");
    const inputCorreo = document.getElementById("correo");
    const inputMensaje = document.getElementById("mensaje");
    const btnEnviarForm = document.getElementById("btnEnviarForm");
    const mensajeExito = document.getElementById("mensajeExito");

    if (formContacto) {
        formContacto.addEventListener("submit", function(event) {
            event.preventDefault(); // Detener envío automático del HTML

            // Resetear estados y mensajes previos de error
            let formValido = true;
            document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
            if (mensajeExito) mensajeExito.style.display = "none";

            // Validación de Nombre Obligatorio y longitud mínima
            if (!inputNombre || inputNombre.value.trim().length < 3) {
                document.getElementById("errorNombre").textContent = "El nombre es obligatorio y debe tener al menos 3 caracteres.";
                formValido = false;
            }

            // Validación de Correo con Expresión Regular exigida por pauta
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!inputCorreo || !regexEmail.test(inputCorreo.value.trim())) {
                document.getElementById("errorCorreo").textContent = "Por favor, introduce un correo electrónico válido.";
                formValido = false;
            }

            // Validación de longitud mínima de mensaje
            if (!inputMensaje || inputMensaje.value.trim().length < 10) {
                document.getElementById("errorMensaje").textContent = "El mensaje es obligatorio y debe contener al menos 10 caracteres.";
                formValido = false;
            }

            // Control de deshabilitación de envío en base a errores 
            if (!formValido) {
                btnEnviarForm.disabled = true;
                setTimeout(() => { btnEnviarForm.disabled = false; }, 3000); // Rehabilitar tras 3s para reintentar
                return;
            }

            // SANITIZACIÓN ESTRICTA CONTRA ATAQUES XSS 
            if (mensajeExito) {
                mensajeExito.textContent = "¡Muchas gracias, " + inputNombre.value.trim() + "! Tu mensaje ha sido enviado con éxito de forma segura.";
                mensajeExito.style.display = "block";
            }

            formContacto.reset(); // Limpieza del formulario
        });
    }

    //PERSISTENCIA DE MODO OSCURO
    const themeToggleBtn = document.getElementById("themeToggle");
    
    // Restauración inmediata del estado guardado en el localStorage al cargar la página
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

    //CARRUSEL PRINCIPAL 
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

    if (slides.length > 0) {
        startSlideShow();
    }

    //BOTÓN VOLVER ARRIBA Y ANIMACIONES DE SCROLL 
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
        fadeElements.forEach(element => element.classList.add("appear"));
    }
});