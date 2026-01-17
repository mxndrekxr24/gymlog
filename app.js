let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let weights = JSON.parse(localStorage.getItem("weights")) || [];

function saveWorkout() {
  const workout = {
    date: document.getElementById("date").value,
    type: document.getElementById("workoutType").value,
    exercise: document.getElementById("customExercise").value || document.getElementById("exercise").value,
    sets: document.getElementById("sets").value,
    reps: document.getElementById("reps").value,
    weight: document.getElementById("weight").value,
    time: document.getElementById("time").value
  };

  workouts.push(workout);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  displayHistory();
  alert("Workout saved 💪");
}

function saveBodyWeight() {
  const weightEntry = {
    date: new Date().toLocaleDateString(),
    weight: document.getElementById("bodyWeight").value
  };

  weights.push(weightEntry);
  localStorage.setItem("weights", JSON.stringify(weights));
  alert("Body weight saved ⚖️");
}

function displayHistory() {
  const history = document.getElementById("history");
  history.innerHTML = "";

  workouts.forEach(w => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${w.date}</b> - ${w.type}<br>
      ${w.exercise}<br>
      ${w.sets}x${w.reps} @ ${w.weight}kg<br>
      ⏱ ${w.time} min
    `;
    history.appendChild(li);
  });
}

displayHistory();
