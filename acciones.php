<?php

// Función para obtener las tareas de una columna específica
function obtenerTareas($column) {
    if (!isset($_SESSION[$column])) {
        $_SESSION[$column] = [];
    }
    return $_SESSION[$column];
}

// Función para agregar una nueva tarea a una columna específica
function agregarTarea($column, $taskId, $taskName) {
    $tasks = obtenerTareas($column);
    $tasks[] = ['id' => $taskId, 'name' => $taskName];
    $_SESSION[$column] = $tasks;
}

// Función para mover una tarea de una columna a otra
function moverTarea($taskId, $oldColumn, $newColumn) {
    $oldTasks = obtenerTareas($oldColumn);
    $newTasks = obtenerTareas($newColumn);

    // Buscar la tarea en la columna anterior y moverla a la nueva
    foreach ($oldTasks as $key => $task) {
        if ($task['id'] === $taskId) {
            $newTasks[] = $task;
            unset($oldTasks[$key]);
            break;
        }
    }

    // Actualizar las columnas en la sesión
    $_SESSION[$oldColumn] = array_values($oldTasks); // Reindexar el array
    $_SESSION[$newColumn] = $newTasks;
}

// Función para eliminar una tarea de una columna
function eliminarTarea($taskId, $column) {
    $tasks = obtenerTareas($column);

    // Filtrar las tareas para eliminar la tarea con el ID especificado
    $tasks = array_filter($tasks, function($task) use ($taskId) {
        return $task['id'] !== $taskId;
    });

    // Actualizar la columna en la sesión
    $_SESSION[$column] = array_values($tasks); // Reindexar el array
}

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
