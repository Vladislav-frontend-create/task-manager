// ─── Состояние ───────────────────────────────────────────────────────────────
const tasks = [];
const completedTasks = [];

// ─── Вспомогательная функция валидации ───────────────────────────────────────
function isValidString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

// ─── Создание объекта задачи ─────────────────────────────────────────────────
function createTaskObject(title, description) {
    return {
        title,
        description,
        isCompleted: false,
        createdDate: new Date(),
        completedDate: null
    };
}

// ─── Добавление задачи ─────────────────────────────────────────────
function setTask(title, description) {
    // Проверка заголовка
    if (!isValidString(title)) {
        console.error("Ошибка: название задачи должно быть непустой строкой");
        return;
    }
    
    // Проверка описания (опционально, может быть пустым)
    if (description !== undefined && description !== null && typeof description !== "string") {
        console.error("Ошибка: описание должно быть строкой");
        return;
    }
    
    // Создаем объект задачи и добавляем в массив
    const newTask = createTaskObject(title, description);
    tasks.push(newTask);
    
    console.log(`Задача добавлена: "${newTask.title}"`);
}

// ─── 7. Отображение всех задач (с методами массивов) ────────────────────────
function showTasks() {
    if (tasks.length === 0) {
        console.log("Список задач пуст");
        return;
    }

    tasks.forEach((task, index) => {
        console.log(`\n[${index}] ${task.title}`);
        console.log(`Описание: ${task.description || "(нет)"}`);
        console.log(`Статус: ${task.isCompleted ? "Выполнена" : "Не выполнена"}`);
        console.log(`Создана: ${task.createdDate.toLocaleString()}`);
        console.log(`Завершена: ${task.completedDate ? task.completedDate.toLocaleString() : "—"}`);
    });
}

// ─── 6. Завершение задачи по индексу (с методами массивов) ─────────────────
function completeTask(index) {
    const task = tasks.find((_, taskIndex) => taskIndex === index);

    if (!task) {
        console.error('Задача не найдена');
        return;
    }

    if (task.isCompleted) {
        console.warn(`Задача "${task.title}" уже выполнена`);
        return;
    }

    // Завершаем задачу
    task.isCompleted = true;
    task.completedDate = new Date();
    completedTasks.push(task);

    console.log(`Задача "${task.title}" завершена!`);
}

// ─── Удаление задачи по индексу ────────────────────────────────────
function deleteTask(index) {
    const task = tasks[index];
    if (!task) {
        console.error('Задача не найдена');
        return;
    }
    
    const taskTitle = task.title;
    
    // Если задача не выполнена — запрашиваем подтверждение
    if (!task.isCompleted) {
        const userConfirmed = confirm(`Таска еще не выполнена, удалить?`);
        if (!userConfirmed) {
            console.log(`Удаление отменено: "${taskTitle}"`);
            return;
        }
    }
    
    // Удаляем задачу
    tasks.splice(index, 1);
    console.log(`Задача "${taskTitle}" удалена`);
}

// ─── Очистка всех задач ────────────────────────────────────────────
function clearTasks() {
    if (tasks.length === 0) {
        console.log("Список задач уже пуст");
        return;
    }
    
    tasks.length = 0;     
    completedTaskCount = 0; 
    
    console.log("Все задачи удалены");
 }

// ─── Получение массива описаний всех задач ───────────────────────────────
function getTaskDescriptions() {
    return tasks.map(task => task.description);
}

// ─── Получение задач с длинным описанием (> 10 символов) ────────────────
function getLongTasks() {
    return tasks.filter(task => task.title.length > 10);
}

// ─── Получение задач по диапазону дат ────────────────────────────────────
function getTasksByDateRange(startDate, endDate, isCompleted = false) {
    let filteredTasks = tasks.filter(task => {
        const dateToCheck = task.completedDate || task.createdDate;
        return dateToCheck >= startDate && dateToCheck <= endDate;
    });

    if (isCompleted === true) {
        filteredTasks = filteredTasks.filter(task => task.isCompleted === true);
    }

    return filteredTasks;
}

// ─── Удаление коротких задач (< 5 символов) ──────────────────────────────
function clearShortTasks() {
    const filteredTasks = tasks.filter(task => task.title.length >= 5);
    tasks.length = 0;
    tasks.push(...filteredTasks);

    console.log("Короткие задачи удалены");
}

// ─── Обновление названия задачи по индексу ───────────────────────────────
function updateTaskTitle(index, newTitle) {
    const task = tasks[index];

    if (!task) {
        console.error('Задача не найдена');
        return;
    }

    if (!isValidString(newTitle)) {
        console.error("Ошибка: новое название задачи должно быть непустой строкой");
        return;
    }

    task.title = newTitle;
    console.log(`Название задачи обновлено на: "${task.title}"`);
}

showTasks();                              

setTask("Купить продукты", "Молоко, хлеб, яйца");
setTask("Сделать домашку", "JavaScript массивы");
setTask("Позвонить маме", "");

showTasks();

completeTask(1);                         
completeTask(0);                         

showTasks();

deleteTask(2);                        
deleteTask(0);                       

clearTasks();                         
showTasks();
