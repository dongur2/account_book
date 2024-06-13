<template>
  <div class="container" style="justify-content: space-between">
    <!-- 좌측 PieChart 컴포넌트 -->
    <div style="flex: 1; justify-content: center">
      <PieChart />
    </div>
    <!-- 중앙 섹션: 아이콘 및 수입/지출 정보 -->
    <div style="flex-direction: column; flex: 1">
      <!-- 아이콘 부분 -->
      <div style="display: flex; justify-content: flex-end; margin: 1rem 0">
        <!-- 좌측 화살표 버튼 -->
        <button @click="prevMonth">
          <i class="bi bi-chevron-double-left" style="font-size: inherit"></i>
        </button>
        <!-- 중앙 하우스 아이콘 버튼 -->
        <button>
          <i class="bi bi-house" style="font-size: inherit"></i>
        </button>
        <!-- 우측 화살표 버튼 -->
        <button @click="nextMonth">
          <i class="bi bi-chevron-double-right" style="font-size: inherit"></i>
        </button>
      </div>
      <!-- 수입/지출 정보 -->
      <div style="flex: 2">
        <div
          class="amount"
          style="flex: 1; justify-content: center"
          @click="showIncomes"
        >
          {{ selectedMonth }} 월 수입:{{ moneyFormat(monthlyIncomeSum) }}
        </div>
        <div
          class="amount"
          style="flex: 1; justify-content: center"
          @click="showExpenses"
        >
          지출:{{ moneyFormat(monthlyExpenseSum) }}
        </div>
      </div>

      <!-- 카테고리 및 금액 정보 -->
      <hr class="my-3" />
      <!-- 카테고리 및 금액 정보 -->
      <div style="flex: 2">
        <div style="flex: 1; align-items: center; justify-content: center">
          category{{}}
        </div>
        <div style="flex: 1; align-items: center; justify-content: center">
          amount{{}}
        </div>
      </div>
    </div>
  </div>

  <!-- 입력 섹션 -->
  <div>
    <!-- inputIncomeExpense -->
    <!-- InputIncomeExpense 컴포넌트 -->
    <InputIncomeExpense />
  </div>

  <!-- 계좌 목록 섹션 -->
  <div class="container" style="background-color: #fefefe">
    <!-- AccountList 컴포넌트 -->
    <AccountList />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PieChart from '@/components/PieChart.vue';
import InputIncomeExpense from '@/components/InputIncomeExpense.vue';
import AccountList from '@/components/AccountList.vue';
import { useAccountListStore } from '@/stores/account.js';
import { useMonthlyAccountStore } from '@/stores/monthlyAccount';
import { moneyFormat } from '@/utils/moneyFormat';
// 초기 데이터 로드
onMounted(async () => {
  await fetchMonthlyAccountList(selectedMonth.value);
});
const accountListStore = useAccountListStore();
const { updateChartData } = accountListStore;

const monthlyAccountListStore = useMonthlyAccountStore();
const { fetchMonthlyAccountList, monthlyIncomeSum, monthlyExpenseSum } =
  monthlyAccountListStore;

// 선택된 월 관리
const selectedMonth = ref(new Date().getMonth() + 1);

// // 월 변경 핸들러
const prevMonth = () => {
  selectedMonth.value =
    selectedMonth.value === 1 ? 12 : selectedMonth.value - 1;
  fetchMonthlyAccountList(selectedMonth.value);
  console.log(state.monthlyAccountList);
};

const nextMonth = () => {
  selectedMonth.value =
    selectedMonth.value === 12 ? 1 : selectedMonth.value + 1;
  fetchMonthlyAccountList(selectedMonth.value);
};

// 초기 데이터 로드
onMounted(async () => {
  await fetchMonthlyAccountList(selectedMonth.value);
});

const showExpenses = () => {
  updateChartData('expense');
};

const showIncomes = () => {
  updateChartData('income');
};
</script>
<style>
button {
  background: none;
  border: none;
  padding: 0;
  font-size: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
}
</style>
