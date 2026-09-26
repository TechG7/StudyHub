/* ====================================================
   1. NCERT & DIGITAL LIBRARY DATA & FILTERING
   ==================================================== */
const resourcesData = [
    { id: 1, class: 'Class 10', subject: 'Science', title: 'Chemical Reactions & Equations', type: 'NCERT & Hand Notes', badge: 'Popular' },
    { id: 2, class: 'Class 10', subject: 'Physics', title: 'Electricity - Full Chapter Formula Sheet', type: 'Formula Sheet', badge: 'PYQ Included' },
    { id: 3, class: 'Class 10', subject: 'Maths', title: 'Trigonometry Concept & PYQs (2015-2025)', type: 'PYQ Set', badge: 'High Yield' },
    { id: 4, class: 'Class 12', subject: 'Physics', title: 'Electrostatics & Electric Potential', type: 'Handwritten Notes', badge: 'Board Ready' },
    { id: 5, class: 'Class 12', subject: 'Chemistry', title: 'Organic Chemistry Reactions Summary', type: 'Short Notes', badge: 'Must Read' },
    { id: 6, class: 'JEE/NEET', subject: 'Physics', title: 'Laws of Motion & Friction Advanced Problems', type: 'Mock Test', badge: 'JEE Level' },
    { id: 7, class: 'Class 9', subject: 'Science', title: 'Matter in Our Surroundings Notes', type: 'NCERT PDF', badge: 'Revision' },
    { id: 8, class: 'Class 8', subject: 'Maths', title: 'Linear Equations in One Variable', type: 'Solutions', badge: 'Basic' },
    { id: 9, class: 'Class 1', subject: 'Rhymes & English', title: 'Alphabet Phonics & Animal Stories Cards', type: 'Kids Card', badge: 'Junior' }
];

const classesList = ['All', 'Class 1', 'Class 8', 'Class 9', 'Class 10', 'Class 12', 'JEE/NEET'];
let activeClassFilter = 'All';

function renderClassFilters() {
    const container = document.getElementById('classFilterContainer');
    if (!container) return;
    
    container.innerHTML = classesList.map(c => `
        <button onclick="filterClass('${c}')" class="px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${activeClassFilter === c ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'}">
            ${c}
        </button>
    `).join('');
}

function filterClass(className) {
    activeClassFilter = className;
    renderClassFilters();
    renderResources();
}

