
// OBTENER ID DESDE LA URL

const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");


// CARGAR PRODUCTO

const cargarProducto = () => {
  if (!id) return;

  fetch("https://dummyjson.com/products/" + id)
    .then(res => res.json())
    .then(data => {
      document.getElementById("titulo").value = data.title || "";
      document.getElementById("precio").value = data.price || "";
      document.getElementById("descripcion").value = data.description || "";
      document.getElementById("categoria").value = data.category || "smartphones";
      document.getElementById("imagen").value =
        (data.images && data.images[0]) || data.thumbnail || "";
    })
    .catch(err => console.error("Error al cargar producto:", err));
};


// EDITAR PRODUCTO

const editarProducto = () => {
  const titulo = document.getElementById("titulo").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;
  const categoria = document.getElementById("categoria").value;
  const imagen = document.getElementById("imagen").value;
  const cajaMensaje = document.getElementById("mensaje-exito");

  if (!titulo || !precio || !descripcion) {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  const productoActualizado = {
    title: titulo,
    price: parseFloat(precio),
    category: categoria,
    description: descripcion
  };

  if (imagen) {
    productoActualizado.thumbnail = imagen;
  }

  fetch("https://dummyjson.com/products/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productoActualizado)
  })
    .then(res => res.json())
    .then(data => {
      cajaMensaje.style.display = "block";
      cajaMensaje.innerHTML = `
        <strong>¡Producto actualizado!</strong><br>
        ID: ${data.id}<br>
        Producto: ${data.title}<br>
        <small>
          Nota: DummyJSON es una API de prueba, los cambios son simulados.
        </small>
      `;

      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch(error => {
      console.error("Error al actualizar:", error);
      cajaMensaje.innerHTML = "Error al actualizar el producto.";
    });
};


// INICIO

cargarProducto();
