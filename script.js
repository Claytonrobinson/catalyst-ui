function searchLiterature() {
  const query = document.getElementById('searchQuery').value.trim();
  const results = document.getElementById('results');

  if (!query) {
    results.innerHTML = '<li>Enter keywords like "nickel", "bayesian", or "ZrO2" to see mock results</li>';
    return;
  }

  results.innerHTML = '<li>Searching... (mock mode)</li>';

  setTimeout(() => {
    const mocks = [
      { title: "AI-Screened Ni-W/ZrO₂ Catalysts for SAF Production", snippet: "Bayesian optimization improved >C10 yields in oligosaccharide conversion.", year: 2024 },
      { title: "Polymetallic Oxide Catalysts with Ni Promoter on Zirconia", snippet: "High deoxygenation and hydrogenation performance for biomass upgrading.", year: 2023 },
      { title: "Machine Learning for Catalyst Optimization in Biofuels", snippet: "Screening secondary transition metals for WO₃-based systems.", year: 2025 },
      { title: "Hydrothermal Conversion of Switchgrass to Hydrocarbons", snippet: "Two-step process: acid hydrolysis + catalytic upgrading.", year: 2024 }
    ];

    const filtered = mocks.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase()) || m.snippet.toLowerCase().includes(query.toLowerCase())
    );

    results.innerHTML = filtered.length 
      ? filtered.map(m => `<li><strong>${m.title}</strong> (${m.year})<br>${m.snippet}</li>`).join('')
      : '<li>No strong matches – try broader terms like "catalyst" or "SAF"</li>';
  }, 800);
}

function runOptimization() {
  const canvas = document.getElementById('yieldChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const metal = document.getElementById('metal')?.value.trim() || 'Catalyst';
  const iterations = parseInt(document.getElementById('iterations')?.value) || 8;

  if (window.myChart && window.myChart.destroy) window.myChart.destroy();

  const labels = Array.from({length: iterations}, (_, i) => `Iter ${i+1}`);
  const data = [];
  let yieldVal = 58 + Math.random() * 4;
  for (let i = 0; i < iterations; i++) {
    yieldVal += Math.random() * 3 + 1.5;
    yieldVal = Math.min(yieldVal, 92);
    data.push(yieldVal.toFixed(1));
  }

  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `${metal} Yield (%)`,
        data,
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1000 },
      scales: { y: { min: 50, max: 95, title: { display: true, text: 'Yield (%)' } } },
      plugins: { legend: { position: 'top' } }
    }
  });
}
