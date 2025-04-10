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
