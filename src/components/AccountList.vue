<template>
  <ul class="list-group" style="width: 100%">
    <div
      v-for="(items, month) in groupedData"
      :key="month"
      style="flex-direction: column"
    >
      <h2>{{ getMonthString(month) }}</h2>
      <button type="button" class="btn">
        <i class="bi bi-house"></i>
      </button>
      <div class="col" v-for="accountItem in items" :key="accountItem.id">
        <AccountItem :accountItem="accountItem"></AccountItem>
      </div>
    </div>
  </ul>
</template>

<script setup>
import { computed } from 'vue';
import { useAccountListStore } from '@/stores/account.js';
import AccountItem from '@/components/AccountItem.vue';

// Store 사용
const accountListStore = useAccountListStore();
const { fetchTodoList } = accountListStore;

const accountList = computed(() => accountListStore.accountList);

function getMonthString(month) {
  const year = month.slice(0, 4); // YYYY 추출
  const monthPart = month.slice(5); // MM 추출
  return `${year} - ${monthPart}`; // "YYYY년 MM월" 형식으로 반환
}

// groupByMonth 함수 정의
function groupByMonth(data) {
  return data.reduce((acc, item) => {
    const month = item.date.slice(0, 7); // YYYY-MM 형식으로 추출
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
}

// groupedData 계산 속성 정의
const groupedData = computed(() => groupByMonth(accountList.value));
</script>

<style>
.list-group-item {
  margin-bottom: 1em;
}
</style>
