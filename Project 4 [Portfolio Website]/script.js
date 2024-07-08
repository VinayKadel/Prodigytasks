document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('header nav ul li a');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + header.offsetHeight;
        sections.forEach(section => {
            if (scrollPos > section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    document.querySelector('#contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message sent! Thank you for contacting me.');
    });

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
