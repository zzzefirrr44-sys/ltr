
const loader = document.querySelector("#loader");
const result = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

function showLoader() {
    loader.style.display = "flex";
    buttons.forEach(button => button.disabled = true);
}

function hideLoader() {
    loader.style.display = "none";
    buttons.forEach(button => button.disabled = false);
}

function clearResult() {
    result.innerHTML = "";
}

function showResult(message, type = "success") {
    const item = document.createElement("div");
    item.className = `result-item ${type}`;
    item.textContent = message;
    result.appendChild(item);
}

function startResult(title) {
    clearResult();

    const heading = document.createElement("div");
    heading.className = "result-title";
    heading.textContent = title;

    result.appendChild(heading);
}

// Завдання 1

function helloPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello, World!");
        }, 2000);
    });
}

document.querySelector("#task1Btn").addEventListener("click", () => {
    startResult("Завдання 1. Результат:");

    showLoader();

    helloPromise()
        .then(message => {
            showResult(message);
        })
        .catch(error => {
            showResult(error, "error");
        })
        .finally(() => {
            hideLoader();
        });
});

// Завдання 2

function checkNumber(num) {
    return new Promise((resolve, reject) => {
        if (num > 10) {
            resolve("Число більше 10");
        } else {
            reject("Число менше або дорівнює 10");
        }
    });
}

document.querySelector("#task2Btn").addEventListener("click", () => {
    const input = document.querySelector("#numberInput");
    const num = Number(input.value);

    startResult("Завдання 2. Результат перевірки:");

    if (input.value.trim() === "" || !Number.isFinite(num)) {
        showResult("Введіть коректне число.", "error");
        return;
    }

    const secondNum = num > 10 ? 10 : 11;

    showLoader();

    const firstCheck = checkNumber(num)
        .then(message => {
            showResult(`${num}: ${message}`);
        })
        .catch(error => {
            showResult(`${num}: ${error}`, "error");
        });

    const secondCheck = checkNumber(secondNum)
        .then(message => {
            showResult(`${secondNum}: ${message}`);
        })
        .catch(error => {
            showResult(`${secondNum}: ${error}`, "error");
        });

    Promise.all([firstCheck, secondCheck])
        .finally(() => {
            hideLoader();
        });
});

// Завдання 3

function randomNumber() {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 2000) + 1000;

        const number = Math.floor(Math.random() * 100) + 1;

        setTimeout(() => {
            resolve({
                number: number,
                time: delay
            });
        }, delay);
    });
}

document.querySelector("#task3Btn").addEventListener("click", () => {
    startResult("Завдання 3. Випадкове число:");

    showLoader();

    const startTime = performance.now();

    randomNumber()
        .then(data => {
            const actualTime = ((performance.now() - startTime) / 1000).toFixed(2);

            showResult(`Випадкове число: ${data.number}`);
            showResult(`Затримка Promise: ${(data.time / 1000).toFixed(2)} секунди`);
            showResult(`Фактичний час виконання: ${actualTime} секунди`);
        })
        .catch(error => {
            showResult(error, "error");
        })
        .finally(() => {
            hideLoader();
        });
});

// Завдання 4

function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000);
    });
}

document.querySelector("#task4Btn").addEventListener("click", () => {
    const input1 = document.querySelector("#num1");
    const input2 = document.querySelector("#num2");

    const num1 = Number(input1.value);
    const num2 = Number(input2.value);

    startResult("Завдання 4. Порівняння чисел:");

    if (
        input1.value.trim() === "" ||
        input2.value.trim() === "" ||
        !Number.isFinite(num1) ||
        !Number.isFinite(num2)
    ) {
        showResult("Введіть два коректні числа.", "error");
        return;
    }

    showLoader();

    compareNumbers(num1, num2)
        .then(message => {
            showResult(message);
        })
        .catch(error => {
            showResult(error, "error");
        })
        .finally(() => {
            hideLoader();
        });
});

// Завдання 5

function createRandomPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const number = Math.floor(Math.random() * 10) + 1;
            resolve(number);
        }, delay);
    });
}

document.querySelector("#task5Btn").addEventListener("click", () => {
    startResult("Завдання 5. Promise.all:");

    showLoader();

    const promises = [
        createRandomPromise(1000),
        createRandomPromise(2000),
        createRandomPromise(3000)
    ];

    Promise.all(promises)
        .then(numbers => {
            const sum = numbers.reduce((total, number) => total + number, 0);

            showResult(`Перше число: ${numbers[0]}`);
            showResult(`Друге число: ${numbers[1]}`);
            showResult(`Третє число: ${numbers[2]}`);
            showResult(`Сума всіх чисел: ${sum}`);
        })
        .catch(error => {
            showResult(error, "error");
        })
        .finally(() => {
            hideLoader();
        });
});
