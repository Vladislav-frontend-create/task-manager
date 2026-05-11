// ─── Состояние ───────────────────────────────────────────────────────────────
let task = "";
let completedTaskCount = 0;

// ─── Вспомогательная функция валидации ───────────────────────────────────────
function isValidString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// ─── Отображение задачи ───────────────────────────────────────────────────────
function showTask() {
    if (task === "") {
        console.log("Задача отсутствует");
        return;
    }
    console.log("Текущая задача:", task);
}

// ─── Добавление задачи ────────────────────────────────────────────────────────
function setTask(taskDescription) {
    // Проверка типа и наличия аргумента
    if (taskDescription === undefined || taskDescription === null) {
        console.error("Ошибка: описание задачи не передано");
        return;
    }
    if (!isValidString(taskDescription)) {
        console.error("Ошибка: описание задачи должно быть непустой строкой");
        return;
    }
    // Защита от слишком длинного текста
    if (taskDescription.length > 200) {
        console.error("Ошибка: описание задачи не должно превышать 200 символов");
        return;
    }
    if (task !== "") {
        console.warn("Не могу добавить задачу — завершите или удалите предыдущую");
        return;
    }

    task = taskDescription.trim();
    console.log("Задача добавлена:", task);
}

// ─── Завершение задачи ────────────────────────────────────────────────────────
function completeTask() {
    if (task === "") {
        console.warn("Нет активной задачи для завершения");
        return;
    }

    console.log(`Задача "${task}" завершена`);
    task = "";
    completedTaskCount++;
}

// ─── Удаление задачи ──────────────────────────────────────────────────────────
function deleteTask() {
    if (task === "") {
        console.warn("Нет активной задачи для удаления");
        return;
    }

    console.log(`Задача "${task}" удалена`);
    task = "";
}

showTask();                         // "Задача отсутствует"
setTask("Купить продукты");         //  Задача добавится
showTask();                         // "Купить продукты"
setTask("Съездить в сервис");       // "Не могу добавить задачу, завершите или удалите предыдущую"
completeTask();                     //  Задача завершится
showTask();                         // "Задача отсутствует"
console.log("Выполнено задач:", completedTaskCount);