const catalogo = document.getElementById("catalogo");
const buscar = document.getElementById("buscador");
const detalle = document.getElementById("detalle");

// Traer productos desde la api
fetch("https://dummyjson.com/products?limit=10")
.then(response => response.json())
.then(data => {
  
  data.products.forEach(producto => {
    // Crear tarjeta 
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3 class="titulo">${producto.title}</h3>
      <img src="${producto.thumbnail}" alt="${producto.title}" width="150">
      <p class="Precio">Precio: $${producto.price}</p>
      <p class="Categoria">Categoría: ${producto.category}</p>
      <p class="Raiting">Rating: ${producto.rating}</p>
      <p class="Stock">Stock: ${producto.stock}</p>
    `;

    catalogo.appendChild(card);

    // Evento click para mostrar detalles en una tabla
    card.addEventListener("click", () => {
      detalle.innerHTML = `
        <h2>Detalle del Producto</h2>
        <table border="1" cellpadding="5">
          <tr><th>Título</th><td>${producto.title}</td></tr>
           <tr><th>Imagen</th><td><img src="${producto.thumbnail}" alt="${producto.title}" width="150"></td></tr>
           <tr><th>Descripción</th><td>${producto.description}</td></tr>
          <tr><th>Precio</th><td>$${producto.price}</td></tr>
          <tr><th>Marca</th><td>${producto.brand}</td></tr>
          <tr><th>Opiniones</th><td>${producto.comment}</td></tr>
          <tr><th>Categoría</th><td>${producto.category}</td></tr>
          <tr><th>Rating</th><td>${producto.rating}</td></tr>
          <tr><th>Stock</th><td>${producto.stock}</td></tr>
          
         
        </table>
      `;
      detalle.scrollIntoView({ behavior: "smooth" }); // baja la pantalla al detalle
    });
  });
});

// Buscador 
buscar.addEventListener("keyup", () => {
  const texto = buscar.value.toLowerCase();
  const tarjetas = document.querySelectorAll(".card");

  tarjetas.forEach(card => {
    const titulo = card.querySelector(".titulo").textContent.toLowerCase();
    const categoria = card.querySelector(".Categoria").textContent.toLowerCase();
    card.style.display = titulo.includes(texto) || categoria.includes(texto) ? "block" : "none";
  });
});




 
