import { navigate } from "./router.js";

// Прив'язка навігації до кнопок меню через атрибут data-page
document.querySelectorAll("button[data-page]").forEach(btn => {

// Обробка кліку та перехід на обрану сторінку
btn.addEventListener("click", () => {
navigate(btn.dataset.page);
});

});

// Початкове завантаження головної сторінки
navigate("home");
