const tareas = new Tareas ();
const tareas1 = new Tareas ();

function añadirTarea() {
    const ingresaTarea = document.getElementById("ingresaTarea");
    const textoDeLaTarea = ingresaTarea.value.trim();
    if (textoDeLaTarea.length > 0) {
        tareas.añadirTarea(textoDeLaTarea);
        ingresaTarea.value = "";
        tareas.representacionDeLasTareas();
    }
}

document.getElementById("agregaBoton").addEventListener("click", añadirTarea);
document.getElementById("ingresaTarea").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        añadirTarea();
    }
})

document.addEventListener("DOMContentLoaded", () => {
    tareas.loadTareasFromLocalStorage();
})