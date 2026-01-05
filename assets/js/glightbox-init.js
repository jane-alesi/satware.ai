/**
 * GLightbox Initialization for satware.ai
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GLightbox
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
        zoomable: true,
        draggable: true,
        openEffect: 'zoom',
        closeEffect: 'zoom',
        slideHTML: '<div class="gslide">' +
                    '<div class="gslide-inner-content">' +
                        '<div class="ginner-container">' +
                            '<div class="gslide-media">' +
                            '</div>' +
                            '<div class="gslide-description">' +
                                '<div class="gdesc-inner">' +
                                    '<h4 class="gslide-title"></h4>' +
                                    '<div class="gslide-desc"></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
    });

    // Auto-bind images that were using the old lightbox system
    // Old system used .satag-lightbox-trigger or just images in certain containers
    const images = document.querySelectorAll('img.agent-profile-image, .agent-profile-image img, .screenshot-container img');
    images.forEach(img => {
        if (!img.closest('.glightbox')) {
            const link = document.createElement('a');
            link.href = img.src;
            link.classList.add('glightbox');
            link.setAttribute('data-glightbox', 'title: ' + (img.alt || 'satware.ai Image'));
            
            // Wrap image with link
            img.parentNode.insertBefore(link, img);
            link.appendChild(img);
        }
    });
    
    // Refresh lightbox to include newly bound images
    lightbox.reload();
});
