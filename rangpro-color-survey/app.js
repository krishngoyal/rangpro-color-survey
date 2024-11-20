document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('survey-form');
    const colorGrid = document.querySelector('.color-grid');
    const summaryTableBody = document.querySelector('#summary-table tbody');
    const colorDemandTableBody = document.querySelector('#color-demand-table tbody');

    const colors = [
        'Bright Yellow', 'Sky Blue', 'Soft Pink', 'Lime Green',
        'Peach', 'Light Gray', 'Orange', 'Deep Red',
        'White', 'Ivory', 'Lavender', 'Mint Green',
        'Turquoise', 'Burgundy', 'Beige', 'Chocolate Brown',
        'Light Blue', 'Charcoal Gray', 'Coral', 'Amber'
    ];

    const colorDemand = {};
    colors.forEach(color => colorDemand[color] = 0);

    const selectedColors = new Set();

    // Populate color grid
    colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.dataset.name = color;

        const caption = document.createElement('p');
        caption.textContent = color;

        colorCard.appendChild(caption);
        colorCard.addEventListener('click', () => toggleColor(colorCard));

        colorGrid.appendChild(colorCard);
    });

    function toggleColor(card) {
        const colorName = card.dataset.name;

        if (selectedColors.has(colorName)) {
            selectedColors.delete(colorName);
            card.classList.remove('selected');
        } else if (selectedColors.size < 6) {
            selectedColors.add(colorName);
            card.classList.add('selected');
        } else {
            alert('You can select up to 6 colors.');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const shopName = document.getElementById('shop-name').value.trim();
        const shopkeeperName = document.getElementById('shopkeeper-name').value.trim();
        const contactNumber = document.getElementById('contact-number').value.trim();
        const visitDate = document.getElementById('visit-date').value;
        const shopAddress = document.getElementById('shop-address').value.trim();

        if (selectedColors.size < 6) {
            alert('Please select at least 6 colors.');
            return;
        }

        const selectedColorNames = Array.from(selectedColors).join(', ');

        // Update summary table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shopName}</td>
            <td>${shopkeeperName}</td>
            <td>${contactNumber}</td>
            <td>${visitDate}</td>
            <td>${shopAddress}</td>
            <td>${selectedColorNames}</td>
        `;
        summaryTableBody.appendChild(row);

        // Update color demand
        selectedColors.forEach(color => {
            colorDemand[color]++;
        });

        updateColorDemandTable();

        // Reset form and selection
        form.reset();
        selectedColors.clear();
        document.querySelectorAll('.color-card').forEach(card => card.classList.remove('selected'));
    });

    function updateColorDemandTable() {
        colorDemandTableBody.innerHTML = '';
        Object.keys(colorDemand).forEach(color => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${color}</td>
                <td>${colorDemand[color]}</td>
            `;
            colorDemandTableBody.appendChild(row);
        });
    }
});
