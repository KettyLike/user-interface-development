import { homePage } from "./components/home.js";
import { tasksPage } from "./components/tasks.js";
import { addTaskPage } from "./components/addTask.js";

// Функція навігації між сторінками SPA
export function navigate(page){

// Отримання контейнера для вмісту
const app = document.getElementById("app");

// Відображення головної сторінки
if(page === "home"){
app.innerHTML = homePage();
}

// Відображення списку задач
if(page === "tasks"){
app.innerHTML = tasksPage();
}

// Відображення форми додавання задачі
if(page === "add"){
app.innerHTML = addTaskPage();
}

}
