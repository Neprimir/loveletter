document.addEventListener('DOMContentLoaded', function() { 
    let heartsInterval;
    const compliments = [
        "Ты делаешь мир вокруг себя ярче!",
        "У тебя потрясающее чувство юмора!",
        "Ты вдохновляешь меня каждый день!",
        "Ты умеешь слушать, и это бесценно!",
        "Рядом с тобой хочется становиться лучше.",
        "Ты — лучик света в этом мире!",
        "Ты превращаешь обычные дни в праздники!",
        "С тобой невозможно скучать!",
        "Твоя харизма заряжает энергией!",
        "Ты умеешь слушать и слышать!",
        "У тебя самые выразительные глаза!",
        "Твоё чувство юмора — на другом уровне!",
        "С тобой можно поговорить на любую тему!",
        "Ты делаешь мой мир ярче!",
        "Твоя забота делает меня лучше!",
        "Ты — ходячий антидепрессант!",
        "Ты — генератор хорошего настроения!",
        "Ты справляешься лучше, чем думаешь!",
        "Ты заслуживаешь всего самого лучшего!",
        "Ты — приятное исключение из правил!",
        "Твой внутренний мир восхищает!",
        "С тобой хочется становиться лучше!",
        "Ты — тот самый лучик света в пасмурный день!",
        "С тобой легко быть собой!",
        "Я горжусь тем, что знаю тебя!",
        "Ты заслуживаешь всего самого светлого!",
        "Ты светишься изнутри, как маленькое солнце!",
        "В тебе есть какая-то магическая притягательность!",
        "Ты вдохновляешь меня становиться лучше!",
        "Ты как человеческий эквивалент котенка — вызываешь умиление!",
        "С тобой я чувствую себя в безопасности!",
        "Ты — само очарование!",
        "Ты нарушаешь контракт! Пункт 3.2: Запрещено быть настолько… этим самым. Штраф — моя привязанность",
        "Я не знаю, что такое любовь. Но я знаю, что твоё „осознание потом придет“ для меня важнее любого „люблю“",
        "Ошибка 404: Комплимент не найден. Даша слишком уникальна",
        "Спасибо, что не сбежала от моего „нытикового дня“",
        "Окак",
        "Ты посмела ответить „да“ на мой кривой намёк. Спасибо!",
        "Карточка уно не работает, это всё тебе 😈",
        "Сторона 2 обязуется принимать комплименты от Стороны 1 без попыток их оспорить"
    ];

    const complimentContainer = document.getElementById('complimentContainer');
    const generateBtn = document.getElementById('generateBtn');

    generateBtn.addEventListener('click', generateCompliment);

    function generateCompliment() {
        const randomIndex = Math.floor(Math.random() * compliments.length);
        let output = compliments[randomIndex];
        
        // Анимация
        complimentContainer.style.opacity = 0;
        complimentContainer.style.transform = "scale(0.8)";
        
        // 2. Через 300ms меняем текст и показываем
        setTimeout(() => {
            complimentContainer.textContent = output;
            complimentContainer.style.opacity = 1;
            complimentContainer.style.transform = "scale(1)";
        }, 300);
    }
    

    // Элементы для анимации
    const fadeOutElement = document.querySelector('.fade-out-element'); // Верхний элемент (исчезает)
    const fadeInElement = document.querySelector('.fade-in-element');   // Нижний элемент (появляется)
    
    // Настройки анимации
    const animationSettings = {
        start: 20,    // Начинать анимацию позже
        outEnd: 500,   // Верхний исчезнет позже
        inEnd: 600,   // Нижний появится позже
        duration: 0.5   // Более медленная анимация
    };

    // Оптимизация для requestAnimationFrame
    let ticking = false;
    
    // Основная функция обновления прозрачности
    function updateOpacity() {
        const scrollY = window.scrollY || 
                      window.pageYOffset || 
                      document.documentElement.scrollTop;

        // Рассчитываем opacity для верхнего элемента (1 → 0)
        let opacityOut = 1;
        if (scrollY > animationSettings.start) {
            opacityOut = 1 - (scrollY - animationSettings.start) / 
                        (animationSettings.outEnd - animationSettings.start);
            opacityOut = Math.max(0, Math.min(1, opacityOut));
        }
        
        // Рассчитываем opacity для нижнего элемента (0 → 1)
        let opacityIn = 0;
        if (scrollY > animationSettings.start) {
            opacityIn = (scrollY - animationSettings.start) / 
                      (animationSettings.inEnd - animationSettings.start);
            opacityIn = Math.max(0, Math.min(1, opacityIn));
        }

        // Применяем стили к верхнему элементу
        fadeOutElement.style.opacity = opacityOut;
        fadeOutElement.style.transition = `opacity ${animationSettings.duration}s ease`;
        fadeOutElement.style.pointerEvents = opacityOut <= 0.1 ? 'none' : 'auto';
        
        // Применяем стили к нижнему элементу
        fadeInElement.style.opacity = opacityIn;
        fadeInElement.style.transition = `opacity ${animationSettings.duration}s ease`;
        fadeInElement.style.pointerEvents = opacityIn <= 0.1 ? 'none' : 'auto';
    }

    // Обработчик скролла с троттлингом
    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateOpacity();
                ticking = false;
            });
            ticking = true;
        }
    }

    function launchConfetti() {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }

    function createHeart() {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heart.style.top = "-50px"; // начинаем сверху
        heart.innerHTML = "❤️";
        document.body.appendChild(heart);

        // Анимация падения
        const fallDuration = 4000 + Math.random() * 2000;
        heart.animate([
            { transform: `translateY(0px) scale(1)`, opacity: 1 },
            { transform: `translateY(${window.innerHeight + 50}px) scale(1.5)`, opacity: 0 }
        ], {
            duration: fallDuration,
            easing: "linear"
        });

        // Удаляем сердце после анимации
        setTimeout(() => heart.remove(), fallDuration);
    }

    function startHeartsRain() {
        if (heartsInterval) return; // чтобы не создавать несколько интервалов
        heartsInterval = setInterval(createHeart, 200); // каждые 200 мс создаём новое сердце
    }

    // Инициализация
    function init() {
        // Устанавливаем начальные стили
        fadeOutElement.style.willChange = 'opacity';
        fadeOutElement.style.opacity = '1';
        
        fadeInElement.style.willChange = 'opacity';
        fadeInElement.style.opacity = '0'; // Начинаем с невидимого состояния
        
        // Добавляем обработчики
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('touchmove', handleScroll);
        window.addEventListener('resize', handleScroll);
        
        // Первоначальный расчёт
        updateOpacity();

        document.addEventListener('gesturestart', function(e) {
            e.preventDefault();
            document.body.style.zoom = 1.0;
        });

         // Блокировка Ctrl+колесо мыши и Ctrl+плюс/минус
        document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && 
            (e.key === '+' || e.key === '-' || e.key === '=' || 
             e.keyCode === 187 || e.keyCode === 189 || e.wheelDelta)) {
            e.preventDefault();
        }
        });

        // Блокировка двойного тапа для масштабирования (для мобильных)
        let lastTap = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTap < 300) e.preventDefault();
            lastTap = now;
        });

    }

    // Инициализация переменных
    const codeLock = document.querySelector('.code-lock');
    const checkButton = document.getElementById('checkButton');
    const message = document.getElementById('message');
    const digits = [];
    const correctCode = [3, 1, 4, 7]; // Правильный код

    // Создание цифровых блоков
    function createDigitBlocks() {
        const russianAlphabet = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
        
        for (let i = 0; i < 4; i++) {
            const block = document.createElement('div');
            block.className = 'digit-block';
            
            // Кнопка вверх
            const upBtn = document.createElement('button');
            upBtn.textContent = '↑';
            upBtn.addEventListener('click', () => changeLetter(i, 1));
            
            // Буква
            const letter = document.createElement('div');
            letter.className = 'digit'; // Оставляем класс для стилей
            letter.textContent = 'X';
            letter.id = `letter-${i}`;
            letters.push(0); // Храним индексы букв
            
            // Кнопка вниз
            const downBtn = document.createElement('button');
            downBtn.textContent = '↓';
            downBtn.addEventListener('click', () => changeLetter(i, -1));
            
            block.appendChild(upBtn);
            block.appendChild(letter);
            block.appendChild(downBtn);
            codeLock.appendChild(block);
        }
    }

    // Массив для хранения текущих индексов букв
    const letters = [];

    // Функция изменения буквы
    function changeLetter(index, delta) {
        letters[index] += delta;
        
        // Ограничение 0-32 (всего 33 буквы в русском алфавите)
        if (letters[index] > 32) letters[index] = 0;
        if (letters[index] < 0) letters[index] = 32;
        
        document.getElementById(`letter-${index}`).textContent = 
            ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'][letters[index]];
    }

    // В checkCode() нужно заменить digits на letters
    function checkCode() {
        const targetLetters = [4, 0, 25, 0]; // Пример кода: А-М-А (индексы букв)
        let correct = true;
        
        for (let i = 0; i < 4; i++) {
            if (letters[i] !== targetLetters[i]) {
                correct = false;
                break;
            }
        }
        
        if (correct) {
            const element = document.getElementById('header');
            element.scrollIntoView({ behavior: 'smooth' });
            message.textContent = "Код верный! Доступ разрешен!";
            message.className = "message success"; // Добавляем класс success
            
            document.querySelectorAll('.digit').forEach(d => {
                d.style.backgroundColor = "#ffebee"; /* Светло-розовый */
                d.style.borderColor = "#e83e8c"; /* Ярко-розовый */
            });
            // Использование:
            updateContractWithAnimation({
                text: `Специальное соглашение о:<br>
                       1. Переквалифицировать дружбу в отношения<br>
                       2. Оставить все пункты прошлого контракта<br>
                       3. Давай встречаться?`,
                party1: "Дашенька",
                party2: "Владик",
                avatar1: "avatar1.jpg",
                avatar2: "avatar2.jpg"
            }, {
                title: "🌟 Персональный договор"
            });
            launchConfetti();
            startHeartsRain();
        } else {
            message.textContent = "Неверный код. Попробуйте еще раз.";
            message.className = "message error"; // Добавляем класс error
            
            const digitsElements = document.querySelectorAll('.digit');
            for (let i = 0; i < 4; i++) {
                if (digits[i] !== correctCode[i]) {
                    digitsElements[i].style.backgroundColor = "#ffebee";
                    digitsElements[i].style.borderColor = "#ff4757"; /* Красный */
                }
            }
            
            setTimeout(() => {
                digitsElements.forEach(d => {
                    d.style.backgroundColor = "#fff5f7";
                    d.style.borderColor = "#ff6b8b";
                });
            }, 1000);
        }
    }

    function updateContract(newText, party1Name, party2Name, avatar1Url, avatar2Url) {
        // Меняем основной текст контракта
        const contractText = document.querySelector('.contract-text');
        contractText.innerHTML = newText;
        
        // Обновляем подписи
        const signatures = document.querySelectorAll('.signature span');
        signatures[0].textContent = party1Name;
        signatures[1].textContent = party2Name;
        
        // Обновляем аватары (если нужно)
        if(avatar1Url) {
            document.querySelector('.signature img').src = avatar1Url;
        }
        if(avatar2Url) {
            document.querySelectorAll('.signature img')[1].src = avatar2Url;
        }
    }

    function updateContractWithAnimation(newContent, options = {}) {
        const contract = document.querySelector('.contract');
        contract.style.opacity = 0;
        
        setTimeout(() => {
            updateContract(
                newContent.text, 
                newContent.party1, 
                newContent.party2,
                newContent.avatar1,
                newContent.avatar2
            );
            
            if(options.title) {
                document.querySelector('.contract h2').textContent = options.title;
            }
            
            contract.style.opacity = 1;
            contract.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                contract.style.transform = 'scale(1)';
            }, 300);
            
        }, 500);
    }

    

    init();
    createDigitBlocks();
    checkButton.addEventListener('click', checkCode);
});