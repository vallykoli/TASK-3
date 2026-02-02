const quiz = [
  { q: "What does HTML stand for?", o: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language"], a: 0 },
  { q: "Which language is used for styling web pages?", o: ["HTML", "CSS", "JavaScript"], a: 1 },
  { q: "Which language runs in the browser?", o: ["Python", "JavaScript", "C++"], a: 1 },
  { q: "Which CSS layout is best for responsive design?", o: ["Table", "Float", "Flexbox"], a: 2 },
  { q: "What does API stand for?", o: ["Application Programming Interface", "Advanced Program Internet", "Applied Programming Info"], a: 0 }
];

let index = 0;
let score = 0;
let answered = false;

const question = document.getElementById("question");
const options = document.getElementById("options");
const counter = document.getElementById("counter");
const progressBar = document.getElementById("progressBar");

function loadQuestion() {
  answered = false;
  question.innerText = quiz[index].q;
  counter.innerText = `Question ${index + 1} / ${quiz.length}`;
  progressBar.style.width = `${((index) / quiz.length) * 100}%`;
  options.innerHTML = "";

  quiz[index].o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;

    btn.onclick = () => {
      if (answered) return;
      answered = true;

      if (i === quiz[index].a) {
        btn.classList.add("correct");
        score++;
      } else {
        btn.classList.add("wrong");
        options.children[quiz[index].a].classList.add("correct");
      }

      setTimeout(() => {
        index++;
        if (index < quiz.length) {
          loadQuestion();
        } else {
          localStorage.setItem("score", score);
          localStorage.setItem("total", quiz.length);
          window.location.href = "result.html";
        }
      }, 1000);
    };

    options.appendChild(btn);
  });
}

loadQuestion();
