// Sample Database
const database = {
    notes: [
        { title: "Chemical Reactions & Equations", class: "class10", subject: "Science" },
        { title: "Electricity - Formula Sheet", class: "class10", subject: "Physics" },
        { title: "Electrostatics & Potential", class: "class12", subject: "Physics" },
        { title: "Ray Optics & Optical Instruments", class: "class12", subject: "Physics" },
        { title: "JEE Physics Revision Notes", class: "jee", subject: "Physics" },
        { title: "NEET Organic Chemistry Notes", class: "jee", subject: "Chemistry" }
    ],
    books: [
        { title: "NCERT Class 10 Science Book", desc: "Complete Book PDF" },
        { title: "NCERT Class 12 Physics Part 1", desc: "Official NCERT Edition" },
        { title: "HC Verma Concepts of Physics", desc: "Reference Book Solutions" }
    ],
    pyqs: [
        { title: "Class 10 CBSE Board 2024 Science PYQ", desc: "Solved Question Paper" },
        { title: "Class 12 CBSE Physics 10 Year Paper", desc: "Chapter-wise Solved" },
        { title: "JEE Main 2023 Physics All Shifts", desc: "Answer Key Included" }
    ]
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    // Load saved Dark Mode preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        const themeBtn = document.getElementById("themeBtn");
        if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    loadHomeData();
    loadNotesData(database.notes);
    loadBooksData();
    loadPyqData();
    initQuizEngine();
});

// Dark Mode Toggle Function
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const themeBtn = document.getElementById("themeBtn");
    const isDark = document.body.classList.contains("dark-mode");

    if (isDark) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem("theme", "light");
    }
}

// Switch Views System (Page Navigation)
function switchView(viewId) {
    document.querySelectorAll(".page-view").forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add("active");
        window.scrollTo(0, 0);
    }

    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
    if (viewId === 'homeView') document.getElementById("navHome")?.classList.add("active");
    if (viewId === 'notesView') document.getElementById("navNotes")?.classList.add("active");
    if (viewId === 'quizView') document.getElementById("navQuiz")?.classList.add("active");
    if (viewId === 'aiView') document.getElementById("navAi")?.classList.add("active");
}

// Load Home Screen Content
function loadHomeData() {
    const homeGrid = document.getElementById("homeRecentGrid");
    if (!homeGrid) return;
    homeGrid.innerHTML = "";
    database.notes.slice(0, 4).forEach(item => {
        homeGrid.appendChild(createCard(item.title, `Class: ${item.class.toUpperCase()}`));
    });
}

// Load Notes Screen Content
function loadNotesData(items) {
    const grid = document.getElementById("fullNotesGrid");
    if (!grid) return;
    grid.innerHTML = "";
    if (items.length === 0) {
        grid.innerHTML = "<p>Koi notes nahi mile!</p>";
        return;
    }
    items.forEach(item => {
        grid.appendChild(createCard(item.title, `Category: ${item.class.toUpperCase()}`));
    });
}

// Load Books
function loadBooksData() {
    const grid = document.getElementById("booksGrid");
    if (!grid) return;
    grid.innerHTML = "";
    database.books.forEach(item => {
        grid.appendChild(createCard(item.title, item.desc));
    });
}

// Load PYQs
function loadPyqData() {
    const grid = document.getElementById("pyqGrid");
    if (!grid) return;
    grid.innerHTML = "";
    database.pyqs.forEach(item => {
        grid.appendChild(createCard(item.title, item.desc));
    });
}

// Reusable Card Generator
function createCard(title, desc) {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `
        <h4>${title}</h4>
        <p>${desc}</p>
        <button onclick="downloadPdf('${title}')"><i class="fa-solid fa-download"></i> View / Download PDF</button>
    `;
    return card;
}

// Search and Category Filter
function filterNotesCategory(category, btn) {
    document.querySelectorAll("#notesView .tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (category === 'all') {
        loadNotesData(database.notes);
    } else {
        const filtered = database.notes.filter(n => n.class === category);
        loadNotesData(filtered);
    }
}

function filterNotes() {
    const query = document.getElementById("notesSearch").value.toLowerCase();
    const filtered = database.notes.filter(n => n.title.toLowerCase().includes(query));
    loadNotesData(filtered);
}

// AI Assistant
function askFullAi() {
    const input = document.getElementById("fullAiInput");
    const chatBody = document.getElementById("fullChatBody");
    if (!input.value.trim()) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-msg";
    userMsg.innerText = input.value;
    chatBody.appendChild(userMsg);

    const question = input.value;
    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot-msg";
        botMsg.innerText = `AI Response: Aapne poochha "${question}". Iska solution bilkul simple hai, hamare NCERT Class Notes check karein!`;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 800);
}

// Quiz System
const quizQuestions = [
    { q: "Rusting of iron is which type of reaction?", options: ["Chemical Change", "Physical Change", "Reversible Change", "None"], ans: 0 },
    { q: "SI unit of Electric Resistance is?", options: ["Ampere", "Volt", "Ohm", "Watt"], ans: 2 }
];

function initQuizEngine() {
    const box = document.getElementById("quizBox");
    if (!box) return;
    let currentQ = 0;
    const q = quizQuestions[currentQ];
    
    box.innerHTML = `
        <h3>Question 1:</h3>
        <p style="margin:15px 0; font-weight:600;">${q.q}</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
            ${q.options.map((opt, i) => `<button style="padding:10px; border:1px solid #ccc; border-radius:8px; cursor:pointer;" onclick="checkAnswer(${i}, ${q.ans})">${opt}</button>`).join('')}
        </div>
    `;
}

function checkAnswer(sel, ans) {
    if (sel === ans) alert("Sahi Jawab! 🎉");
    else alert("Galat Jawab!");
}

// Timer
let mainTimer;
let mainTimeLeft = 1500;

function startMainTimer() {
    clearInterval(mainTimer);
    mainTimer = setInterval(() => {
        if (mainTimeLeft <= 0) {
            clearInterval(mainTimer);
            alert("Focus Time Over!");
        } else {
            mainTimeLeft--;
            updateTimerView();
        }
    }, 1000);
}

function pauseMainTimer() { clearInterval(mainTimer); }
function resetMainTimer() { clearInterval(mainTimer); mainTimeLeft = 1500; updateTimerView(); }

function updateTimerView() {
    const m = Math.floor(mainTimeLeft / 60);
    const s = mainTimeLeft % 60;
    document.getElementById("mainTimerDisplay").innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
}

function downloadPdf(title) {
    alert(`Opening PDF: ${title}`);
}
