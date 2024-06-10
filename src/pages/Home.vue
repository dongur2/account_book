<template>
  <div class="container" style="justify-content: space-between">
    <div style="flex: 1; justify-content: center">
      <PieChart />
    </div>

    <div style="flex-direction: column; flex: 1">
      <div style="flex: 1">
        <div class="amount" style="flex: 1">수입:income{{}}</div>
        <div class="amount" style="flex: 1">지출:expense{{}}</div>
      </div>
      <hr class="my-4" />
      <div style="flex: 1">
        <div style="flex: 1">category{{}}</div>
        <div style="flex: 1">amount{{}}</div>
      </div>
    </div>
  </div>

  <div>
    <!-- inputIncomeExpense -->
    <InputIncomeExpense />
  </div>
  <div class="container">
    <div>Add</div>
  </div>
  <div class="container"><AccountList></AccountList></div>
</template>

<script setup>
import PieChart from '@/components/PieChart.vue';

import InputIncomeExpense from '@/components/InputIncomeExpense.vue';
import AccountList from '../components/AccountList.vue';
</script>
