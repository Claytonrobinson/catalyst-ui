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
      labels: ['Iter 1', 'Iter 2', 'Iter 3', 'Iter 4', 'Iter 5', 'Iter 6', 'Iter 7', 'Iter 8'],
      datasets: [{
        label: 'Yield (%)',
        data: [60, 68, 75, 79, 82, 83, 83.8, 84.2],
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.2)',
        borderWidth: 3,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: false, min: 50, max: 90, title: { display: true, text: 'Yield (%)' }}}
    }
  });
}
