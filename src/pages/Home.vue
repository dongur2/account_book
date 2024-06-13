<template>
  <div class="container container-shadow" style="justify-content: space-between">
    <!-- 좌측 PieChart 컴포넌트 -->
    <div style="flex: 1; justify-content: center">
      <PieChart />
    </div>
    <!-- 중앙 섹션: 아이콘 및 수입/지출 정보 -->
    <div style="flex-direction: column; flex: 1">
      <!-- 아이콘 부분 -->
      <div style="display: flex; justify-content: flex-end; margin: 0.5rem">
        <!-- 좌측 화살표 버튼 -->
        <button @click="prevMonth">
          <i class="bi bi-chevron-double-left" style="cursor: pointer"></i>
        </button>
        <!-- 중앙 하우스 아이콘 버튼 -->
        <button>
          <i class="bi bi-house"></i>
        </button>
        <!-- 우측 화살표 버튼 -->
        <button @click="nextMonth">
          <i class="bi bi-chevron-double-right"></i>
        </button>
      </div>
      <!-- 수입/지출 정보 -->
      <div style="flex: 2; flex-direction: column">
        <div
          class="amount"
          style="flex: 1; justify-content: center"
          @click="showIncomes"
        >
          <div style="flex: 1; justify-content: center; align-items: center">
            <p2>수입</p2>
          </div>
          <div style="flex: 1">
            <p4>{{ moneyFormat(monthlyIncomeSum) }}</p4>
          </div>
        </div>
        <div
          class="amount"
          style="flex: 1; justify-content: center"
          @click="showExpenses"
        >
          <div style="flex: 1; justify-content: center; align-items: center">
            <p3>지출</p3>
          </div>
          <div style="flex: 1">
            <p4>{{ moneyFormat(monthlyExpenseSum) }}</p4>
          </div>
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
  <div class="container container-shadow" style="background-color: #fefefe">
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

// accountListStore (전체 데이터)
const accountListStore = useAccountListStore();
const { updateChartData } = accountListStore;

// monthlyAccountStore (월별 데이터)
const monthlyAccountListStore = useMonthlyAccountStore();
const { fetchMonthlyAccountList, monthlyIncomeSum, monthlyExpenseSum } =
  monthlyAccountListStore;

/* 
 * 초기 데이터 로드: 월별 데이터 패치
 */
onMounted(async () => {
  await fetchMonthlyAccountList(selectedMonth.value);
});

/* 
 * 월 관리 
 */

// 선택된 월 관리
const selectedMonth = ref(new Date().getMonth() + 1);

// 월 변경 핸들러: 월 변경 후 월별데이터 패치 메서드로 매개변수 전달 (데이터 로드)
const prevMonth = () => {
  selectedMonth.value =
    selectedMonth.value === 1 ? 12 : selectedMonth.value - 1;
  fetchMonthlyAccountList(selectedMonth.value);
  console.log('monthlyIncomeSum'+monthlyIncomeSum);
};
const nextMonth = () => {
  selectedMonth.value =
    selectedMonth.value === 12 ? 1 : selectedMonth.value + 1;
  fetchMonthlyAccountList(selectedMonth.value);
};

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
