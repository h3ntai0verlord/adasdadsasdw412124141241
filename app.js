import Chart from 'chart.js';

const btcChart = new Chart(document.getElementById('btc-chart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'BTC Price',
        data: [],
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        borderColor: 'rgba(76, 175, 80, 1)',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  },
});

const ethChart = new Chart(document.getElementById('eth-chart').getContext('2d'), {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'ETH Price',
        data: [],
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderColor: 'rgba(33, 150, 243, 1)',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  },
});

const btcPrice = document.getElementById('btc-price');
const ethPrice = document.getElementById('eth-price');

const fetchPrices = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum');
  const data = await res.json();

  const btcData = data.find((coin) => coin.id === 'bitcoin');
  const ethData = data.find((coin) => coin.id === 'ethereum');

  const btcPriceText = `$${btcData.current_price.toFixed(2)}`;
  const ethPriceText = `$${ethData.current_price.toFixed(2)}`;

  btcPrice.textContent = btcPriceText;
  ethPrice.textContent = ethPriceText;

  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  btcChart.data.labels.push(time);
  btcChart.data.datasets[0].data.push(btcData.current_price);

  ethChart.data.labels.push(time);
  ethChart.data.datasets[0].data.push(ethData.current_price);

  if (btcChart.data.labels.length > 10) {
    btcChart.data.labels.shift();
    btcChart.data.datasets[0].data.shift();
  }

  if (ethChart.data.labels.length > 10) {
    ethChart.data.labels.shift();
    ethChart.data.datasets[0].data.shift();
  }

  btcChart.update();
  ethChart.update();
};

fetchPrices();
setInterval(fetchPrices, 5000);
