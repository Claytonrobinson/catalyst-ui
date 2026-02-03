// Literature Search – Mock (your main task – swap fetch when backend ready)
function searchLiterature() {
  const query = document.getElementById('searchQuery').value.trim();
  const results = document.getElementById('results');

  if (!query) {
    results.innerHTML = '<li>Please enter a search query</li>';
    return;
  }

  results.innerHTML = '<li>Loading... (mock mode)</li>';

  // Simulate delay
  setTimeout(() => {
    results.innerHTML = `
      <li><strong>Mock Result 1:</strong> Ni-W/ZrO₂ Catalyst for SAF (2024) - Bayesian opt improved yield</li>
      <li><strong>Mock Result 2:</strong> Tungsten oxide with Ni promoter - Deoxygenation study</li>
      <li><strong>Mock Result 3:</strong> AI screening for polymetallic catalysts - ${query} related</li>
    `;
  }, 800);
}

// Catalyst Optimization – Fixed version with error catching
function runOptimization() {
  console.log("runOptimization called");  // Debug: check if function runs

  const metalInput = document.getElementById('metal');
  const iterInput = document.getElementById('iterations');
  const canvas = document.getElementById('yieldChart');

  if (!canvas) {
    console.error("Canvas element not found! Check <canvas id=\"yieldChart\">");
    alert("Error: Chart canvas missing. Check HTML ID.");
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error("Cannot get 2D context on canvas");
    alert("Error: Canvas context failed.");
    return;
  }

  const metal = metalInput?.value.trim() || 'Base Catalyst';
  const iterations = parseInt(iterInput?.value) || 8;

  console.log(`Optimizing for: ${metal}, ${iterations} iterations`);

  // Destroy old chart safely
  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
  }

  // Generate mock data
  const labels = [];
  const data = [];
  let yieldVal = 55 + Math.random() * 5;
  for (let i = 1; i <= iterations; i++) {
    yieldVal += Math.random() * 3 + 1.5;
    yieldVal = Math.min(yieldVal, 92);
    labels.push(`Iter ${i}`);
    data.push(yieldVal.toFixed(1));
  }

  try {
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: `${metal} Yield (%)`,
          data: data,
          borderColor: '#2e7d32',
          backgroundColor: 'rgba(46, 125, 50, 0.2)',
          borderWidth: 3,
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,  // Helps with sizing
        scales: {
          y: {
            beginAtZero: false,
            min: 50,
            max: 95,
            title: { display: true, text: 'Yield (%)' }
          }
        }
      }
    });

    console.log("Chart created successfully");
  } catch (err) {
    console.error("Chart creation failed:", err);
    alert("Chart error: " + err.message + "\nCheck console (F12).");
  }
}