function renderResources() {
    const grid = document.getElementById('resourcesGrid');
    const searchInput = document.getElementById('searchInput');
    if (!grid || !searchInput) return;

    const searchQuery = searchInput.value.toLowerCase().trim();

    const filtered = resourcesData.filter(item => {
        const matchesClass = activeClassFilter === 'All' || item.class === activeClassFilter;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery) || item.subject.toLowerCase().includes(searchQuery) || item.class.toLowerCase().includes(searchQuery);
        return matchesClass && matchesSearch;
    });

    if(filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-8 text-center text-slate-500 text-sm"><i class="fa-solid fa-folder-open text-2xl mb-2 block"></i> No notes found for this category or search keyword.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(item => `
        <div class="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-violet-500/40 transition flex flex-col justify-between">
            <div>
                <div class="flex items-center justify-between mb-2">
                    <span class="bg-violet-500/10 text-violet-400 text-[10px] font-bold px-2 py-0.5 rounded border border-violet-500/20">${item.class} • ${item.subject}</span>
                    <span class="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded">${item.badge}</span>
                </div>
                <h4 class="font-bold text-white text-sm mb-1">${item.title}</h4>
                <p class="text-slate-400 text-xs mb-4"><i class="fa-regular fa-file-lines mr-1"></i> ${item.type}</p>
            </div>
            <div class="flex items-center space-x-2 pt-3 border-t border-slate-800/80">
                <button onclick="alert('Opening ${item.title} PDF viewer...')" class="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-1.5 rounded-lg text-xs transition flex items-center justify-center space-x-1">
                    <i class="fa-regular fa-eye"></i>
                    <span>Read Notes</span>
                </button>
                <button onclick="alert('Downloading ${item.title} PDF...')" class="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 p-1.5 rounded-lg text-xs transition">
                    <i class="fa-solid fa-download"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function searchResources() {
    renderResources();
}

/* ====================================================
   2. INTERACTIVE PRACTICE QUIZ ENGINE
   ==================================================== */
const quizQuestions = [
    {
        category: 'Class 10 Science',
        question: 'What is the chemical formula of Rust (Rusted Iron)?',
        options: ['Fe2O3 · xH2O', 'FeSO4', 'FeCl3', 'FeO'],
        correct: 0
    },
    {
        category: 'Class 12 Physics',
        question: 'What is the SI unit of Electric Charge?',
        options: ['Volt', 'Coulomb', 'Ampere', 'Ohm'],
        correct: 1
    },
    {
        category: 'Class 10 Maths',
        question: 'What is the value of sin(90°)?',
        options: ['0', '1/2', '1', 'Undefined'],
        correct: 2
    },
    {
        category: 'General Science',
        question: 'Which gas is absorbed by plants during Photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        correct: 2
    }
];

let currentQuizIndex = 0;
let score = 0;
let answerSelected = false;

function loadQuestion() {
    answerSelected = false;
    const q = quizQuestions[currentQuizIndex];
    
    document.getElementById('quizCategory').innerText = `Category: ${q.category}`;
    document.getElementById('quizQuestionCount').innerText = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;
    document.getElementById('quizQuestionText').innerText = q.question;
    document.getElementById('quizFeedback').innerText = '';
    document.getElementById('nextQuizBtn').classList.add('hidden');

    const optionsContainer = document.getElementById('quizOptionsContainer');
    optionsContainer.innerHTML = q.options.map((opt, idx) => `
        <button onclick="selectQuizOption(${idx})" class="w-full text-left bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 p-3 rounded-xl text-xs sm:text-sm text-slate-200 transition font-medium flex items-center justify-between" id="opt-${idx}">
            <span>${opt}</span>
            <i class="fa-regular fa-circle text-slate-500" id="icon-${idx}"></i>
        </button>
    `).join('');
}

function selectQuizOption(index) {
    if (answerSelected) return;
    answerSelected = true;

    const q = quizQuestions[currentQuizIndex];
    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');

    if (index === q.correct) {
        score++;
        document.getElementById(`opt-${index}`).className = "w-full text-left bg-emerald-500/20 border border-emerald-500/50 p-3 rounded-xl text-xs sm:text-sm text-emerald-300 transition font-semibold flex items-center justify-between";
        document.getElementById(`icon-${index}`).className = "fa-solid fa-circle-check text-emerald-400";
        feedback.innerHTML = "<span class='text-emerald-400'>✨ Sahi Jawab! (+1 Point)</span>";
    } else {
        document.getElementById(`opt-${index}`).className = "w-full text-left bg-red-500/20 border border-red-500/50 p-3 rounded-xl text-xs sm:text-sm text-red-300 transition font-semibold flex items-center justify-between";
        document.getElementById(`icon-${index}`).className = "fa-solid fa-circle-xmark text-red-400";
        
        // Highlight correct option
        document.getElementById(`opt-${q.correct}`).className = "w-full text-left bg-emerald-500/20 border border-emerald-500/50 p-3 rounded-xl text-xs sm:text-sm text-emerald-300 transition font-semibold flex items-center justify-between";
        feedback.innerHTML = `<span class='text-red-400'>❌ Galat! Sahi answer tha: ${q.options[q.correct]}</span>`;
    }

    document.getElementById('quizScoreBadge').innerText = `Score: ${score} / ${quizQuestions.length}`;
    nextBtn.classList.remove('hidden');
}

function nextQuestion() {
    if (currentQuizIndex < quizQuestions.length - 1) {
        currentQuizIndex++;
        loadQuestion();
    } else {
        // Quiz completed view
        document.getElementById('quizContainer').innerHTML = `
            <div class="text-center py-8">
                <div class="w-16 h-16 bg-violet-600/20 text-violet-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-violet-500/30">
                    🏆
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
                <p class="text-slate-400 text-sm mb-6">Aapka Total Score: <strong class="text-violet-400 text-lg">${score} / ${quizQuestions.length}</strong></p>
                <button onclick="resetQuiz()" class="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition">
                    <i class="fa-solid fa-rotate-right mr-1.5"></i> Try Again
                </button>
            </div>
        `;
    }
}

function resetQuiz() {
    currentQuizIndex = 0;
    score = 0;
    document.getElementById('quizScoreBadge').innerText = `Score: 0 / ${quizQuestions.length}`;
    document.getElementById('quizContainer').innerHTML = `
        <div class="flex items-center justify-between text-xs text-slate-400 mb-3">
            <span id="quizCategory">Category</span>
            <span id="quizQuestionCount">Question</span>
        </div>
        <h3 id="quizQuestionText" class="text-base sm:text-lg font-bold text-white mb-6"></h3>
        <div id="quizOptionsContainer" class="space-y-3 mb-6"></div>
        <div class="flex items-center justify-between pt-4 border-t border-slate-800">
            <p id="quizFeedback" class="text-xs font-semibold h-5"></p>
            <button id="nextQuizBtn" onclick="nextQuestion()" class="hidden bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition">
                Next Question <i class="fa-solid fa-arrow-right ml-1"></i>
            </button>
        </div>
    `;
    loadQuestion();
}

/* ====================================================
   3. POMODORO TIMER LOGIC
   ==================================================== */
let timerInterval;
let timeLeft = 25 * 60;
let isTimerRunning = false;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            alert("Focus Time Completed! Take a 5 minute break 🎉");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timeLeft = 25 * 60;
    updateTimerDisplay();
}

