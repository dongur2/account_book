<template>
  <div
    class="container"
    style="
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: space-between;
      background-color: white;
      border-radius: 10px;
    "
  >
    <div style="flex: 1">
      <PieChart style="background-color: white" />
    </div>

    <div style="display: flex; flex-direction: column; flex: 1">
      <div style="flex: 1; display: flex; flex-direction: column">
        <div style="flex: 1; align-items: center; display: flex">
          수입:income{{}}
        </div>
        <div style="flex: 1; align-items: center; display: flex">
          지출:expense{{}}
        </div>
      </div>
      <hr class="my-4" />
      <div style="display: flex; flex: 2">
        <div style="flex: 1">category{{}}</div>
        <div style="flex: 1">amount{{}}</div>
      </div>
    </div>
  </div>
  <div>
    <!-- inputIncomeExpense -->
    <InputIncomeExpense />
  </div>
</template>

<script setup>
import PieChart from '@/components/PieChart.vue';
import InputIncomeExpense from '@/components/InputIncomeExpense.vue';
</script>
