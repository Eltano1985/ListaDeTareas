const tareas = new Tareas();

document.addEventListener("DOMContentLoaded", () => {
    tareas.loadTareasFromLocalStorage();
});

document.getElementById("agregaBoton").addEventListener("click", () => {
    const ingresaTarea = document.getElementById("ingresaTarea");
    const textoDeLaTarea = ingresaTarea.value.trim();
    if (textoDeLaTarea.length > 0 && tareas.listaActual) {
        tareas.añadirTarea(textoDeLaTarea);
        ingresaTarea.value = "";
    }
});

document.getElementById("agregaListaBoton").addEventListener("click", () => {
    const ingresaLista = document.getElementById("ingresaLista");
    const nombreDeLaLista = ingresaLista.value.trim();
    if (nombreDeLaLista.length > 0) {
        tareas.añadirLista(nombreDeLaLista);
        ingresaLista.value = "";
    }
});

// Nueva funcionalidad para eliminar la lista actual
document.getElementById("eliminarListaBoton").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres eliminar esta lista?")) {
        tareas.eliminarLista();
    }
});