/* ====================================================
   4. AMBIENT FOCUS AUDIO SYNTHESIZER
   ==================================================== */
let audioCtx = null;
let currentNoiseNode = null;

function toggleSound(type) {
    stopSound();

    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        if (type === 'rain') {
            output[i] = (Math.random() * 2 - 1) * 0.08;
        } else if (type === 'white') {
            output[i] = (Math.random() * 2 - 1) * 0.03;
        } else {
            output[i] = Math.sin(i * 0.01) * 0.02;
        }
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;
    whiteNoise.connect(audioCtx.destination);
    whiteNoise.start();

    currentNoiseNode = whiteNoise;
    document.getElementById('audioStatusBadge').innerText = `Playing: ${type.toUpperCase()}`;
    document.getElementById('audioStatusBadge').className = 'text-[10px] text-cyan-400 font-bold';
}

function stopSound() {
    if (currentNoiseNode) {
        currentNoiseNode.stop();
        currentNoiseNode = null;
    }
    document.getElementById('audioStatusBadge').innerText = 'Status: Stopped';
    document.getElementById('audioStatusBadge').className = 'text-[10px] text-slate-500 font-mono';
}

/* ====================================================
   5. AGE-ADAPTIVE TAB SWITCHER
   ==================================================== */
function switchTab(hub) {
    ['junior', 'senior', 'pro'].forEach(tab => {
        const content = document.getElementById('content-' + tab);
        const btn = document.getElementById('tab-' + tab);
        if (tab === hub) {
            content.classList.remove('hidden');
            btn.className = "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition bg-violet-600 text-white";
        } else {
            content.classList.add('hidden');
            btn.className = "px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition text-slate-400 hover:text-white";
        }
    });
}

/* ====================================================
   6. GEMINI AI DOUBT SOLVER MODAL LOGIC
   ==================================================== */
let geminiApiKey = localStorage.getItem('studyhub_gemini_key') || '';
let selectedBase64Image = null;

function setApiKey() {
    const key = prompt("Google Gemini API Key enter karein (Aap Google AI Studio se free me le sakte hain):", geminiApiKey);
    if (key !== null) {
        geminiApiKey = key.trim();
        localStorage.setItem('studyhub_gemini_key', geminiApiKey);
        updateApiKeyUI();
    }
}

