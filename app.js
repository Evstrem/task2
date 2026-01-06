// загружаем пароли из localStorage
let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

function savePasswords() {
    localStorage.setItem("passwords", JSON.stringify(passwords));
}

// отображение 
function renderList() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    passwords.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${item.site}</strong><br>
            Логин: ${item.login}<br>
            Пароль: ${item.password}<br>
            <button onclick="deleteItem(${index})">Удалить</button>
        `;
        list.appendChild(li);
    });
}

// удаление 
function deleteItem(i) {
    passwords.splice(i, 1);
    savePasswords();
    renderList();
}

// добавление нового пароля
document.getElementById("add").onclick = () => {
    const site = document.getElementById("site").value.trim();
    const login = document.getElementById("login").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!site || !login || !password) {
        alert("Заполните все поля!");
        return;
    }

    passwords.push({ site, login, password });
    savePasswords();
    renderList();

    // очистка полей
    document.getElementById("site").value = "";
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";
};

// генератор пароля 
document.getElementById("generate").onclick = () => {
    const lengthInput = document.getElementById("length");
    const strengthInput = document.getElementById("strength");

    if (!lengthInput || !strengthInput) return alert("Ошибка: элементы генерации пароля не найдены!");

    const length = parseInt(lengthInput.value);
    const strength = parseInt(strengthInput.value);

    let chars = "";
    if (strength === 1) chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (strength === 2) chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (strength === 3) chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

    let pass = "";
    for (let i = 0; i < length; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("password").value = pass;
};

// регистрация service worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

// отображение паролей при загрузке
renderList();
