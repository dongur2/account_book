<script setup>
import Chart from 'chart.js/auto';
import { ref, onMounted, watch } from 'vue';
import { useAccountListStore } from '@/stores/account.js';

const pieChartRef = ref(null);
const accountListStore = useAccountListStore();

let chartInstance = null;

onMounted(async () => {
  await accountListStore.fetchAccountList();
  accountListStore.updateChartData('expense'); // 초기 데이터는 지출로 설정
  renderPieChart();
});

watch(
  () => accountListStore.chartData,
  () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    renderPieChart();
  },
  { deep: true }
);

function renderPieChart() {
  const ctx = pieChartRef.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: accountListStore.chartData,
    options: {
      responsive: false,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '가계부',
        },
      },
      onClick: (event, elements) => {
        if (elements.length) {
          const firstElement = elements[0];
          const label = accountListStore.chartData.labels[firstElement.index];
          handleChartClick(label);
          console.log(label);
        }
      },
    },
  });
}

async function handleChartClick(label) {
  await accountListStore.setFilterCategory(label);
}
</script>

<template>
  <div>
    <canvas ref="pieChartRef"></canvas>
  </div>
</template>
