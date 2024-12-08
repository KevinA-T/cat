// progress-script.js

// DOM Elements
const studyForm = document.getElementById('studyForm');
const studyLogs = document.getElementById('studyLogs');
const progressChartCanvas = document.getElementById('progressChart');
let progressChart;

// Initialize study data
let studyData = JSON.parse(localStorage.getItem('studyData')) || [];

// Save study data to local storage
function saveStudyData() {
  localStorage.setItem('studyData', JSON.stringify(studyData));
}

// Render the study logs
function renderLogs() {
  studyLogs.innerHTML = '';
  studyData.forEach((session, index) => {
    const li = document.createElement('li');
    li.textContent = `${session.date}: ${session.subject} - ${session.duration} hours`;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.addEventListener('click', () => deleteSession(index));
    
    li.appendChild(deleteButton);
    studyLogs.appendChild(li);
  });
}

// Update the chart
function updateChart() {
  const subjectTotals = studyData.reduce((totals, session) => {
    if (!totals[session.subject]) {
      totals[session.subject] = 0;
    }
    totals[session.subject] += parseFloat(session.duration);
    return totals;
  }, {});
  
  const labels = Object.keys(subjectTotals);
  const data = Object.values(subjectTotals);

  if (progressChart) {
    progressChart.destroy();
  }

  progressChart = new Chart(progressChartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Hours Spent',
        data: data,
        backgroundColor: '#4a90e2',
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Add a new study session
studyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const subject = document.getElementById('subject').value;
  const duration = document.getElementById('duration').value;
  const date = document.getElementById('date').value;

  studyData.push({ subject, duration, date });
  saveStudyData();
  
  studyForm.reset();
  renderLogs();
  updateChart();
});

// Delete a session
function deleteSession(index) {
  studyData.splice(index, 1);
  saveStudyData();
  renderLogs();
  updateChart();
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  renderLogs();
  updateChart();
});
