// script.js

// Función para permitir el drop de tareas en las columnas
function allowDrop(event) {
    event.preventDefault();
}

// Función para manejar el inicio del arrastre de la tarea
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Función para manejar el drop de la tarea en una nueva columna
function drop(event, column) {
    event.preventDefault();
    var taskId = event.dataTransfer.getData("text");
    var taskElement = document.getElementById(taskId);
    var tasksContainer = document.getElementById("tasks-" + column);
    tasksContainer.appendChild(taskElement);

    // Aquí podrías hacer una llamada AJAX para actualizar el estado de la tarea en la base de datos
}

// Función para abrir el formulario de nueva tarea
function openForm(formId) {
    document.getElementById(formId).style.display = "block";
}

// Función para cerrar el formulario de nueva tarea
function closeForm(formId) {
    document.getElementById(formId).style.display = "none";
}

// En la función addTask(column) dentro de index.php
function addTask(column) {
    var taskName = document.forms[0].elements["taskName"].value;
    if (taskName.trim() === "") {
        alert("Por favor ingresa un nombre para la tarea.");
        return false;
    }

    var tasksContainer = document.getElementById("tasks-" + column);
    var taskId = "task-" + Math.random().toString(36).substr(2, 16); // Genera un ID único para la tarea
    var taskElement = document.createElement("div");
    taskElement.id = taskId;
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.setAttribute("ondragstart", "drag(event)");

    // Contenedor para la tarea y botones
    var taskContent = document.createElement("div");
    taskContent.className = "task-content";
    taskContent.innerHTML = taskName;

    // Botón para eliminar tarea
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";
    deleteButton.onclick = function() {
        eliminarTarea(taskId, column);
        tasksContainer.removeChild(taskElement);
    };

    // Botón para modificar tarea (aquí puedes implementar una función similar para modificar)

    // Agregar botones al contenedor de la tarea
    taskContent.appendChild(deleteButton);
    // Agregar otros botones según sea necesario

    // Agregar el contenido de la tarea al elemento de tarea
    taskElement.appendChild(taskContent);

    tasksContainer.appendChild(taskElement);

    // Cierra el formulario y reinicia el valor del input
    document.forms[0].elements["taskName"].value = "";
    closeForm('form-' + column);

    // Aquí podrías hacer una llamada AJAX para guardar la tarea en la base de datos

    return false; // Evita que se recargue la página
}


// En script.js
function eliminarTarea(taskId, column) {
    // Aquí puedes implementar una llamada AJAX para eliminar la tarea del backend
    fetch('eliminar_tarea.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, column }),
    })
    .then(response => response.json())
    .then(data => {
        // Eliminar visualmente la tarea del DOM
        var taskElement = document.getElementById(taskId);
        taskElement.parentNode.removeChild(taskElement);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}


// Función para modificar una tarea (ejemplo básico, puedes implementar según tu necesidad)
function modificarTarea(taskId) {
    var newName = prompt("Ingrese el nuevo nombre de la tarea:");
    if (newName !== null && newName.trim() !== "") {
        var taskElement = document.getElementById(taskId);
        taskElement.querySelector('span').textContent = newName;

        // Aquí podrías hacer una llamada AJAX para modificar la tarea en la base de datos
    }
}
