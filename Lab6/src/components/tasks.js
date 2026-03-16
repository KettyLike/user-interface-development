import { getTasks, deleteTask, toggleTask } from "../storage.js";
import { navigate } from "../router.js";

// Рендер сторінки зі списком задач

export function tasksPage(){

// Отримання актуального списку задач
let tasks = getTasks();

// Базовий заголовок сторінки
let html = "<h2>Список задач</h2>";

// Формування HTML для кожної задачі
tasks.forEach((task,i)=>{

html += `
<div class="task">
<input type="checkbox" ${task.done ? "checked":""} 
onclick="toggle(${i})">

<span class="${task.done ? "done" : ""}">
${task.text}
</span>

<button onclick="remove(${i})">Видалити</button>
</div>
`;

});

return html;

}

// Глобальна функція для видалення задачі з оновленням списку
window.remove = function(i){
deleteTask(i);
navigate("tasks");
}

// Глобальна функція для перемикання статусу задачі
window.toggle = function(i){
toggleTask(i);
navigate("tasks");
}
