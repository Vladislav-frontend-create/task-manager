//Создание переменных
let task = "";
let completedTaskCount = 0;


//Отображение задачи
function showTask() {
    if (task === "") {
        console.log("Задача отсутствует");
    } else {
        console.log(task);
    }
}
//Добавление задачи
function setTask(taskDescription) {
    if (task !== "") {
        console.log("Не могу добавить задачу, завершите или удалите предыдущую");
    } else {
        task = taskDescription;
    }
}
//Завершение задачи
function completeTask() {
    if (task === "") {
        console.log("Нет задачи для завершения");
    } else {
        task = "";
        completedTaskCount++;
    }
}
//Удаление задачи
function deleteTask() {
    if (task === "") {
        console.log("Нет задачи для удаления");
    } else {
        task = "";
    }
}

showTask();                         // "Задача отсутствует"
setTask("Купить продукты");         //  Задача добавится
showTask();                         // "Купить продукты"
setTask("Съездить в сервис");       // "Не могу добавить задачу, завершите или удалите предыдущую"
completeTask();                     //  Задача завершится
showTask();                         // "Задача отсутствует"
console.log("Выполнено задач:", completedTaskCount);