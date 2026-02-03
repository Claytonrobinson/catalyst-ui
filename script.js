function searchLiterature() {
  const queryInput = document.getElementById('searchQuery');
  const results = document.getElementById('results');
  const query = queryInput.value.trim();

  if (!query) {
    results.innerHTML = '<li>Enter a query to search (mock mode)</li>';
    return;
  }

  results.innerHTML = '<li>Loading... (mock simulation)</li>';

  // Fake delay for realism
  setTimeout(() => {
    // Project-relevant mock results (filtered loosely)
    const mocks = [
      { title: "AI-Screened Ni-W/ZrO₂ Catalysts for Biomass to SAF", snippet: "Bayesian optimization increased C10+ fraction by 25% in oligosaccharide upgrading.", year: 2024 },
      { title: "Brønsted/Lewis Acid Polymetallic Oxides on Zirconia Support", snippet: "Ni with secondary promoter shows high hydrogenation/deoxygenation selectivity.", year: 2023 },
      { title: "Machine Learning Accelerated Catalyst Design for Sustainable Jet Fuel", snippet: "Screening transition metals for WO₃-based systems.", year: 2025 },
      { title: "Two-Step Hydrothermal Conversion of Switchgrass and Miscanthus", snippet: "Dilute acid hydrolysis + catalytic upgrading to C5-C16 hydrocarbons.", year: 2024 }
    ];

    const filtered = mocks.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) || 
      m.snippet.toLowerCase().includes(query.toLowerCase())
    );

    results.innerHTML = filtered.length > 0 
      ? filtered.map(m => `<li><strong>${m.title}</strong> (${m.year})<br>${m.snippet}</li>`).join('')
      : '<li>No matching mock results – try "nickel" or "bayesian"</li>';
  }, 900);
}

function runOptimization() {
  const canvas = document.getElementById('yieldChart');
  if (!canvas) {
    console.error("Canvas #yieldChart not found");
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const metal = document.getElementById('metal')?.value.trim() || 'Catalyst';
  const iterations = parseInt(document.getElementById('iterations')?.value) || 8;

  // Safe destroy previous chart
  if (window.myChart && typeof window.myChart.destroy === 'function') {
    window.myChart.destroy();
  }

  // Generate mock rising yield data
  const labels = [];
  const data = [];
  let yieldVal = 58 + Math.random() * 4;
  for (let i = 1; i <= iterations; i++) {
    yieldVal += Math.random() * 3 + 1.2;
    yieldVal = Math.min(yieldVal, 91);
    labels.push(`Iter ${i}`);
    data.push(yieldVal.toFixed(1));
  }

  // Create stable chart
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${metal} Yield (%)`,
        data: data,
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.15)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,       // Allows filling wrapper without forcing ratio
      animation: { duration: 800 },     // Smooth but not bouncy
      scales: {
        y: {
          min: 50,
          max: 95,
          title: { display: true, text: 'Yield (%)' }
        }
      },
      plugins: {
        legend: { position: 'top' }
      }
    }
  });
}
