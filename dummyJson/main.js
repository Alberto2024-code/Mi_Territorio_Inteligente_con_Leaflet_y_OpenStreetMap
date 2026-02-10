
const catalogo = document.getElementById("catalogo");
const buscar = document.getElementById("buscador");

const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");
const pagina = document.getElementById("pagina");

let skip = 0;
const limit = 10;
let total = 0;


// CARGAR PRODUCTOS (GET + PAGINACIÓN)

function cargarProductos() {
  fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
    .then(res => res.json())
    .then(data => {
      total = data.total;
      renderizarTabla(data.products);
      actualizarPaginacion();
    });
}


// RENDERIZAR TABLA

function renderizarTabla(productos) {
  catalogo.innerHTML = `
    <table border="1" cellpadding="6" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Imagen</th>
          <th>Título</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        ${productos.map(p => `
          <tr>
            <td>${p.id}</td>
            <td><img src="${p.thumbnail}" width="60"></td>
            <td>${p.title}</td>
            <td>$${p.price}</td>
            <td>${p.category}</td>
            <td>
              <a href="editar.html?id=${p.id}">Editar</a>
              <button onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}


// PAGINACIÓN

function actualizarPaginacion() {
  const actual = skip / limit + 1;
  const totalPaginas = Math.ceil(total / limit);
  pagina.textContent = `Página ${actual} de ${totalPaginas}`;
}

btnNext.addEventListener("click", () => {
  if (skip + limit < total) {
    skip += limit;
    cargarProductos();
  }
});

btnPrev.addEventListener("click", () => {
  if (skip > 0) {
    skip -= limit;
    cargarProductos();
  }
});


// BUSCADOR (API SEARCH)

buscar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const texto = buscar.value.trim();
    if (!texto) {
      skip = 0;
      cargarProductos();
      return;
    }

    fetch(`https://dummyjson.com/products/search?q=${texto}`)
      .then(res => res.json())
      .then(data => {
        renderizarTabla(data.products);
        pagina.textContent = `Resultados de búsqueda`;
      });
  }
});


// ELIMINAR PRODUCTO (DELETE)

function eliminarProducto(id) {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;

  fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(() => {
    alert("Producto eliminado correctamente (simulado)");
    cargarProductos();
  });
}


cargarProductos();




 
