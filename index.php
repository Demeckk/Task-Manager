<?php
include 'acciones.php';

// Función para mostrar las tareas de una columna
function mostrarTareas($column) {
    $tasks = obtenerTareas($column);
    $output = '';
    foreach ($tasks as $task) {
        $output .= "<div id='{$task['id']}' class='task' draggable='true' ondragstart='drag(event)'>";
        $output .= $task['name'];
        $output .= "</div>";
    }
    return $output;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Task Manager</title>
    <link rel="stylesheet" href="assets/style.css">
</head>
<body>
    <h1>Gestor de tareas online</h1>
    <div class="container">
        <div class="column" id="todo">
            <h2>Por hacer</h2>
            <div class="tasks" id="tasks-todo" ondrop="drop(event, 'todo')" ondragover="allowDrop(event)">
                <?php echo mostrarTareas('todo'); ?>
            </div>
            <button onclick="openForm('form-todo')">+ Nueva tarea</button>
        </div>

        <div class="column" id="in-progress">
            <h2>En progreso</h2>
            <div class="tasks" id="tasks-in-progress" ondrop="drop(event, 'in-progress')" ondragover="allowDrop(event)">
                <?php echo mostrarTareas('in-progress'); ?>
            </div>
        </div>

        <div class="column" id="done">
            <h2>Hecho</h2>
            <div class="tasks" id="tasks-done" ondrop="drop(event, 'done')" ondragover="allowDrop(event)">
                <?php echo mostrarTareas('done'); ?>
            </div>
        </div>
    </div>

    <div id="form-todo" class="task-form">
        <h3>Nueva Tarea</h3>
        <form onsubmit="return addTask('todo')">
            <input type="text" name="taskName" placeholder="Nombre de la tarea" required>
            <button type="submit">Guardar</button>
        </form>
        <button onclick="closeForm('form-todo')">Cancelar</button>
    </div>

    <script src="assets/script.js"></script>
</body>
</html>
