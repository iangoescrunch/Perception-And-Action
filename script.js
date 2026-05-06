// Reading time calculator (counts spoken/essay content only,
// excludes references and figure captions)
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.essay-section:not(.references)');

    if (sections.length > 0) {
        let wordCount = 0;
        sections.forEach(section => {
            section.querySelectorAll('p').forEach(p => {
                // Skip figure captions
                if (p.closest('figcaption')) return;
                const text = p.textContent || '';
                wordCount += text.trim().split(/\s+/).filter(Boolean).length;
            });
        });

        const readingTime = Math.ceil(wordCount / 200);

        const readingTimeElement = document.createElement('p');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.textContent = `${readingTime} min read · ${wordCount} words`;

        const header = document.querySelector('header');
        if (header) {
            header.appendChild(readingTimeElement);
        }
    }
});

// Smooth scroll for any anchor navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade-in animation on essay sections as they enter the viewport
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.essay-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(section);
    });
}
