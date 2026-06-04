// ====================================
// FUNCIONALIDAD DEL BOWL Y CARRITO
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    const summaryBase = document.getElementById('summary-base');
    const summaryProteina = document.getElementById('summary-proteina');
    const summarySalsa = document.getElementById('summary-salsa');
    const summaryVegetales = document.getElementById('summary-vegetales');
    const bowlPrice = document.getElementById('bowl-price');
    const btnAgregarCarrito = document.getElementById('agregar-carrito');
    const btnFinalizarPedido = document.getElementById('finalizar-pedido');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    const cartKey = 'carrito';

    const precios = {
        base: {
            'Arroz': 8,
            'Lechuga': 6,
            'Quinua': 10
        },
        proteina: {
            'Pulpo': 12,
            'Ceviche': 14,
            'Paiche': 15,
            'Pollo': 10
        },
        salsa: {
            'Picante': 1,
            'Acevichada': 1,
            'Soya': 1,
            'Sriracha': 1
        },
        vegetales: {
            'Zanahoria': 0.5,
            'Pico de gallo': 1,
            'Mango': 2,
            'Durazno': 2,
            'Chuchusmuti': 1,
            'Nachos': 1.5,
            'Pepino': 0.5,
            'Repollo morado': 0.5,
            'Palta': 2
        }
    };

    const baseInputs = Array.from(document.querySelectorAll('input[name="base"]'));
    const proteinaInputs = Array.from(document.querySelectorAll('input[name="proteina"]'));
    const salsaInputs = Array.from(document.querySelectorAll('input[name="salsa"]'));
    const vegetalesInputs = Array.from(document.querySelectorAll('input[name="vegetales"]'));

    let carrito = cargarCarrito();

    function obtenerVegetalesSeleccionados() {
        return vegetalesInputs
            .filter(input => input.checked)
            .map(input => input.value);
    }

    function obtenerSeleccionActual() {
        const base = document.querySelector('input[name="base"]:checked')?.value || 'Arroz';
        const proteina = document.querySelector('input[name="proteina"]:checked')?.value || 'Pulpo';
        const salsa = document.querySelector('input[name="salsa"]:checked')?.value || 'Picante';
        const vegetales = obtenerVegetalesSeleccionados();

        return { base, proteina, salsa, vegetales };
    }

    function calcularPrecio(seleccion) {
        let precio = 0;
        precio += precios.base[seleccion.base] || 0;
        precio += precios.proteina[seleccion.proteina] || 0;
        precio += precios.salsa[seleccion.salsa] || 0;
        seleccion.vegetales.forEach(vegetal => {
            precio += precios.vegetales[vegetal] || 0;
        });
        return Number(precio.toFixed(2));
    }

    function actualizarResumen() {
        const seleccion = obtenerSeleccionActual();

        if (summaryBase) summaryBase.textContent = seleccion.base;
        if (summaryProteina) summaryProteina.textContent = seleccion.proteina;
        if (summarySalsa) summarySalsa.textContent = seleccion.salsa;

        if (summaryVegetales) {
            summaryVegetales.textContent = seleccion.vegetales.length > 0
                ? seleccion.vegetales.join(', ')
                : 'Ninguno seleccionado';
        }

        if (bowlPrice) {
            const precio = calcularPrecio(seleccion);
            bowlPrice.textContent = `Bs. ${precio.toFixed(2)}`;
        }
    }

    function cargarCarrito() {
        const stored = localStorage.getItem(cartKey);
        if (!stored) return [];

        try {
            const data = JSON.parse(stored);
            if (!Array.isArray(data)) return [];
            return data.map(item => ({
                ...item,
                vegetales: Array.isArray(item.vegetales) ? item.vegetales : [],
                quantity: typeof item.quantity === 'number' ? item.quantity : 1,
                price: Number(item.price) || 0,
                total: Number(item.total) || (Number(item.price) || 0) * (typeof item.quantity === 'number' ? item.quantity : 1)
            }));
        } catch (error) {
            localStorage.removeItem(cartKey);
            return [];
        }
    }

    function guardarCarrito() {
        localStorage.setItem(cartKey, JSON.stringify(carrito));
    }

    function calcularTotales() {
        const subtotal = carrito.reduce((sum, item) => sum + Number(item.total || 0), 0);
        const total = subtotal;
        const cantidadTotal = carrito.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
        return {
            subtotal: Number(subtotal.toFixed(2)),
            total: Number(total.toFixed(2)),
            cantidadTotal
        };
    }

    function mostrarTotales() {
        const totales = calcularTotales();
        if (cartSubtotal) cartSubtotal.textContent = `Bs. ${totales.subtotal.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `Bs. ${totales.total.toFixed(2)}`;
        if (cartCount) {
            cartCount.textContent = totales.cantidadTotal > 0
                ? `Llevas ${totales.cantidadTotal} bowl${totales.cantidadTotal === 1 ? '' : 's'} en el carrito`
                : '';
            cartCount.style.display = totales.cantidadTotal > 0 ? 'block' : 'none';
        }
    }

    function crearItemEnCarrito(seleccion) {
        return {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            base: seleccion.base,
            proteina: seleccion.proteina,
            salsa: seleccion.salsa,
            vegetales: seleccion.vegetales,
            price: calcularPrecio(seleccion),
            quantity: 1,
            total: calcularPrecio(seleccion)
        };
    }

    function sonMismosIngredientes(itemA, itemB) {
        if (itemA.base !== itemB.base) return false;
        if (itemA.proteina !== itemB.proteina) return false;
        if (itemA.salsa !== itemB.salsa) return false;
        const aVegetales = Array.isArray(itemA.vegetales) ? [...itemA.vegetales].sort() : [];
        const bVegetales = Array.isArray(itemB.vegetales) ? [...itemB.vegetales].sort() : [];
        if (aVegetales.length !== bVegetales.length) return false;
        return aVegetales.every((value, index) => value === bVegetales[index]);
    }

    function agregarAlCarrito() {
        const seleccion = obtenerSeleccionActual();
        const nuevoItem = crearItemEnCarrito(seleccion);

        const encontrado = carrito.find(item => sonMismosIngredientes(item, nuevoItem));

        if (encontrado) {
            encontrado.quantity += 1;
            encontrado.total = Number((encontrado.price * encontrado.quantity).toFixed(2));
        } else {
            carrito.push(nuevoItem);
        }

        guardarCarrito();
        renderizarCarrito();
    }

    function actualizarCantidad(id, delta) {
        const item = carrito.find(producto => producto.id === id);
        if (!item) return;
        item.quantity = Math.max(1, item.quantity + delta);
        item.total = Number((item.price * item.quantity).toFixed(2));
        guardarCarrito();
        renderizarCarrito();
    }

    function eliminarProducto(id) {
        carrito = carrito.filter(producto => producto.id !== id);
        guardarCarrito();
        renderizarCarrito();
    }

    function limpiarCarrito() {
        carrito = [];
        guardarCarrito();
        renderizarCarrito();
    }

    function finalizarPedido() {
        limpiarCarrito();
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Pedido realizado correctamente. El carrito ha sido vacío.</p>';
        }
        mostrarTotales();
    }

    function renderizarCarrito() {
        if (!cartItemsContainer) return;

        if (carrito.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty">Tu carrito está vacío. Agrega tu primer bowl personalizado.</p>';
        } else {
            cartItemsContainer.innerHTML = carrito.map(item => {
                const vegetalesTexto = item.vegetales.length > 0
                    ? item.vegetales.join(', ')
                    : 'Sin vegetales';

                return `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-top">
                            <div class="item-details">
                                <p class="item-name">Bowl Personalizado</p>
                                <p class="item-detail"><strong>Base:</strong> ${item.base} • <strong>Proteína:</strong> ${item.proteina} • <strong>Salsa:</strong> ${item.salsa}</p>
                                <p class="item-detail"><strong>Vegetales:</strong> ${vegetalesTexto}</p>
                            </div>
                            <button class="remove-item" type="button" data-id="${item.id}">Eliminar</button>
                        </div>
                        <div class="item-meta">
                            <div class="meta-block">
                                <span>Cantidad</span>
                                ${item.quantity}
                            </div>
                            <div class="meta-block">
                                <span>Precio unitario</span>
                                Bs. ${item.price.toFixed(2)}
                            </div>
                            <div class="meta-block">
                                <span>Total</span>
                                Bs. ${item.total.toFixed(2)}
                            </div>
                        </div>
                        <div class="item-quantity">
                            <button class="qty-btn" type="button" data-action="decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" type="button" data-action="increase" data-id="${item.id}">+</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        mostrarTotales();
    }

    function manejarEventosCarrito(event) {
        const boton = event.target.closest('button');
        if (!boton) return;

        const id = boton.dataset.id;
        if (!id) return;

        if (boton.dataset.action === 'increase') {
            actualizarCantidad(id, 1);
            return;
        }

        if (boton.dataset.action === 'decrease') {
            actualizarCantidad(id, -1);
            return;
        }

        if (boton.classList.contains('remove-item')) {
            eliminarProducto(id);
        }
    }

    baseInputs.forEach(input => input.addEventListener('change', actualizarResumen));
    proteinaInputs.forEach(input => input.addEventListener('change', actualizarResumen));
    salsaInputs.forEach(input => input.addEventListener('change', actualizarResumen));
    vegetalesInputs.forEach(input => input.addEventListener('change', actualizarResumen));

    if (btnAgregarCarrito) {
        btnAgregarCarrito.addEventListener('click', function() {
            agregarAlCarrito();
        });
    }

    if (btnFinalizarPedido) {
        btnFinalizarPedido.addEventListener('click', function() {
            finalizarPedido();
        });
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', manejarEventosCarrito);
    }

    actualizarResumen();
    renderizarCarrito();
});
