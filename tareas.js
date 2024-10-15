class Tareas {
    constructor() {
        this.listas = {}; // Diccionario de listas
        this.listaActual = null; // Lista seleccionada actualmente
    }

    // Añadir una nueva lista
    añadirLista(nombreDeLaLista) {
        if (!this.listas[nombreDeLaLista]) {
            this.listas[nombreDeLaLista] = []; // Cada lista es un array de tareas
            this.guardarTareasEnElAlmacenamientoLocal();
            this.cargarListasEnSelector();
            this.cambiarLista(nombreDeLaLista); // Cambiar a la nueva lista creada
        }
    }

    // Cambiar la lista actual
    cambiarLista(nombreDeLaLista) {
        this.listaActual = nombreDeLaLista;
        document.getElementById('nombreListaActual').textContent = nombreDeLaLista;
        this.representacionDeLasTareas();
    }

    // Eliminar la lista actual
    eliminarLista() {
        if (this.listaActual) {
            delete this.listas[this.listaActual];
            this.guardarTareasEnElAlmacenamientoLocal();
            this.cargarListasEnSelector();
            if (Object.keys(this.listas).length > 0) {
                this.cambiarLista(Object.keys(this.listas)[0]); // Cambiar a la primera lista disponible
            } else {
                this.listaActual = null; // No hay listas, limpiar todo
                document.getElementById("nombreListaActual").textContent = "";
                this.representacionDeLasTareas();
            }
        }
    }

    // Añadir una nueva tarea a la lista actual
    añadirTarea(textoDeLaTarea) {
        if (this.listaActual) {
            const tarea = {
                text: textoDeLaTarea
            };
            this.listas[this.listaActual].push(tarea);
            this.guardarTareasEnElAlmacenamientoLocal();
            this.representacionDeLasTareas();
        }
    }

    // Editar tarea en la lista actual
    editarTarea(index, newText) {
        if (this.listaActual) {
            this.listas[this.listaActual][index].text = newText;
            this.guardarTareasEnElAlmacenamientoLocal();
            this.representacionDeLasTareas();
        }
    }

    // Eliminar tarea de la lista actual
    eliminarTarea(index) {
        if (this.listaActual) {
            this.listas[this.listaActual].splice(index, 1);
            this.guardarTareasEnElAlmacenamientoLocal();
            this.representacionDeLasTareas();
        }
    }

    // Guardar las listas y tareas en el localStorage
    guardarTareasEnElAlmacenamientoLocal() {
        localStorage.setItem('listasDeTareas', JSON.stringify(this.listas));
    }

    // Cargar las listas y tareas desde el localStorage
    cargarTareasDesdeElAlmacenamientoLocal() {
        const listasAlmacenadas = localStorage.getItem('listasDeTareas');
        this.listas = JSON.parse(listasAlmacenadas) || {};
        this.cargarListasEnSelector();
    }

    // Representar las tareas de la lista actual
    representacionDeLasTareas() {
        const listaDeTareas = document.getElementById("listaDeTareas");
        listaDeTareas.innerHTML = "";

        if (this.listaActual && this.listas[this.listaActual]) {
            this.listas[this.listaActual].forEach((tarea, index) => {
                const listaDeItems = document.createElement("li");
                listaDeItems.innerHTML = `
                    <span>${tarea.text}</span>
                    <span>
                        <button class="edit-button" onClick="tareas.editarTarea(${index}, prompt('Edit tarea:', '${tarea.text}'))">Editar</button>
                        <button class="delete-button" onClick="tareas.eliminarTarea(${index})">Eliminar</button>
                    </span>
                `;
                listaDeTareas.appendChild(listaDeItems);
            });
        }
    }

    // Cargar las listas en el selector
    cargarListasEnSelector() {
        const selector = document.getElementById("seleccionarLista");
        selector.innerHTML = "";
        
        for (const nombreDeLaLista in this.listas) {
            const opcion = document.createElement("option");
            opcion.value = nombreDeLaLista;
            opcion.textContent = nombreDeLaLista;
            selector.appendChild(opcion);
        }

        selector.addEventListener("change", (event) => {
            this.cambiarLista(event.target.value);
        });

        if (!this.listaActual && Object.keys(this.listas).length > 0) {
            this.cambiarLista(Object.keys(this.listas)[0]); // Seleccionar la primera lista disponible
        }
    }
}