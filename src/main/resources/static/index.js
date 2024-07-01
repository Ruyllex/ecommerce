$(document).ready(function(){

    $('.navbar-nav a, .scroll-link').on('click', function(e){
        if(this.hash !== ''){
            e.preventDefault();

            const hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000);
        }
    });
    $(window).scroll(function(){
        const scrollDistance = $(window).scrollTop();

        $('.section').each(function(i){
            if($(this).position().top <= scrollDistance + 100){
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    }).scroll();
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    let isScrolling = false;
    let lastScrollTime = 0;

    function isInViewport(elem) {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function handleScroll(event) {
        event.preventDefault();

        const now = Date.now();
        const delta = now - lastScrollTime;
        lastScrollTime = now;

        if (delta < 200 || isScrolling) {
            return;
        }

        isScrolling = true;

        const deltaY = event.deltaY;
        let targetSection = null;

        if (deltaY > 0) {
            for (let i = 0; i < sections.length; i++) {
                if (isInViewport(sections[i])) {
                    targetSection = sections[i + 1];
                    break;
                }
            }
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (isInViewport(sections[i])) {
                    targetSection = sections[i - 1];
                    break;
                }
            }
        }
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
        setTimeout(function() {
            isScrolling = false;
        }, 1000); 
    }

    window.addEventListener('wheel', handleScroll);

    const navLinks = document.querySelectorAll('.navbar-nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});


