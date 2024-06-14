<script setup>
import Chart from 'chart.js/auto';
import { ref, onMounted, watch, reactive, computed } from 'vue';
import { useAccountListStore } from '@/stores/account.js';
const accountListStore = useAccountListStore();
const { accountList } = accountListStore;

import { useMonthlyAccountStore } from '@/stores/monthlyAccount';
const monthlyAccountStore = useMonthlyAccountStore();
const { fetchMonthlyAccountList, updateChartData } = monthlyAccountStore;


const pieChartRef = ref(null);

let chartInstance = null;

onMounted(async () => {
  await fetchMonthlyAccountList(new Date().getMonth() + 1); // 그래프데이터는 여기서 마운트
  monthlyAccountStore.updateChartData('expense'); // 초기 데이터는 지출로 설정
  renderPieChart();
});

const monthlyAccountList = computed(() => monthlyAccountStore.monthlyAccountList);
const chartData = computed(() => monthlyAccountStore.chartData);
console.log('chartdata ',chartData)

const listRef = ref(monthlyAccountList);


watch(
  () => monthlyAccountStore.chartData,
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
    data: monthlyAccountStore.chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: '',
        },
      },
      onClick: (event, elements) => {
        if (elements.length) {
          const firstElement = elements[0];
          const label = monthlyAccountStore.chartData.labels[firstElement.index];
          handleChartClick(label);
          console.log(label);
        }
      },
    },
  });
}

async function handleChartClick(label) {
  await monthlyAccountStore.setFilterCategory(label);
}
</script>

<template>
  <div>
    <canvas ref="pieChartRef"></canvas>
  </div>
</template>
