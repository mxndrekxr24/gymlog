/* WEEKLY SPLIT */
const split = {
  Monday: "Chest & Triceps",
  Tuesday: "Back & Biceps",
  Wednesday: "Shoulder & Abs",
  Thursday: "Chest & Triceps",
  Friday: "Back & Biceps",
  Saturday: "Legs",
  Sunday: "Rest & Stretching"
};

/* TAB SWITCH */
function openTab(id, btn) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

/* WORKOUTS */
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function saveWorkout() {
  workouts.push({
    date: document.getElementById("date").value,
    exercise: document.getElementById("exercise").value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value,
    time: document.getElementById("time").value
  });

  localStorage.setItem("workouts", JSON.stringify(workouts));
  updateWorkoutRing();
  showHistory();
  alert("Workout Saved 💪");
}

/* WORKOUT PROGRESS RING */
function updateWorkoutRing() {
  const total = 6;
  const done = workouts.length;
  const percent = Math.min(Math.round((done / total) * 100), 100);
  const deg = (percent / 100) * 360;

  document.getElementById("workoutRing").style.background =
    `conic-gradient(#9dff00 ${deg}deg, #222 ${deg}deg)`;

  document.getElementById("workoutPercent").innerText = percent + "%";
  document.getElementById("workoutCount").innerText = `${done} / ${total} workouts`;
}

/* HISTORY */
function showHistory() {
  const h = document.getElementById("history");
  h.innerHTML = "";

  workouts.forEach(w => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${w.exercise}</b><br>
      ${w.sets} x ${w.reps} • ${w.weight}kg<br>
      ⏱ ${w.time} min
    `;
    h.appendChild(li);
  });
}

/* WATER */
let water = parseInt(localStorage.getItem("water")) || 0;
const goal = 3000;

function addWater() {
  water += 250;
  if (water > goal) water = goal;
  localStorage.setItem("water", water);
  updateWaterRing();
}

function resetWater() {
  water = 0;
  localStorage.setItem("water", water);
  updateWaterRing();
}

function updateWaterRing() {
  const percent = Math.round((water / goal) * 100);
  const deg = (percent / 100) * 360;

  document.getElementById("waterRing").style.background =
    `conic-gradient(#9dff00 ${deg}deg, #222 ${deg}deg)`;

  document.getElementById("waterPercent").innerText = percent + "%";
  document.getElementById("waterText").innerText = `${water} / 3000 ml`;
}

/* TODAY WORKOUT */
function showToday() {
  const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
  document.getElementById("todayWorkout").innerText =
    `Today: ${day} — ${split[day]}`;
}

showToday();
updateWorkoutRing();
updateWaterRing();
showHistory();
