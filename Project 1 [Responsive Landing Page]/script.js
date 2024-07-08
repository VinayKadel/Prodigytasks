window.addEventListener('scroll', function() {
    var navbar = document.querySelector('header.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        var targetSection = document.querySelector(this.getAttribute('href'));
        
        // If the clicked link is the Home link, update the inner HTML
        if (this.getAttribute('href') === '#home') {
            targetSection.innerHTML = `
                <h1>Home Section</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor lorem a urna consectetur, nec varius nisl ultrices. Aliquam erat volutpat. Vestibulum dapibus, sapien non interdum viverra, purus turpis auctor leo, ut venenatis ex sapien a turpis. Nam vitae venenatis tortor. Cras fermentum consectetur arcu a dignissim. Praesent sed vehicula nisi. Ut consequat semper arcu et sollicitudin.</p>
            `;
        }
        
        if (this.getAttribute('href') === '#about') {
            targetSection.innerHTML = `
                <h1>About Section</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor lorem a urna consectetur, nec varius nisl ultrices. Aliquam erat volutpat. Vestibulum dapibus, sapien non interdum viverra, purus turpis auctor leo, ut venenatis ex sapien a turpis. Nam vitae venenatis tortor. Cras fermentum consectetur arcu a dignissim. Praesent sed vehicula nisi. Ut consequat semper arcu et sollicitudin.</p>
            `;
        }

        if (this.getAttribute('href') === '#services') {
            targetSection.innerHTML = `
                <h1>Services Section</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor lorem a urna consectetur, nec varius nisl ultrices. Aliquam erat volutpat. Vestibulum dapibus, sapien non interdum viverra, purus turpis auctor leo, ut venenatis ex sapien a turpis. Nam vitae venenatis tortor. Cras fermentum consectetur arcu a dignissim. Praesent sed vehicula nisi. Ut consequat semper arcu et sollicitudin.</p>
            `;
        }

        if (this.getAttribute('href') === '#contact') {
            targetSection.innerHTML = `
                <h1>Contact Section</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempor lorem a urna consectetur, nec varius nisl ultrices. Aliquam erat volutpat. Vestibulum dapibus, sapien non interdum viverra, purus turpis auctor leo, ut venenatis ex sapien a turpis. Nam vitae venenatis tortor. Cras fermentum consectetur arcu a dignissim. Praesent sed vehicula nisi. Ut consequat semper arcu et sollicitudin.</p>
            `;
        }
        // Smooth scrolling to the target section
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });

    anchor.addEventListener('mouseover', function() {
        var sectionId = this.getAttribute('data-section');
        var section = document.getElementById(sectionId);
        section.classList.add('hovered');
    });

    anchor.addEventListener('mouseout', function() {
        var sectionId = this.getAttribute('data-section');
        var section = document.getElementById(sectionId);
        section.classList.remove('hovered');
    });
});
