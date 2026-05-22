document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('#mainCarousel .slide');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    let currentIndex = 0;
    let autoSlideInterval;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() { showSlide(currentIndex + 1); }
    function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 8000); }
    function resetInterval() { clearInterval(autoSlideInterval); startAutoSlide(); }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentIndex - 1); resetInterval(); });
    dots.forEach((dot, idx) => dot.addEventListener('click', () => { showSlide(idx); resetInterval(); }));
    startAutoSlide();

    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const dropbtn = document.querySelector('.dropbtn');
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropbtn) {
        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const isOpen = dropdown.classList.contains('is-open');
                
                if (isOpen) {
                    dropdown.classList.remove('is-open');
                } else {
                    dropdown.classList.add('is-open');
                }
            }
        });
    }

    const allLinks = document.querySelectorAll('.nav-menu a:not(.dropbtn)');
    allLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(hamburger) hamburger.classList.remove('active');
            if(navMenu) navMenu.classList.remove('active');
            dropdown.classList.remove('is-open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && dropdown.classList.contains('is-open')) {
            dropdown.classList.remove('is-open');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            dropdown.classList.remove('is-open');
            if(hamburger) hamburger.classList.remove('active');
            if(navMenu) navMenu.classList.remove('active');
        }
    });
});

const buscador = document.getElementById('buscadorEspecialista');
const especialistas = document.querySelectorAll('.profesional-card');
const mensaje = document.getElementById('mensajeNoEncontrado');

if (buscador) {
    buscador.addEventListener('input', () => {
        const texto = buscador.value.toLowerCase();
        let encontrados = 0;
        especialistas.forEach(card => {
            const especialidad = card.dataset.especialidad.toLowerCase();
            if (especialidad.includes(texto)) {
                card.style.display = 'block';
                encontrados++;
            } else {
                card.style.display = 'none';
            }
        });

        if (encontrados === 0) {
            mensaje.style.display = 'block';
        } else {
            mensaje.style.display = 'none';
        }
    });
}

    const themeToggle = document.getElementById("themeToggle");
console.log(themeToggle);
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeToggle.innerHTML = "☀️";
    } else {
        themeToggle.innerHTML = "🌙";
    }
});


