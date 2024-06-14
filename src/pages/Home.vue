<template>
  <div
    class="container container-shadow"
    style="justify-content: space-between"
  >
    <!-- 좌측 PieChart 컴포넌트 -->
    <div style="flex: 1; justify-content: center">
      <PieChart />
    </div>
    <!-- 중앙 섹션: 아이콘 및 수입/지출 정보 -->
    <div style="flex-direction: column; flex: 2">
      <!-- 아이콘 부분 -->
      <div class="left-home-right-btn-wrap">
        <!-- 좌측 화살표 버튼 -->
        <button @click="prevMonth">
          <i
            class="bi bi-chevron-double-left"
            style="cursor: pointer; font-size: 2rem"
          ></i>
        </button>
        <!-- 중앙 하우스 아이콘 버튼 -->
        <button @click="resetToCurrentMonth">
          <i class="bi bi-house" style="font-size: 2rem"></i>
        </button>
        <!-- 우측 화살표 버튼 -->
        <button @click="nextMonth">
          <i class="bi bi-chevron-double-right" style="font-size: 2rem"></i>
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
      <!-- <hr class="my-3" /> -->
      <!-- 카테고리 및 금액 정보 -->
      <!-- <div style="flex: 2">
        <div style="flex: 1; align-items: center; justify-content: center">
          category{{}}
        </div>
        <div style="flex: 1; align-items: center; justify-content: center">
          amount{{}}
        </div>
      </div> -->
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
import { ref, onMounted, computed } from 'vue';
import PieChart from '@/components/PieChart.vue';
import InputIncomeExpense from '@/components/InputIncomeExpense.vue';
import AccountList from '@/components/AccountList.vue';
import { useMonthlyAccountStore } from '@/stores/monthlyAccount';
import { moneyFormat } from '@/utils/moneyFormat';


// monthlyAccountStore (월별 데이터)
const monthlyAccountListStore = useMonthlyAccountStore();
const { fetchMonthlyAccountList, updateChartData } = monthlyAccountListStore;

const monthlyAccountList = computed(() => monthlyAccountListStore.monthlyAccountList);
const monthlyIncomeSum = computed(() => monthlyAccountListStore.monthlyIncomeSum);
const monthlyExpenseSum = computed(() => monthlyAccountListStore.monthlyExpenseSum);

/* 
 * 초기 데이터 로드: 월별 데이터 패치
 */
onMounted(async () => {
  await fetchMonthlyAccountList(selectedMonth.value, selectedYear.value);
});


/* 
 * 월 관리 
 */

// 선택된 월과 년도 관리
const selectedMonth = ref(new Date().getMonth() + 1);
const selectedYear = ref(new Date().getFullYear());

// 월 변경 핸들러
const prevMonth = () => {
  if (selectedMonth.value === 1) {
    selectedMonth.value = 12;
    selectedYear.value -= 1;
  } else {
    selectedMonth.value -= 1;
  }
  fetchMonthlyAccountList(selectedMonth.value, selectedYear.value);
};

const resetToCurrentMonth = () => {
  selectedMonth.value = new Date().getMonth() + 1;
  selectedYear.value = new Date().getFullYear();
  fetchMonthlyAccountList(selectedMonth.value, selectedYear.value);
};
const nextMonth = () => {
  if (selectedMonth.value === 12) {
    selectedMonth.value = 1;
    selectedYear.value += 1;
  } else {
    selectedMonth.value += 1;
  }
  fetchMonthlyAccountList(selectedMonth.value, selectedYear.value);
};

// 차트: 초기 데이터 로드
const showExpenses = () => {
  updateChartData('expense');
};
const showIncomes = () => {
  updateChartData('income');
};
</script>

<style>
.left-home-right-btn-wrap {
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem;
  color: rgb(96, 88, 76);
}
button {
  background: none;
  border: none;
  padding: 0;
  margin-right: 1rem;
  display: flex;
  align-items: center;
}
</style>
