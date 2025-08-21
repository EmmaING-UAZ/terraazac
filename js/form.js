document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenimos el envío real del formulario

            // --- Validación ---
            let isValid = true;
            const errors = [];

            // Resetear estilos de error previos
            contactForm.querySelectorAll('[required]').forEach(input => {
                input.classList.remove('border-red-500', 'focus:ring-red-500');
                input.classList.add('border-brand-border', 'focus:ring-brand-accent-1');
            });
            if (formStatus) formStatus.innerHTML = '';

            // 1. Validación de Honeypot (anti-spam)
            const honeypot = document.getElementById('honeypot');
            if (honeypot && honeypot.value !== '') {
                // Es probable que sea un bot, fallamos silenciosamente
                console.log('Honeypot triggered.');
                return;
            }

            // 2. Validación de campos requeridos
            const requiredFields = ['name', 'phone', 'message'];
            requiredFields.forEach(fieldId => {
                const input = document.getElementById(fieldId);
                if (input && input.value.trim() === '') {
                    isValid = false;
                    errors.push(`El campo ${input.name} es obligatorio.`);
                    input.classList.add('border-red-500', 'focus:ring-red-500');
                    input.classList.remove('border-brand-border', 'focus:ring-brand-accent-1');
                }
            });

            // --- Resultado ---
            if (isValid) {
                // Simulación de envío exitoso
                console.log('Formulario válido, enviando...');
                if(formStatus) {
                    formStatus.innerHTML = '<p class="text-green-400">¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.</p>';
                }
                contactForm.reset(); // Limpiar el formulario

                // Aquí iría la lógica de envío real, por ejemplo, con fetch() a un endpoint
                // const formData = new FormData(contactForm);
                // fetch('/api/contact', { method: 'POST', body: formData })
                //   .then(response => response.json())
                //   .then(data => console.log(data))
                //   .catch(error => console.error('Error:', error));

            } else {
                // Mostrar errores
                console.log('Formulario inválido:', errors);
                 if(formStatus) {
                    formStatus.innerHTML = `<p class="text-red-400">Por favor, corrige los campos marcados en rojo.</p>`;
                }
            }
        });
    }
});
