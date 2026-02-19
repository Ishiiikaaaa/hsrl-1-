// js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Home Page Hero Slider ---
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = document.querySelectorAll('.hero-slider .slide');
        let currentSlide = 0;
        const slideInterval = 5000; // 5 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        if (slides.length > 0) {
            slides[0].classList.add('active');
            setInterval(nextSlide, slideInterval);
        }
    }

    // --- Home Page Partner Swiper ---
    const partnerSlider = document.querySelector('.logo-section .slide-track');

if (partnerSlider) {
  partnerSlider.addEventListener('mouseenter', () => {
    partnerSlider.style.animationPlayState = 'paused';
  });

  partnerSlider.addEventListener('mouseleave', () => {
    partnerSlider.style.animationPlayState = 'running';
  });
}




    // --- Offers Page Scrolling Carousel ---
    const offersTrack = document.querySelector('.offers-track');
    if (offersTrack) {
        const offerItems = offersTrack.querySelectorAll('.offer-item');
        // Duplicate items to create the seamless loop
        offerItems.forEach(item => {
            const clone = item.cloneNode(true);
            offersTrack.appendChild(clone);
        });
    }
    
    // --- Active Nav Link ---
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.main-nav a');
    const homeLink = document.querySelector('.main-nav a[href="index.html"]');

    let activeLinkFound = false;
    navLinks.forEach(link => {
        if(link.href === currentLocation) {
            link.classList.add('active');
            activeLinkFound = true;
        } else {
            link.classList.remove('active');
        }
    });

    // If no specific page matches (e.g., on the root domain), highlight Home
    if (!activeLinkFound && (currentLocation.endsWith('/') || !currentLocation.split('/').pop().includes('.'))) {
         if(homeLink) homeLink.classList.add('active');
    }

});