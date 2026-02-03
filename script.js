function searchLiterature() {
  const query = document.getElementById('searchQuery').value.trim();
  const results = document.getElementById('results');

  if (!query) {
    results.innerHTML = '<li>Please enter a search query</li>';
    return;
  }

  results.innerHTML = '<li>Loading... (mock mode)</li>';

  setTimeout(() => {
    results.innerHTML = `
      <li><strong>Mock: AI-Screened Ni-W/ZrO₂ for SAF</strong> (2024) - Bayesian opt boosted C10+ yields</li>
      <li><strong>Mock: Polymetallic Oxides Hydrodeoxygenation</strong> (2023) - Ni promoter on WO₃/ZrO₂</li>
      <li><strong>Mock: ML for Catalyst Optimization</strong> (${query} match) - Higher heating value improvement</li>
    `;
  }, 800);
}

function runOptimization() {
  const canvas = document.getElementById('yieldChart');
  if (!canvas) {
    alert("Canvas not found – check HTML for id='yieldChart'");
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    alert("Canvas context failed");
    return;
  }

  const metal = document.getElementById('metal')?.value.trim() || 'Base Catalyst';
  const iterations = parseInt(document.getElementById('iterations')?.value) || 8;

  // Destroy old chart safely
  if (window.myChart && typeof window.myChart.destroy === 'function') {
    window.myChart.destroy();
  }

  // Mock data generation
  const labels = Array.from({length: iterations}, (_, i) => `Iter ${i+1}`);
  const data = [];
  let yieldVal = 55 + Math.random() * 5;
  for (let i = 0; i < iterations; i++) {
    yieldVal += Math.random() * 3 + 1.5;
    yieldVal = Math.min(yieldVal, 92);
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
        maintainAspectRatio: false,   // Critical: allows height to fill wrapper
        scales: {
          y: { min: 50, max: 95, title: { display: true, text: 'Yield (%)' } }
        },
        plugins: { legend: { position: 'top' } }
      }
    });
  } catch (err) {
    console.error("Chart failed:", err);
    alert("Chart error – see console (F12)");
  }
}
