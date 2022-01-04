let cons = document.querySelector(".coincident");
let userNumber = document.querySelector(".num_input > #num");
let attempt = document.querySelector(".attempt");
let button = document.querySelector(".check");

//извлекаем число попыток из строчного элемента
let attempts = +attempt.textContent;

//функция с mdn
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

//генерируем случайное число
let num = getRandomInt(3,6);

//генерируем цифры для числа без повторов
let interimSet = new Set();

function getRandomNum(n) {
    let random = getRandomInt(0, 9);

    if(interimSet.size < n) {
        interimSet.add(random);
        return getRandomNum(n);
    } else {
        return interimSet;
    }
}

getRandomNum(num);

//создаем число
let totalNum = "";
for (const n of interimSet) {
    totalNum += n;
}
console.log(totalNum);

//также можно не преобразовывать числовые строки в массив и работать именно со строками
function compareNumbers(userN, computerN) {
    //создаем массив из чисел
    let arr1 = Array.from(userN);
    let arr2 = Array.from(computerN);

    //если числа равны, пользователь угадал
    if(+userN == +computerN) {
        cons.textContent = "Поздравляем, вы угадали!";
    } else {

        //если нет, считаем количество совпадений
        let matchedIndex = [];
        let notMatchedIndex = [];
        for (let i = 0; i <= arr1.length; i++) {
            if(arr2.indexOf(arr1[i]) == i) {
                matchedIndex.push(arr1[i]);
            } else if(arr2.includes(arr1[i]) && !matchedIndex.includes(arr1[i])) {
                notMatchedIndex.push(arr1[i]);
            }
        }

        let str;
        
        //если попытки еще есть, уведомляем пользователя о количестве угаданных чисел
        if(attempts >= 1) {
            attempts--;
            attempt.textContent = attempts;
            str = `Количество угаданных чисел на своих позициях: ${matchedIndex.length}(${matchedIndex.join()}); Количество угаданных чисел не на своих позициях: ${notMatchedIndex.length}(${notMatchedIndex.join()})`;
            cons.textContent = str;
            
        console.log(attempts);
        }
        //если попытки закончились, уведомляем пользователя, блокируем текстовое поле и кнопку
        if(attempts == 0){
            cons.textContent = "Увы, попытки закончились! Попробуйте снова.";
            userNumber.disabled = true;
            button.disabled = true;
        }

    }
}

//навешиваем обработчик
button.addEventListener("click", (e) => compareNumbers(e.target.previousElementSibling.value, totalNum));
