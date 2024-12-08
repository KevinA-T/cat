// survey-script.js
document.getElementById("surveyForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
  
    // Gather survey data
    const studyDuration = parseInt(document.getElementById("studyDuration").value);
    const studyTechnique = document.getElementById("studyTechnique").value;
    const productiveTime = document.getElementById("productiveTime").value;
  
    // Generate recommendations
    let recommendation = `Based on your preferences, we recommend the following: \n`;
  
    // Study Technique
    recommendation += `- Study Technique: ${studyTechnique === "pomodoro" ? "Pomodoro (focus for 25 minutes and take 5-minute breaks)" : studyTechnique === "block-study" ? "Block Study (study in 1-2 hour blocks)" : "A mix of both techniques for variety."}\n`;
  
    // Study Duration
    recommendation += `- Session Duration: ${studyDuration} minutes per session.\n`;
  
    // Productive Time
    recommendation += `- Best Time to Study: ${productiveTime}.\n`;
  
    // Display recommendations
    document.getElementById("recommendationText").textContent = recommendation;
    document.getElementById("recommendation-container").style.display = "block";
  });
  