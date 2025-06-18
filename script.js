document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const doc = document.documentElement; // Acessa a tag <html>

    // Pega o tema salvo no localStorage ou o tema padrão do sistema
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Aplica o tema inicial
    doc.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeSwitcher.textContent = '☀️'; // Sol para modo claro
    } else {
        themeSwitcher.textContent = '🌙'; // Lua para modo escuro
    }

    themeSwitcher.addEventListener('click', () => {
        let currentTheme = doc.getAttribute('data-theme');
        let newTheme;

        if (currentTheme === 'light') {
            newTheme = 'dark';
            themeSwitcher.textContent = '☀️';
        } else {
            newTheme = 'light';
            themeSwitcher.textContent = '🌙';
        }

        doc.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Salva a preferência
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (código do theme switcher que já estava aqui) ...

    // --- CÓDIGO NOVO DO CARROSSEL ---
    const track = document.querySelector('.carousel-track');
    if (track) { // Garante que o código só rode se o carrossel existir
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.carousel-button.next');
        const prevButton = document.querySelector('.carousel-button.prev');
        
        // Pega a largura do slide dinamicamente
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Função para mover os slides
        const moveToSlide = (currentTrack, targetSlide) => {
            currentTrack.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        }

        // Organiza os slides um ao lado do outro
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        // Quando o botão PRÓXIMO for clicado...
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            let nextSlide = currentSlide.nextElementSibling;
            
            // Se não houver próximo slide, volta para o primeiro (loop)
            if (!nextSlide) {
                nextSlide = slides[0];
            }

            moveToSlide(track, nextSlide);
            currentSlide.classList.remove('current-slide');
            nextSlide.classList.add('current-slide');
        });

        // Quando o botão ANTERIOR for clicado...
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            let prevSlide = currentSlide.previousElementSibling;
            
            // Se não houver slide anterior, vai para o último (loop)
            if (!prevSlide) {
                prevSlide = slides[slides.length - 1];
            }

            moveToSlide(track, prevSlide);
            currentSlide.classList.remove('current-slide');
            prevSlide.classList.add('current-slide');
        });
        
        // Define o primeiro slide como o slide atual para começar
        slides[0].classList.add('current-slide');
    }
});