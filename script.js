const printOut = (msg) => {
    document.getElementById('out').innerText = msg;
};

// ==========================================
// РІВЕНЬ 4-6 БАЛІВ
// ==========================================

// 1. Клас Student та керування доступом
class Student {
    constructor(name, group, isLeader = false) {
        this.name = name;
        this.group = group;
        this.isLeader = isLeader;
    }

    getInfo() {
        return `Студент: ${this.name}, Група: ${this.group}, Староста: ${this.isLeader ? 'Так' : 'Ні'}`;
    }

    showLeaderAction() {
        if (this.isLeader) {
            return `Староста ${this.name} редагує журнал відвідуваності.`;
        } else {
            return `Студент ${this.name} не має прав редагувати журнал.`;
        }
    }
}

function task4_1() {
    const s1 = new Student("Денис Дунич", "КІ-23-01", true);
    const s2 = new Student("Олексій Петров", "КІ-23-01", false);
    
    let res = `${s1.getInfo()}\n${s1.showLeaderAction()}\n\n${s2.getInfo()}\n${s2.showLeaderAction()}`;
    console.log(res);
    printOut(res);
}

// 2. Клас Book з гетерами та сетерами
class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this._price = price;
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        if (newPrice > 0) {
            this._price = newPrice;
        } else {
            console.warn("Ціна повинна бути більшою за 0!");
        }
    }

    getInfo() {
        return `Книга: "${this.title}", Автор: ${this.author}, Ціна: ${this._price} грн`;
    }
}

function task4_2() {
    const book = new Book("JavaScript для професіоналів", "Джон Ресіг", 450);
    let log = book.getInfo() + "\n";
    
    book.price = 520; // Оновлення ціни
    log += `Нова ціна: ${book.price} грн\n`;
    
    book.price = -100; // Спроба встановити від'ємну ціну
    log += "Спроба встановити від'ємну ціну (-100 грн) відхилена (див. warning у F12).";
    
    printOut(log);
}

// 3. Успадкування Car -> ElectricCar
class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    drive() {
        return `${this.brand} ${this.model} їде за допомогою ДВЗ.`;
    }
}

class ElectricCar extends Car {
    constructor(brand, model, batteryCapacity) {
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
    }

    drive() {
        return `${this.brand} ${this.model} їде безшумно на електротязі (Батарея: ${this.batteryCapacity} kWh).`;
    }
}

function task4_3() {
    const simpleCar = new Car("Toyota", "Camry");
    const tesla = new ElectricCar("Tesla", "Model S", 100);
    
    let res = `${simpleCar.drive()}\n${tesla.drive()}`;
    printOut(res);
}

// ==========================================
// РІВЕНЬ 7-9 БАЛІВ
// ==========================================

// 1. Інтерфейс Shape -> Circle
class Shape {
    getArea() {
        return 0;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    getArea() {
        return (Math.PI * this.radius ** 2).toFixed(2);
    }
}

function task7_1() {
    const r = prompt("Введіть радіус кола:", "5");
    if (r) {
        const circle = new Circle(Number(r));
        printOut(`Площа кола з радіусом ${r} дорівнює: ${circle.getArea()}`);
    }
}

// 2. Приватні поля #balance
class BankAccount {
    #balance = 0;

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return `Поповнено на ${amount} грн. Поточний баланс: ${this.#balance} грн`;
        }
    }

    withdraw(amount) {
        if (amount > this.#balance) {
            return `Недостатньо коштів! Баланс: ${this.#balance} грн`;
        }
        this.#balance -= amount;
        return `Знято ${amount} грн. Залишок: ${this.#balance} грн`;
    }

    getBalance() {
        return `Баланс: ${this.#balance} грн`;
    }
}

function task7_2() {
    const acc = new BankAccount();
    let log = acc.deposit(1000) + "\n";
    log += acc.withdraw(300) + "\n";
    log += acc.withdraw(900) + "\n";
    log += "Спроба прямого доступу acc.#balance викличе синтаксичну помилку (захищено).";
    printOut(log);
}

// 3. Статичні методи MathHelper
class MathHelper {
    static sum(a, b) {
        return a + b;
    }

    static max(a, b) {
        return a > b ? a : b;
    }
}

function task7_3() {
    let res = `MathHelper.sum(15, 25) = ${MathHelper.sum(15, 25)}\n`;
    res += `MathHelper.max(42, 88) = ${MathHelper.max(42, 88)}`;
    printOut(res);
}

// ==========================================
// РІВЕНЬ 10-12 БАЛІВ
// ==========================================

// 1. Симуляція ролей (User -> Admin)
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getRole() {
        return "User";
    }
}

class Admin extends User {
    getRole() {
        return "Admin";
    }

    deleteUser(userObj) {
        return `Адміністратор ${this.name} видалив користувача ${userObj.name}`;
    }
}

function task10_1() {
    const u = new User("Іван", "ivan@gmail.com");
    const a = new Admin("Денис (Admin)", "admin@site.com");
    
    let res = `Користувач: ${u.name} (Роль: ${u.getRole()})\n`;
    res += `Адмін: ${a.name} (Роль: ${a.getRole()})\n`;
    res += a.deleteUser(u);
    printOut(res);
}

// 2. Система "Корзина покупок"
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addProduct(product) {
        this.items.push(product);
    }

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    getSummary() {
        let list = this.items.map(i => `- ${i.name}: ${i.price} грн`).join('\n');
        return `Товари в кошику:\n${list}\n\nЗагальна сума: ${this.getTotalPrice()} грн`;
    }
}

function task10_2() {
    const cart = new ShoppingCart();
    cart.addProduct(new Product("Клавіатура", 1200));
    cart.addProduct(new Product("Мишка", 600));
    cart.addProduct(new Product("Монітор", 5500));
    
    printOut(cart.getSummary());
}

// 3. Система керування завданнями (TaskManager)
class Task {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }

    complete() {
        this.completed = true;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(title) {
        const task = new Task(title);
        this.tasks.push(task);
    }

    completeTask(index) {
        if (this.tasks[index]) {
            this.tasks[index].complete();
        }
    }

    getPendingTasks() {
        return this.tasks.filter(t => !t.completed);
    }

    getSummary() {
        let text = "Усі завдання:\n";
        this.tasks.forEach((t, i) => {
            text += `${i + 1}. [${t.completed ? '✓ Виконано' : '✗ В процесі'}] ${t.title}\n`;
        });
        return text;
    }
}

function task10_3() {
    const tm = new TaskManager();
    tm.addTask("Здати ЛР з Windows");
    tm.addTask("Здати ЛР з JS");
    tm.addTask("Оформити звіти");
    
    tm.completeTask(1); // Виконали завдання №2
    
    printOut(tm.getSummary());
}