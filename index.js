let QuizContainer = createQuizContainer();
let WelcomeScreen = createWelcomeScreen();

let nameInput = createNameInput();
let emailInput = createEmailInput();
let genderSelect = createGenderSelect();
let dobInput = createDobInput();
let startButton = createStartButton();

[nameInput, emailInput, genderSelect, dobInput, startButton].forEach(el => WelcomeScreen.appendChild(el));

QuizContainer.appendChild(WelcomeScreen);
document.body.appendChild(QuizContainer);

let userData = {};
let currentQuestion = 0;

const questions = [
    { q: "What is 2+2?", a: "B", options: ["A) 3", "B) 4", "C) 5", "D) 6"] },
    { q: "Capital of France?", a: "C", options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"] },
    { q: "Largest planet?", a: "D", options: ["A) Earth", "B) Venus", "C) Mars", "D) Jupiter"] },
    { q: "2^3 equals?", a: "B", options: ["A) 4", "B) 8", "C) 6", "D) 10"] },
    { q: "Square root of 64?", a: "A", options: ["A) 8", "B) 6", "C) 7", "D) 9"] },
    { q: "Chemical symbol for gold?", a: "C", options: ["A) Ag", "B) Fe", "C) Au", "D) Hg"] },
    { q: "How many continents?", a: "B", options: ["A) 5", "B) 7", "C) 6", "D) 8"] },
    { q: "Fastest land animal?", a: "A", options: ["A) Cheetah", "B) Lion", "C) Deer", "D) Horse"] },
    { q: "Largest ocean?", a: "D", options: ["A) Atlantic", "B) Indian", "C) Arctic", "D) Pacific"] },
    { q: "Author of Harry Potter?", a: "B", options: ["A) Tolkien", "B) Rowling", "C) Martin", "D) Dickens"] }
];

let userAnswers = Array(questions.length).fill(null);

function createQuizContainer() {
    let container = document.createElement("div");
    container.style.cssText = `
        width: 90%;
        max-width: 600px;
        margin: 40px auto;
        padding: 20px;
        border-radius: 8px;
        background: #f5f7fa;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    return container;
}

function createWelcomeScreen() {
    let screen = document.createElement("div");
    screen.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 15px;
    `;
    let title = document.createElement("h1");
    title.textContent = "🌟 Welcome to the Quiz Challenge! 🌟";
    title.style.cssText = `
        margin: 0 0 15px 0;
        color: #2c3e50;
        text-align: center;
        font-size: 24px;
    `;
    screen.appendChild(title);
    return screen;
}

function createNameInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.id = "nameInput";
    input.placeholder = "Name";
    input.style.cssText = `
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    `;
    return input;
}

function createEmailInput() {
    let input = document.createElement("input");
    input.type = "email";
    input.id = "emailInput";
    input.placeholder = "Email";
    input.style.cssText = `
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    `;
    return input;
}

function createGenderSelect() {
    let select = document.createElement("select");
    select.id = "genderInput";
    select.innerHTML = `
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    `;
    select.style.cssText = `
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    `;
    return select;
}

function createDobInput() {
    let input = document.createElement("input");
    input.type = "date";
    input.id = "dobInput";
    input.style.cssText = `
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    `;
    return input;
}

function createStartButton() {
    let button = document.createElement("button");
    button.textContent = "Start Quiz Now";
    button.id = "startBtn";
    button.style.cssText = `
        padding: 12px;
        background: #6c5ce7;
        color: white;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
    `;
    button.onclick = function () {
        const name = document.getElementById('nameInput').value;
        const dob = document.getElementById('dobInput').value;

        if (name && dob) {
            userData = {
                name,
                email: document.getElementById('emailInput').value,
                gender: document.getElementById('genderInput').value,
                dob,
                age: calculateAge(dob)
            };
            QuizContainer.removeChild(WelcomeScreen);
            showQuizScreen();
        } else {
            alert("Please enter name and date of birth");
        }
    };
    return button;
}

function showQuizScreen() {
    if (currentQuestion >= questions.length) {
        showResultScreen();
        return;
    }

    let q = questions[currentQuestion];
    QuizContainer.innerHTML = '';

    let userInfo = document.createElement('div');
    userInfo.textContent = `User: ${userData.name} | Age: ${userData.age}`;
    QuizContainer.appendChild(userInfo);

    let qInfo = document.createElement('h3');
    qInfo.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    QuizContainer.appendChild(qInfo);

    let qText = document.createElement('h2');
    qText.textContent = q.q;
    QuizContainer.appendChild(qText);

    q.options.forEach((option, index) => {
        let optionBtn = document.createElement('button');
        optionBtn.textContent = option;
        optionBtn.style.cssText = `
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            text-align: left;
        `;
        optionBtn.onclick = function () {
            selectAnswer(index);
        };
        QuizContainer.appendChild(optionBtn);
    });
}

function selectAnswer(answerIndex) {
    userAnswers[currentQuestion] = answerIndex;
    currentQuestion++;
    showQuizScreen();
}

function showResultScreen() {
    let score = 0;
    const results = questions.map((q, i) => {
        const correctIndex = q.a.charCodeAt(0) - 65;
        const isCorrect = userAnswers[i] === correctIndex;
        if (isCorrect) score++;
        return { questionNum: i + 1, correct: isCorrect };
    });

    let resultsHTML = results.map(r => `
        <div style="
            padding: 8px;
            margin: 5px 0;
            background: ${r.correct ? '#e8f5e9' : '#ffebee'};
            border-radius: 4px;
        ">
            Question ${r.questionNum}: ${r.correct ? '✔️ Correct' : '❌ Incorrect'}
        </div>
    `).join('');

    QuizContainer.innerHTML = `
        <h1 style="text-align: center;">Quiz Results</h1>
        <div style="
            padding: 15px;
            background: white;
            border-radius: 4px;
            margin-bottom: 15px;
        ">
            <h2 style="text-align: center;">Score: ${score}/${questions.length}</h2>
            ${resultsHTML}
        </div>
    `;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function calculateAge(dob) {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}