function updateApiKeyUI() {
    const statusBtn = document.getElementById('apiKeyStatus');
    if (!statusBtn) return;

    if (geminiApiKey) {
        statusBtn.innerText = 'Key Active ✅';
        statusBtn.className = 'text-emerald-400 font-semibold';
    } else {
        statusBtn.innerText = 'Add Key (Optional)';
        statusBtn.className = 'text-violet-400 hover:underline font-semibold';
    }
}

function handleImageSelect(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('fileName').innerText = file.name.substring(0, 10) + '...';
        const reader = new FileReader();
        reader.onload = function(e) {
            selectedBase64Image = e.target.result.split(',')[1];
            document.getElementById('imagePreview').src = e.target.result;
            document.getElementById('imagePreviewContainer').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removeSelectedImage() {
    selectedBase64Image = null;
    document.getElementById('imageInput').value = '';
    document.getElementById('fileName').innerText = 'Upload Photo';
    document.getElementById('imagePreviewContainer').classList.add('hidden');
}

function openDoubtModal() {
    document.getElementById('doubtModal').classList.remove('hidden');
}

function closeDoubtModal() {
    document.getElementById('doubtModal').classList.add('hidden');
}

async function solveDoubt() {
    const text = document.getElementById('doubtInput').value.trim();
    if(!text && !selectedBase64Image) {
        return alert("Kripya apna sawal likhein ya photo upload karein!");
    }
    
    const resultDiv = document.getElementById('doubtResult');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = "<div class='flex items-center space-x-2 text-violet-400 font-semibold'><i class='fa-solid fa-spinner animate-spin'></i> <span>Analyzing question & generating step-by-step solution...</span></div>";

    if (geminiApiKey) {
        try {
            const parts = [];
            if (text) parts.push({ text: `Answer this student doubt clearly with steps, formulas, and real examples in easy language: ${text}` });
            if (selectedBase64Image) {
                parts.push({
                    inline_data: {
                        mime_type: "image/jpeg",
                        data: selectedBase64Image
                    }
                });
            }

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: parts }] })
            });

            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                let formattedText = data.candidates[0].content.parts[0].text
                    .replace(/\n/g, '<br>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-violet-300">$1</strong>');
                resultDiv.innerHTML = `<div class="prose prose-invert">${formattedText}</div>`;
            } else {
                throw new Error("Invalid API Response");
            }
        } catch (err) {
            resultDiv.innerHTML = `<span class="text-red-400"><strong>API Error:</strong> Please check your Gemini API key or try again.</span>`;
        }
    } else {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="space-y-2">
                    <span class="bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded text-[10px] font-bold">Smart AI Solver</span>
                    <h4 class="font-bold text-white text-sm">Question: "${text || 'Uploaded Question Image'}"</h4>
                    <hr class="border-slate-800 my-2">
                    <p class="text-slate-300"><strong class="text-violet-400">Step 1 (Core Concept):</strong> Main formula aur principles ko identify karna.</p>
                    <p class="text-slate-300"><strong class="text-violet-400">Step 2 (Explanation):</strong> Question ko simplify karke step-by-step calculate karna.</p>
                    <p class="text-slate-300"><strong class="text-violet-400">Step 3 (Conclusion):</strong> Final answer aur practical applications.</p>
                    <div class="mt-3 p-2 bg-slate-950/60 rounded border border-slate-800 text-amber-300 text-[11px]">
                        💡 <em>Tip: Top-right button se apni free Gemini API Key add karein for real-time AI solutions!</em>
                    </div>
                </div>
            `;
        }, 1000);
    }
}

/* ====================================================
   7. INITIALIZATION ON PAGE LOAD
   ==================================================== */
document.addEventListener('DOMContentLoaded', () => {
    renderClassFilters();
    renderResources();
    loadQuestion();
    updateApiKeyUI();
});
