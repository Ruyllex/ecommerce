document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.bento-item');
    boxes.forEach(box => {
        const id = box.getAttribute('data-id');
        const imageUrl = box.getAttribute('data-image-url');
        box.style.backgroundImage = `url(${imageUrl})`;
        
        fetch(`http://localhost:8080/dishes/${id}`)
            .then(response => response.json())
            .then(data => {
                const name = document.createElement('h3');
                name.textContent = data.name;

                const description = document.createElement('p');
                description.textContent = data.description;

                const price = document.createElement('p');
                price.classList.add('price');
                price.textContent = `$${data.price.toFixed(2)}`;

                box.appendChild(name);
                box.appendChild(description);
                box.appendChild(price);
            })
            .catch(error => console.error('Error al obtener los datos del plato:', error));
    });
});