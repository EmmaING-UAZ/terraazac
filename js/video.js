document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURACIÓN ---
    const videoModal = document.getElementById('video-modal');
    const viewVideosBtn = document.getElementById('view-videos-btn');
    const closeModalBtn = document.getElementById('close-video-modal');
    const videoPlayer = document.getElementById('video-player'); // <-- Cambiado de iframe
    const playlistContainer = document.getElementById('video-playlist-container');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const videoTitleEl = document.getElementById('video-title');

    // Array de videos (rutas locales y títulos)
    const VIDEOS = [
        { src: 'assets/videos/v1.mp4', title: 'Evento en Terraza 1' },
        { src: 'assets/videos/v2.mp4', title: 'Decoración Especial' },
        { src: 'assets/videos/v3.mp4', title: 'Revelación de Género' },
        { src: 'assets/videos/v4.mp4', title: 'Noche Mágica' },
        { src: 'assets/videos/v5.mp4', title: 'Propuesta de Matrimonio' },
        { src: 'assets/videos/v6.mp4', title: 'Letras LED Gigantes' },
        { src: 'assets/videos/v7.mp4', title: 'Celebración de Cumpleaños' },
        { src: 'assets/videos/v8.mp4', title: 'Ambiente Nocturno' },
        { src: 'assets/videos/v9.mp4', title: 'Detalles del Servicio' },
    ];

    let currentVideoIndex = 0;

    // --- 2. FUNCIONES DEL REPRODUCTOR ---

    /**
     * Carga un video en el elemento <video> por su índice en el array VIDEOS.
     * @param {number} videoIndex - El índice del video a cargar.
     */
    function loadVideo(videoIndex) {
        if (videoIndex < 0 || videoIndex >= VIDEOS.length || !videoPlayer) return;

        currentVideoIndex = videoIndex;
        const video = VIDEOS[videoIndex];

        videoPlayer.src = video.src;
        videoPlayer.load(); // Carga el nuevo video
        videoPlayer.play().catch(error => console.error("Error al intentar reproducir video:", error)); // Intenta reproducir

        if (videoTitleEl) videoTitleEl.textContent = video.title;

        updatePlaylistUI();
    }

    // --- 3. LÓGICA DEL MODAL Y LA LISTA DE REPRODUCCIÓN ---

    function openModal() {
        if (videoModal) {
            videoModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            loadVideo(0); // Cargar el primer video al abrir
        }
    }

    function closeModal() {
        if (videoModal) {
            videoModal.classList.add('hidden');
            document.body.style.overflow = '';
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.src = ''; // Detener la carga del video
            }
        }
    }

    /**
     * Crea y muestra las miniaturas en la lista de reproducción.
     */
    function populatePlaylist() {
        if (!playlistContainer) return;
        playlistContainer.innerHTML = ''; // Limpiar
        VIDEOS.forEach((video, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-brand-surface-2 transition-colors';
            thumb.dataset.index = index;
            thumb.innerHTML = `
                <img src="assets/video-thumbs/v${index + 1}.jpg" alt="Miniatura ${video.title}" class="w-24 h-14 object-cover rounded-md" loading="lazy" decoding="async">
                <span class="text-sm font-semibold text-brand-text-secondary">${video.title}</span>
            `;
            thumb.addEventListener('click', () => loadVideo(index));
            playlistContainer.appendChild(thumb);
        });
    }

    /**
     * Resalta la miniatura del video que se está reproduciendo.
     */
    function updatePlaylistUI() {
        playlistContainer.querySelectorAll('div[data-index]').forEach((thumb) => {
            const thumbIndex = parseInt(thumb.dataset.index, 10);
            if (thumbIndex === currentVideoIndex) {
                thumb.classList.add('bg-brand-accent-1/20');
                thumb.querySelector('span').classList.add('text-white');
            } else {
                thumb.classList.remove('bg-brand-accent-1/20');
                thumb.querySelector('span').classList.remove('text-white');
            }
        });
    }


    // --- 4. EVENT LISTENERS ---
    if (viewVideosBtn) {
        viewVideosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) closeModal(); // Cerrar al hacer clic en el fondo
        });
    }

    // Listener para el botón de Play/Pause
    if (playPauseBtn && videoPlayer) {
        playPauseBtn.addEventListener('click', () => {
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
        });

        // Actualizar el texto del botón según el estado del video
        videoPlayer.addEventListener('play', () => {
            playPauseBtn.textContent = 'Pause';
        });
        videoPlayer.addEventListener('pause', () => {
            playPauseBtn.textContent = 'Play';
        });
    }

    // --- 5. INICIALIZACIÓN ---
    populatePlaylist();


    // --- 6. LÓGICA PARA REPRODUCTORES DE VIDEO EN GALERÍAS ---
    const videoItems = document.querySelectorAll('.video-gallery-item');

    videoItems.forEach(item => {
        const playButton = item.querySelector('.play-button');
        const video = item.querySelector('video');

        if (playButton && video) {
            playButton.addEventListener('click', (e) => {
                // Previene que el evento de clic se propague
                e.stopPropagation();

                // Añade la clase 'playing' al contenedor
                item.classList.add('playing');

                // Muestra los controles nativos del video
                video.controls = true;

                // Inicia la reproducción del video
                video.play();
            });

            // Cuando el video termina, vuelve al estado inicial (poster)
            video.addEventListener('ended', () => {
                item.classList.remove('playing');
                video.controls = false;
                video.load(); // Carga de nuevo para mostrar el poster
            });
        }
    });
});
