// Esperamos que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("todo");
  const listaTareas = document.getElementById("lista");

  // Escuchar el envío del formulario
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();// evito que se recargue la pagina

    //elimonar espacios vacios al inicio y final
    const titulo = document.getElementById("titulo").value.trim();
    const tarea = document.getElementById("tarea").value.trim();

    if (titulo && tarea) {
      agregarTarea(titulo, tarea);
      formulario.reset(); //si los campos estan completos se llama a la funcion y despues se limpia el formulario 
    }
  });

  // se crea un elemento li que tendra la tarea
  function agregarTarea(titulo, descripcion) {
    const li = document.createElement("li");
    li.classList.add("tarea");//se le da la clase tarea

    const contenido = document.createElement("span");// span que tendra el texto de la tarea
    contenido.innerHTML = `<strong>${titulo}:</strong> ${descripcion}`; // resaltar el titulo en negrita
    contenido.classList.add("contenido");

    // al hacer click en el texto de la tarea se apaga/quita
    contenido.addEventListener("click", () => {
      contenido.classList.toggle("completada");
    });

    // se cre y asigna un eventito
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("editar");
    // al hacer click se llama a la funcion 
    btnEditar.addEventListener("click", () => {
      editarTarea(contenido);
    });

    // al hacer click se le pone al li una clase eliminado  y luego se borra 
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("eliminar");
    btnEliminar.addEventListener("click", () => {
      li.classList.add("eliminando");
      setTimeout(() => li.remove(), 300);
    });
//el li final 
    li.appendChild(contenido);
    li.appendChild(btnEditar);
    li.appendChild(btnEliminar);

    listaTareas.appendChild(li);
  }

  // muestra un prompt si el usuario escribe algo cambia el contenido del spam 
  function editarTarea(elemento) {
    const textoActual = elemento.innerText;
    const nuevoTexto = prompt("Edita tu tarea:", textoActual);

    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
      elemento.innerHTML = nuevoTexto;
    }
  }
});
