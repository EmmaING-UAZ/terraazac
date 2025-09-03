document.addEventListener('DOMContentLoaded', () => {
    const services = [
        {
            name: 'Terraza para Eventos',
            description: 'Vive una noche privada con montaje completo, música, decoración y atención dedicada.',
            img: 'assets/img/card-terraza-16x9.jpg',
            link: 'terraza.html'
        },
        {
            name: 'Renta de Letras LED',
            description: 'Frases gigantes para anunciar lo que sientes con un toque de luz.',
            img: 'assets/img/card-letras-16x9.jpg',
            link: 'letras.html'
        },
        {
            name: 'Revelación de Género',
            description: 'Haz de tu revelación un recuerdo épico con un montaje espectacular.',
            img: 'assets/img/card-revelacion-16x9.jpg',
            link: 'revelacion.html'
        }
    ];

    let currentIndex = 0;
    const wrapper = document.getElementById('slider-wrapper');

    function renderSlider() {
        wrapper.innerHTML = `
            <div class="slider-container">
                <div class="slider-main-view"></div>
                <div class="slider-content">
                    <div class="name"></div>
                    <div class="des"></div>
                    <a href="#" class="ver-mas-btn">Ver Más</a>
                </div>
                <div class="next-services-stack">
                    <div class="item"></div>
                    <div class="item"></div>
                </div>
                <div class="slider-buttons">
                    <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
                    <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            </div>
        `;
        updateSlider(true); // Initial load
        attachEventListeners();
    }

    function updateSlider(isInitialLoad = false) {
        const mainView = wrapper.querySelector('.slider-main-view');
        const content = wrapper.querySelector('.slider-content');
        const stackItems = wrapper.querySelectorAll('.next-services-stack .item');
        const stackContainer = wrapper.querySelector('.next-services-stack');

        // Current service data
        const currentService = services[currentIndex];

        // Next two services data
        const nextIndex1 = (currentIndex + 1) % services.length;
        const nextIndex2 = (currentIndex + 2) % services.length;
        const nextService1 = services[nextIndex1];
        const nextService2 = services[nextIndex2];

        // Update main view
        mainView.style.backgroundImage = `url('${currentService.img}')`;
        content.querySelector('.name').textContent = currentService.name;
        content.querySelector('.des').textContent = currentService.description;
        content.querySelector('a').href = currentService.link;

        // Update stack cards
        stackItems[0].style.backgroundImage = `url('${nextService1.img}')`;
        stackItems[1].style.backgroundImage = `url('${nextService2.img}')`;

        if (!isInitialLoad) {
            stackContainer.classList.add('next');
            setTimeout(() => {
                stackContainer.classList.remove('next');
            }, 500); // Duration of the animation
        }
    }

    function attachEventListeners() {
        const nextButton = wrapper.querySelector('.next');
        const prevButton = wrapper.querySelector('.prev');

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % services.length;
            updateSlider();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + services.length) % services.length;
            // Note: The animation is only designed for 'next', so we'll just update without animation for 'prev'
            updateSlider(true);
        });
    }

    if (wrapper) {
        renderSlider();
    }
});
