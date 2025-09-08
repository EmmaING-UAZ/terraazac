document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL LIGHTBOX PARA IMÁGENES ---

    // 1. Crear el HTML del lightbox una sola vez y añadirlo al body
    const lightboxHTML = `
        <div id="image-lightbox" class="lightbox">
            <div class="lightbox-content">
                <img src="" alt="Imagen ampliada de la galería">
            </div>
            <button class="lightbox-close" aria-label="Cerrar imagen">&times;</button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // 2. Obtener referencias a los elementos del DOM
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-image');

    // 3. Funciones para abrir y cerrar el lightbox
    const openLightbox = (src) => {
        lightboxImage.src = src;
        lightbox.classList.add('visible');
        document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
    };

    const closeLightbox = () => {
        lightbox.classList.remove('visible');
        document.body.style.overflow = ''; // Restaurar scroll
    };

    // 4. Asignar Event Listeners
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            openLightbox(image.src);
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Cerrar al hacer clic en el fondo (el overlay)
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Cerrar al presionar la tecla 'Escape'
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
            closeLightbox();
        }
    });
});
