
const userId = 1;


document.addEventListener('DOMContentLoaded', function() {
    const boxes = document.querySelectorAll('.bento-item');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.getElementById('cart-items');
    const payButton = document.getElementById('pay-button');
    let total = 0;

    payButton.addEventListener('click', sendOrder);
    boxes.forEach(box => {
        const id = box.getAttribute('data-id');
        const imageUrl = box.getAttribute('data-image-url');
        box.style.backgroundImage = `url(${imageUrl})`;

        fetch(`http://localhost:8080/dishes/${id}`)
            .then(response => response.json())
            .then(data => {
                const bentoText = document.createElement('div');
                bentoText.classList.add('bento-text');

                const name = document.createElement('h3');
                name.textContent = data.name;
                bentoText.appendChild(name);

                const description = document.createElement('p');
                description.textContent = data.description;
                bentoText.appendChild(description);

                const price = document.createElement('a');
                price.classList.add('price-button');
                price.textContent = `$${data.price.toFixed(2)}`;
                price.addEventListener('click', () => {
                    addToCart(data, id);
                });
                bentoText.appendChild(price);

                box.appendChild(bentoText);
            })
            .catch(error => console.error('Error al obtener los datos del plato:', error));
    });

    function addToCart(item, id) {
        const cartItem = document.createElement('li');

        cartItem.setAttribute('data-id', id);
        cartItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

        cartItems.appendChild(cartItem);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            removeFromCart(cartItem, item.price);
        });
        cartItem.appendChild(deleteButton);

        total += item.price;
        cartTotal.textContent = total.toFixed(2);
    }

    function removeFromCart(cartItem, price) {
        cartItems.removeChild(cartItem);
        total -= price;
        cartTotal.textContent = total.toFixed(2);
    }

    function sendOrder() {
        const orderItems = [];
        cartItems.querySelectorAll('li').forEach(cartItem => {
            const itemId = cartItem.getAttribute('data-id');
            orderItems.push({ dish: itemId, quantity: 1 });
        });
        const orderData = {
            userId: userId,
            total: total,
            items: orderItems
        };
        console.log('Enviando orden:', orderData);

        fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Orden enviada:', data);
            // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito
        })
        .catch(error => console.error('Error al enviar la orden:', error));
    }
});

