import { addTask } from "../storage.js";
import { navigate } from "../router.js";

// Рендер сторінки додавання задачі
export function addTaskPage(){

// Шаблон розмітки форми додавання
return `
<h2>Додати задачу</h2>

<input id="taskText">

<button onclick="createTask()">Додати</button>
`;

}

// Глобальна функція для створення задачі з форми
window.createTask = function(){

// Зчитування тексту з поля вводу
const text = document.getElementById("taskText").value;

// Додавання задачі та перехід до списку
addTask(text);

navigate("tasks");

};
