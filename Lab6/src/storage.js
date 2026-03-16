// Локальне сховище задач у пам'яті
let tasks = [];

// Повернення поточного списку задач
export function getTasks(){
return tasks;
}

// Додавання нової задачі до списку
export function addTask(text){
tasks.push({
text: text,
done: false
});
}

// Видалення задачі за індексом
export function deleteTask(index){
tasks.splice(index,1);
}

// Перемикання стану виконання задачі
export function toggleTask(index){
tasks[index].done = !tasks[index].done;
}
