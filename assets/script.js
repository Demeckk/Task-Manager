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

// Función para agregar una nueva tarea
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
    taskElement.innerHTML = taskName;

    tasksContainer.appendChild(taskElement);

    // Cierra el formulario y reinicia el valor del input
    document.forms[0].elements["taskName"].value = "";
    closeForm('form-' + column);

    // Aquí podrías hacer una llamada AJAX para guardar la tarea en la base de datos

    return false; // Evita que se recargue la página
}
