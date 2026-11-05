
document.addEventListener('DOMContentLoaded', () => {

    // --- Home Page Hero Slider: Automatic + Manual ---
    const heroSlider = document.querySelector('.hero-slider');

    if (heroSlider) {
        const slides = Array.from(
            heroSlider.querySelectorAll('.slide')
        );

        const dotsContainer = heroSlider.querySelector('.slider-dots');

        if (slides.length > 0 && dotsContainer) {
            let currentSlide = 0;
            let autoPlay;

            // Create numbered buttons automatically
            slides.forEach((slide, index) => {
                const button = document.createElement('button');

                button.type = 'button';
                button.className = 'slider-dot';
                button.textContent = index + 1;
                button.setAttribute(
                    'aria-label',
                    'Show image ' + (index + 1)
                );

                button.addEventListener('click', () => {
                    showSlide(index);
                    startAutoPlay();
                });

                dotsContainer.appendChild(button);
            });

            const buttons = Array.from(
                dotsContainer.querySelectorAll('.slider-dot')
            );

            // Display selected slide
            function showSlide(index) {
                currentSlide = (index + slides.length) % slides.length;

                slides.forEach((slide, i) => {
                    slide.classList.toggle(
                        'active',
                        i === currentSlide
                    );
                });

                buttons.forEach((button, i) => {
                    button.classList.toggle(
                        'active',
                        i === currentSlide
                    );

                    button.setAttribute(
                        'aria-current',
                        i === currentSlide ? 'true' : 'false'
                    );
                });
            }

            // Automatic slider: changes every 5 seconds
            function startAutoPlay() {
                clearInterval(autoPlay);

                autoPlay = setInterval(() => {
                    showSlide(currentSlide + 1);
                }, 5000);
            }

            // Pause when mouse is over the slider
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(autoPlay);
            });

            // Resume when mouse leaves
            heroSlider.addEventListener('mouseleave', () => {
                startAutoPlay();
            });

            // Pause when keyboard focus is inside slider
            heroSlider.addEventListener('focusin', () => {
                clearInterval(autoPlay);
            });

            heroSlider.addEventListener('focusout', () => {
                startAutoPlay();
            });

            // Start from first image
            showSlide(0);
            startAutoPlay();
        }
    }


    // --- Home Page Partner Slider ---
    const partnerSlider = document.querySelector(
        '.logo-section .slide-track'
    );

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

        offerItems.forEach(item => {
            const clone = item.cloneNode(true);
            offersTrack.appendChild(clone);
        });
    }


    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.main-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }


    // --- Active Navigation Link ---
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.main-nav a');
    const homeLink = document.querySelector(
        '.main-nav a[href="index.html"]'
    );

    let activeLinkFound = false;

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
            activeLinkFound = true;
        } else {
            link.classList.remove('active');
        }
    });

    // Highlight Home on root domain
    if (
        !activeLinkFound &&
        (
            currentLocation.endsWith('/') ||
            !currentLocation.split('/').pop().includes('.')
        )
    ) {
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }

});
