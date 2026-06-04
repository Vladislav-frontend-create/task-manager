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

// ─── Отображение всех задач ────────────────────────────────────────
function showTask() {
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

// ─── Завершение задачи по индексу ──────────────────────────────────
function completeTask(index) {
    const task = tasks[index];

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

showTask();                              

setTask("Купить продукты", "Молоко, хлеб, яйца");
setTask("Сделать домашку", "JavaScript массивы");
setTask("Позвонить маме", "");

showTask();

completeTask(1);                         
completeTask(0);                         

showTask();

deleteTask(2);                        
deleteTask(0);                       

clearTasks();                         
showTask();  
