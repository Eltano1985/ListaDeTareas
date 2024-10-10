class Tareas {
    constructor() {
        this.tareas = [];
    }

    añadirTarea(textoDeLaTarea){
        const tarea = {
            text: textoDeLaTarea
        };
        this.tareas.push(tarea);
        this.saveTareasToLocalStorage();
        this.representacionDeLasTareas();
    }

    editarTarea(index, newText) {
        this.tareas[index].text = newText;
        this.saveTareasToLocalStorage();
        this.representacionDeLasTareas();
    }

    eliminarTarea(index) {
        this.tareas.splice(index, 1);
        this.saveTareasToLocalStorage();
        this.representacionDeLasTareas();
    }

    saveTareasToLocalStorage() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
    }

    loadTareasFromLocalStorage() {
        const storedTareas = localStorage.getItem('tareas');
        this.tareas = JSON.parse(storedTareas) || [];
        this.representacionDeLasTareas();
    }

    representacionDeLasTareas() {
        const listaDeTareas = document.getElementById("listaDeTareas");
        listaDeTareas.innerHTML = "";

        this.tareas.forEach((tarea, index) => {
            const listaDeItems = document.createElement("li");
            listaDeItems.innerHTML = `
                <span>${tarea.text}</span>
                <span>
                    <button class="edit-button" onClick="tareas.editarTarea(${index}, prompt('Edit tarea:', '${tarea.text}'))" >Editar</button>
                    <button class="delete-button" onClick="tareas.eliminarTarea(${index})" >Eliminar</button>
                </span>
            `;
            
            listaDeTareas.appendChild(listaDeItems);
        });
    }
}
