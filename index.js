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

// ─── Статистика ───────────────────────────────────────────────────────────────
function getStats() {
    return {
        currentTask: task || null,
        completedTaskCount,
    };
}

// ─── Тесты ───────────────────────────────────────────────────────────────────
showTask();                          // "Задача отсутствует"
setTask("Купить продукты");          // ✓ Задача добавлена
showTask();                          // "Купить продукты"
setTask("Съездить в сервис");        // ✗ уже есть задача
setTask("");                         // ✗ пустая строка
setTask(null);                       // ✗ null
setTask(42);                         // ✗ не строка
setTask("A".repeat(201));            // ✗ слишком длинная
completeTask();                      // ✓ Задача завершена
showTask();                          // "Задача отсутствует"
console.log(getStats());             // { currentTask: null, completedTaskCount: 1 }