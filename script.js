const questions = [
    { question: "사람들과 함께 있을 때 에너지를 얻습니까?", typeA: 'E', typeB: 'I' },
    { question: "구체적인 사실을 선호합니까, 아니면 추상적인 아이디어를 선호합니까?", typeA: 'S', typeB: 'N' },
    { question: "논리적으로 결정하는 것을 선호합니까, 아니면 감정을 고려합니까?", typeA: 'T', typeB: 'F' },
    { question: "계획을 세우는 것이 중요하다고 생각합니까?", typeA: 'J', typeB: 'P' },
    // 추가 질문을 여기에 추가할 수 있습니다.
];

function loadQuestions() {
    const questionContainer = document.getElementById('questions');
    questions.forEach((q, index) => {
        const questionHtml = `
            <p>${q.question}</p>
            <label><input type="radio" name="question_${index}" value="1"> ${q.typeA}</label><br>
            <label><input type="radio" name="question_${index}" value="2"> ${q.typeB}</label><br>
        `;
        questionContainer.innerHTML += questionHtml;
    });
}

document.getElementById('mbti-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    questions.forEach((q, index) => {
        const answer = document.querySelector(`input[name="question_${index}"]:checked`);
        if (answer) {
            if (answer.value === '1') {
                scores[q.typeA] += 1;
            } else {
                scores[q.typeB] += 1;
            }
        }
    });

    const personality = [
        (scores['E'] > scores['I'] ? 'E' : 'I'),
        (scores['S'] > scores['N'] ? 'S' : 'N'),
        (scores['T'] > scores['F'] ? 'T' : 'F'),
        (scores['J'] > scores['P'] ? 'J' : 'P')
    ].join('');

    document.getElementById('mbti-result').textContent = personality;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('mbti-form').classList.add('hidden');
});

function restart() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('mbti-form').classList.remove('hidden');
}

loadQuestions();
