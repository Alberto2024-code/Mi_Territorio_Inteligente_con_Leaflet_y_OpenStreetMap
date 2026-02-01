const selectMuro= document.getElementById("select-usuario")
const avatarimg = document.getElementById("avatar-img")
const muroDiv = document.getElementById("muro")
const nombreHeader= document.getElementById("nombre-usuario")

fetch("https://jsonplaceholder.typicode.com/users")
.then(response=>response.json())
.then(data=>{
    data.forEach(usuario => {
        const opcion='<option value=">'+ usuario.id+'">'+ usuario.name+'</option'
        selectMuro.innerHTML += opcion
    });
})

const cargarMuro=()=>{
    const userId= selectMuro.value
    const nombre= selectMuro.options[selectMuro.selectedIndex].text

    if(!userId) return

    nombreHeader.innerHTML= nombre

    avatarimg.src='https://api.dicebear.com/9.x/avataaars/svg?seed='+nombre
    avatarimg.style.display='block'
    
}
fetch(" ")

