// Sample Data for Notes & Books
const notesData = [
    { title: "Chemical Reactions & Equations", class: "class10", type: "notes", link: "#" },
    { title: "Electricity - Formula Sheet", class: "class10", type: "notes", link: "#" },
    { title: "Electrostatics & Potential", class: "class12", type: "notes", link: "#" },
    { title: "Ray Optics & Optical Instruments", class: "class12", type: "notes", link: "#" },
    { title: "JEE Physics 10 Yr PYQ Paper", class: "jee", type: "pyq", link: "#" },
    { title: "NEET Chemistry Formula Book", class: "jee", type: "books", link: "#" }
];

// Initialize Notes on Load
document.addEventListener("DOMContentLoaded", () => {
    displayNotes(notesData);
    initQuiz();
});

// Render Notes Cards
function displayNotes(data) {
    const grid = document.getElementById("notesGrid");
    grid.innerHTML = "";

    if (data.length === 0) {
        grid.innerHTML = "<p style='grid-column: 1/-1; text-align:center;'>Koi notes nahi mile!</p>";
        return;
    }

    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "note-card";
        card.innerHTML = `
            <h4>${item.title}</h4>
            <p>Category: ${item.class.toUpperCase()}</p>
            <button onclick="openNoteLink('${item.title}')"><i class="fa-solid fa-download"></i> View / Download PDF</button>
        `;
        grid.appendChild(card);
    });
}

// Filter Notes by Category Tab
function filterTab(category, btn) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (category === "all") {
        displayNotes(notesData);
    } else {
        const filtered = notesData.filter(item => item.class === category);
        displayNotes(filtered);
    }
}

// Search Filter
function filterContent() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = notesData.filter(item => item.title.toLowerCase().includes(query));
    displayNotes(filtered);
}

// Modal Toggle Functions
function openAiModal() { document.getElementById("aiModal").style.display = "flex"; }
function openQuizModal() { document.getElementById("quizModal").style.display = "flex"; }
function openFocusModal() { document.getElementById("focusModal").style.display = "flex"; }

function closeModal(id) {
    document.getElementById(id).style.display = "none";
}

// AI Doubt Solver Simulation
function askAi() {
    const input = document.getElementById("aiInput");
    const chatBody = document.getElementById("chatBody");

    if (!input.value.trim()) return;

    // Add User Message
    const userDiv = document.createElement("div");
    userDiv.className = "user-msg";
    userDiv.innerText = input.value;
    chatBody.appendChild(userDiv);

    const question = input.value;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate AI Response
    setTimeout(() => {
        const botDiv = document.createElement("div");
        botDiv.className = "bot-msg";
        botDiv.innerText = `AI Response: Aapne poochha "${question}". Iska detail answer aapke NCERT Chapter section mein available hai!`;
        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Quiz System
const quizQuestions = [
    { q: "What is the chemical formula of Rust?", options: ["Fe2O3.xH2O", "FeSO4", "FeCl3", "FeO"], ans: 0 },
    { q: "SI unit of Electric Current is?", options: ["Volt", "Ampere", "Ohm", "Watt"], ans: 1 }
];

function initQuiz() {
    const quizBody = document.getElementById("quizBody");
    let currentQ = 0;

    function renderQuestion() {
        const q = quizQuestions[currentQ];
        quizBody.innerHTML = `
            <p><strong>Q${currentQ + 1}: ${q.q}</strong></p>
            <div style="margin-top:10px; display:flex; flex-direction:column; gap:8px;">
                ${q.options.map((opt, idx) => `<button style="padding:10px; border:1px solid #ccc; border-radius:8px; text-align:left; background:white; cursor:pointer;" onclick="checkAns(${idx}, ${q.ans})">${opt}</button>`).join('')}
            </div>
        `;
    }
    renderQuestion();
}

function checkAns(selected, correct) {
    if (selected === correct) {
        alert("Sahi Jawab! 🎉");
    } else {
        alert("Galat Jawab! Sahi uttar hai option " + (correct + 1));
    }
}

// Pomodoro Timer Logic
let timer;
let timeLeft = 1500; // 25 min

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Focus time complete!");
        } else {
            timeLeft--;
            updateTimerDisplay();
        }
    }, 1000);
}

function pauseTimer() { clearInterval(timer); }
function resetTimer() { clearInterval(timer); timeLeft = 1500; updateTimerDisplay(); }

function updateTimerDisplay() {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    document.getElementById("timerDisplay").innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function scrollToNotes() {
    document.getElementById("notesSection").scrollIntoView({ behavior: 'smooth' });
}

function openNoteLink(title) {
    alert(`Downloading / Opening PDF for: ${title}`);
}

function navClick(element) {
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    element.classList.add("active");
                  }
