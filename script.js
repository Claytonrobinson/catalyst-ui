function searchLiterature() {
  const query = document.getElementById('searchQuery').value;
  const results = document.getElementById('results');
  results.innerHTML = query ? `<li>Simulated result for: ${query}</li>` : '<li>Enter a query to search</li>';
}

function runOptimization() {
  const ctx = document.getElementById('yieldChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Iter 1', 'Iter 2', 'Iter 3'],
      datasets: [{ 
        label: 'Yield (%)',
        data: [60, 75, 80],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        borderWidth: 2,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, title: { display: true, text: 'Yield (%)' } } },
      plugins: { legend: { position: 'top', labels: { boxWidth: 10 } } }
    }
  });
}