//toggle functionality
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
   menuIcon.classList.toggle('bx-x');
   navbar.classList.toggle('active');
};

// Get the current page path
const currentPath = window.location.pathname;
const currentPage = currentPath.split('/').pop().split('.')[0] || 'index';

document.querySelectorAll('header nav a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    const linkPage = href.split('/').pop().split('.')[0] || 'index';
    
    if (currentPage === linkPage || 
        (currentPage === 'index' && linkPage === 'home') ||
        (currentPage === 'home' && linkPage === 'index')) {
        link.classList.add('active');
    }
});

// sticky header functionality
let header = document.querySelector('.header');
window.onscroll = () => {
    header.classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


let darkModeIcon = document.querySelector('#darkMode-icon');

darkModeIcon.onclick = () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
};

// Video navigation
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const category = button.getAttribute('data-category');
        document.querySelectorAll('.video-box').forEach(video => {
            if (category === 'all' || video.getAttribute('data-category') === category) {
                video.style.display = "block";
            } else {
                video.style.display = "none";
            }
        });
    });
});

//form submission
        document.addEventListener('DOMContentLoaded', function() {
            const sr = ScrollReveal({
                reset: true,
                distance: '80px',
                duration: 2000,
                delay: 200,
                mobile: true 
            });
        
           
            if (document.querySelector('.contact-card')) {
                sr.reveal('.contact-card', { 
                    origin: 'left',
                    distance: '50px',
                    duration: 1000,
                    delay: 200,
                    interval: 200,
                    viewFactor: 0.2 
                });
            }
        
            if (document.querySelector('.contact-form')) {
                sr.reveal('.contact-form', { 
                    origin: 'right',
                    distance: '50px',
                    duration: 1000,
                    delay: 200,
                    viewFactor: 0.2
                });
            }
        
            // Home section animations
            sr.reveal('.home-content, .heading', {origin: 'top'});
            sr.reveal('.home-img img, .services-container, .video-box, .testimonial-wrapper, .video-navigation', {origin: 'bottom'});
            sr.reveal('.home-content h1, .about-img img', {origin: 'left'});
            sr.reveal('.home-content h3, .home-content p, .about-content', {origin: 'right'});
        
            const form = document.querySelector('.email-form'); 
            
            form.addEventListener('submit', function(event) {
                event.preventDefault();
        
                const submitButton = form.querySelector('button[type="submit"]');
                const formData = new FormData(form);
                
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
                
               
                fetch('https://script.google.com/macros/s/AKfycbzVBk_ffb1G90pz8Eh_cfySbpfgIaDF-mgjs9Deo3h-lwCJ95glUxDI40xJKSHw0r4E/exec', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        submitButton.textContent = 'Subscribed';
                        setTimeout(() => {
                            form.reset();
                            setTimeout(() => {
                                submitButton.textContent = 'Subscribe';
                                submitButton.disabled = false;
                            }, 1000);
                        }, 2000);
                    } else {
                        submitButton.textContent = 'Error';
                        setTimeout(() => {
                            submitButton.textContent = 'Subscribe';
                            submitButton.disabled = false;
                        }, 2000);
                    }
                })
                .catch(error => {
                    console.error('Submission error:', error);
                    submitButton.textContent = 'Error';
                    setTimeout(() => {
                        submitButton.textContent = 'Subscribe';
                        submitButton.disabled = false;
                    }, 2000);
                });
            });
        });
           

        const contactForm = document.querySelector(".contact-form");
    
        if (contactForm) {
            console.log("Contact form found:", contactForm); // Debug line
            
            contactForm.addEventListener("submit", function(e) {

                e.preventDefault();
                console.log("Contact form submitted"); // Debug line
                
                const submitBtn = this.querySelector(".btn");
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
                submitBtn.disabled = true;
                
                const formData = new FormData(this);
                
                fetch(contactForm.action, {
                    method: "POST",
                    body: formData
                })
                .then(response => {
                    console.log("Form submission response:", response); // Debug line
                    
                    // Check if response is valid
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    return response.json();
                })
                .then(data => {
                    console.log("Form submission data:", data); // Debug line
                    
                    // Success case
                    submitBtn.innerHTML = 'Message Sent! <i class="bx bx-check"></i>';
                    submitBtn.style.backgroundColor = "#28a745";
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.style.backgroundColor = "";
                        submitBtn.disabled = false;
                        contactForm.reset();
                    }, 3000);
                })
                .catch(error => {
                    console.error("Contact form error:", error);
                    
                    // Error case
                    submitBtn.innerHTML = 'Error! <i class="bx bx-error"></i>';
                    submitBtn.style.backgroundColor = "#dc3545";
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.style.backgroundColor = "";
                        submitBtn.disabled = false;
                    }, 3000);
                });
            });
        } else {
            console.log("Contact form not found on this page"); // Debug line
        }

// FAQ functionality service page
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });


// Swiper slider
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
});
