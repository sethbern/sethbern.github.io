let currentSort = { key: '', asc: true };

function sortPublications(key) {
    const container = document.getElementById('pub-container');
    const pubs = Array.from(container.getElementsByClassName('pub-card'));

    if (currentSort.key === key) {
        currentSort.asc = !currentSort.asc;
    } else {
        currentSort = { key, asc: true };
    }

    pubs.sort((a, b) => {
        const valA = a.dataset[key].toLowerCase();
        const valB = b.dataset[key].toLowerCase();

        if (valA < valB) return currentSort.asc ? -1 : 1;
        if (valA > valB) return currentSort.asc ? 1 : -1;
        return 0;
    });

    pubs.forEach(pub => container.appendChild(pub));

    updateSortLabels();
}

function updateSortLabels() {
    const yearBtn = document.getElementById('sort-year');
    const titleBtn = document.getElementById('sort-title');

    const upArrow = '▲';
    const downArrow = '▼';

    yearBtn.textContent = 'Year';
    titleBtn.textContent = 'Title';

    if (currentSort.key === 'year') {
        yearBtn.textContent += currentSort.asc ? ` ${upArrow}` : ` ${downArrow}`;
    } else if (currentSort.key === 'title') {
        titleBtn.textContent += currentSort.asc ? ` ${upArrow}` : ` ${downArrow}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const faders = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    faders.forEach(el => observer.observe(el));
});

const navLinks = document.querySelectorAll(".navbar a[href^='#']");
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const link = document.querySelector(`.navbar a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach((lnk) => lnk.classList.remove("active"));
                if (link) link.classList.add("active");
            }
        });
    },
    {
        rootMargin: "-50% 0px -49% 0px", // center bias
        threshold: 0,
    }
);

document.querySelectorAll("section").forEach((section) => {
    sectionObserver.observe(section);
});
