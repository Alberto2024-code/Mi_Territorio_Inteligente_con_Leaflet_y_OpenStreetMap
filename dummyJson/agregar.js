
function agregarProducto() {

  const titulo = document.getElementById("titulo").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const imagen = document.getElementById("imagen").value;
  const mensaje = document.getElementById("mensaje-exito");

  if (!titulo || !precio || !descripcion) {
    alert("Completa todos los campos");
    return;
  }

  const producto = {
    title: titulo,
    price: Number(precio),
    description: descripcion,
    category: categoria,
    thumbnail: imagen || "https://via.placeholder.com/150"
  };

  fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(producto)
  })
    .then(res => res.json())
    .then(data => {
        alert("✅ Producto agregado con éxito");
      mensaje.style.display = "block";
      mensaje.innerHTML = `
        <strong>Producto agregado (simulación)</strong><br>
        ID generado: ${data.id}<br>
        Nombre: ${data.title}
      `;

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch(error => {
      console.error("Error:", error);
      mensaje.innerHTML = "Error al agregar producto";
    });
}
