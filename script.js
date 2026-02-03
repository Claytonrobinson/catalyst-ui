async function searchLiterature() {
  const queryInput = document.getElementById('searchQuery');
  const resultsList = document.getElementById('results');
  const status = document.getElementById('searchStatus');
  const btn = document.getElementById('searchBtn');
  const query = queryInput.value.trim();

  if (!query) {
    status.textContent = 'Enter a search query';
    status.className = 'status error';
    return;
  }

  // Loading state
  status.innerHTML = '<span class="spinner"></span> Searching...';
  status.className = 'status loading';
  resultsList.innerHTML = '';
  btn.disabled = true;
  queryInput.disabled = true;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  try {
    // Enhanced mock results (project-relevant "papers")
    const mockPapers = [
      { title: "AI-Screened Ni-WO₃/ZrO₂ Catalysts for Biomass to SAF", snippet: "Bayesian optimization improved C10+ yields by 25% in oligosaccharide conversion.", year: 2024 },
      { title: "Brønsted/Lewis Acid Sites in Polymetallic Oxides for Hydrodeoxygenation", snippet: "ZrO₂-supported W/Ni with Mo promoter shows high deoxygenation selectivity.", year: 2023 },
      { title: "Machine Learning Acceleration of Catalyst Design for Sustainable Jet Fuel", snippet: "Screening of transition metal promoters on tungsten oxide supports.", year: 2025 },
      { title: "Two-Step Hydrothermal Conversion of Switchgrass to Hydrocarbons", snippet: "Dilute carboxylic acid hydrolysis followed by catalytic upgrading.", year: 2024 },
      { title: "Bayesian Optimization for Bio-Crude Yield Maximization", snippet: "Active ML loop increases >C10 fraction and HHV in SAF precursors.", year: 2024 }
    ];

    // "Filter" mock based on query (simple keyword match)
    const filtered = mockPapers.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.snippet.toLowerCase().includes(query.toLowerCase())
    );

    resultsList.innerHTML = '';
    if (filtered.length === 0) {
      resultsList.innerHTML = '<li>No matching results (backend pending)</li>';
    } else {
      filtered.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.title}</strong> (${item.year})<br>${item.snippet}`;
        resultsList.appendChild(li);
      });
    }

    status.textContent = `Found ${filtered.length} relevant result(s) (mock data)`;
    status.className = 'status';

  } catch (error) {
    status.textContent = `Error: ${error.message}`;
    status.className = 'status error';
    console.error(error);
  } finally {
    btn.disabled = false;
    queryInput.disabled = false;
  }
}

async function runOptimization() {
  const metalInput = document.getElementById('metal');
  const iterInput = document.getElementById('iterations');
  const btn = document.getElementById('optBtn');
  const status = document.getElementById('optStatus');
  const ctx = document.getElementById('yieldChart').getContext('2d');

  const metal = metalInput.value.trim() || 'Base Catalyst';
  const iterations = parseInt(iterInput.value) || 8;

  if (iterations < 1 || iterations > 20) {
    status.textContent = 'Iterations must be 1-20';
    status.className = 'status error';
    return;
  }

  // Loading
  status.innerHTML = '<span class="spinner"></span> Optimizing...';
  status.className = 'status loading';
  btn.disabled = true;
  metalInput.disabled = true;
  iterInput.disabled = true;

  if (window.myChart) window.myChart.destroy();

  // Simulate optimization (increasing yield with some randomness)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const labels = [];
  const data = [];
  let yield = 55 + Math.random() * 5; // Start around 55-60%
  for (let i = 1; i <= iterations; i++) {
    yield += Math.random() * 4 + 2; // Realistic increments
    yield = Math.min(yield, 92); // Cap
    labels.push(`Iter ${i}`);
    data.push(yield.toFixed(1));
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
      scales: { y: { beginAtZero: false, min: 50, max: 95, title: { display: true, text: 'Yield (%)' } } }
    }
  });

  status.textContent = `Optimization complete (${iterations} iterations)`;
  status.className = 'status';

  btn.disabled = false;
  metalInput.disabled = false;
  iterInput.disabled = false;
}
