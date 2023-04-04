const form = document.querySelector('form');
const productos = document.querySelector('#productos');
const stockInput = document.querySelector('#stock');
const restarBtn = document.querySelector('#restar');
const sumarBtn = document.querySelector('#sumar');


// Función para mostrar los productos en la tabla
function mostrarProductos() {
  // Obtener los registros de la base de datos
  // y agregarlos a la tabla
  const productosRegistrados = JSON.parse(localStorage.getItem('productos')) || [];

  // Limpiar la tabla
  productos.innerHTML = '';

  // Recorrer los productos y agregarlos a la tabla
  productosRegistrados.forEach(producto => {
    const fila = document.createElement('tr');

    const nombre = document.createElement('td');
    nombre.textContent = producto.nombre;

    const costo = document.createElement('td');
    costo.textContent = producto.costo;

    const venta = document.createElement('td');
    venta.textContent = producto.venta;

    const stock = document.createElement('td');
    stock.textContent = producto.stock;

    fila.appendChild(nombre);
    fila.appendChild(costo);
    fila.appendChild(venta);
    fila.appendChild(stock);

    productos.appendChild(fila);
  });
}

// Función para agregar un nuevo producto
function agregarProducto(nombre, costo, venta, stock) {
  // Obtener los registros de la base de datos
  const productosRegistrados = JSON.parse(localStorage.getItem('productos')) || [];

  // Agregar el nuevo producto a los registros
  productosRegistrados.push({ nombre, costo, venta, stock });

  // Guardar los registros en la base de datos
  localStorage.setItem('productos', JSON.stringify(productosRegistrados));

  // Mostrar los productos en la tabla
  mostrarProductos();
}

// Función para sumar al stock
function sumarStock() {
  stockInput.value = parseInt(stockInput.value) + 1;
}



// Función para mostrar los productos en la tabla
function mostrarProductos() {
  // Obtener los registros de la base de datos
  const productosRegistrados = JSON.parse(localStorage.getItem('productos')) || [];

  // Limpiar la tabla
  productos.innerHTML = '';

  // Recorrer los productos y agregarlos a la tabla
  productosRegistrados.forEach(producto => {
    const fila = document.createElement('tr');

    const nombre = document.createElement('td');
    nombre.textContent = producto.nombre;

    const costo = document.createElement('td');
    costo.textContent = producto.costo;

    const venta = document.createElement('td');
    venta.textContent = producto.venta;

    const stock = document.createElement('td');
    stock.textContent = producto.stock;

    const restarBtn = document.createElement('button');
    restarBtn.textContent = '-';
    restarBtn.type = 'button';
    restarBtn.addEventListener('click', () => {
      if (producto.stock > 0) {
        producto.stock--;
        stock.textContent = producto.stock;
        actualizarProductos(productosRegistrados);
      }
    });

    const sumarBtn = document.createElement('button');
    sumarBtn.textContent = '+';
    sumarBtn.type = 'button';
    sumarBtn.addEventListener('click', () => {
      producto.stock++;
      stock.textContent = producto.stock;
      actualizarProductos(productosRegistrados);
    });

    const acciones = document.createElement('td');
    acciones.appendChild(restarBtn);
    acciones.appendChild(sumarBtn);

    fila.appendChild(nombre);
    fila.appendChild(costo);
    fila.appendChild(venta);
    fila.appendChild(stock);
    fila.appendChild(acciones);

    productos.appendChild(fila);
  });
}

// Función para agregar un nuevo producto
function agregarProducto(nombre, costo, venta, stock) {
  // Obtener los registros de la base de datos
  const productosRegistrados = JSON.parse(localStorage.getItem('productos')) || [];

  // Agregar el nuevo producto a los registros
  productosRegistrados.push({ nombre, costo, venta, stock });

  // Guardar los registros en la base de datos
  localStorage.setItem('productos', JSON.stringify(productosRegistrados));

  // Mostrar los productos en la tabla
  mostrarProductos();
}

// Función para actualizar los productos en la base de datos
function actualizarProductos(productosRegistrados) {
  localStorage.setItem('productos', JSON.stringify(productosRegistrados));
}

// Evento para agregar un nuevo producto
form.addEventListener('submit', e => {
  e.preventDefault();

  const nombre = form.nombre.value;
  const costo = parseFloat(form.costo.value);
  const venta = parseFloat(form.venta.value);
  const stock = parseInt(form.stock.value);

  agregarProducto(nombre, costo, venta, stock);

  form.reset();
});

// Evento para mostrar los productos al cargar la página
window.addEventListener('load', () => {
  mostrarProductos();
});