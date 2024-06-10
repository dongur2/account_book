<template>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <div v-for="(items, month) in groupedData" :key="month">
          <h2>{{ getMonthString(month) }}</h2>
          <div class="row">
            <div class="col" v-for="accountItem in items" :key="accountItem.id">
              <AccountItem :accountItem="accountItem"></AccountItem>
            </div>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAccountListStore } from '@/stores/account.js';
import AccountItem from '@/components/AccountItem.vue';

// Store 사용
const accountListStore = useAccountListStore();
const { fetchTodoList } = accountListStore;

// accountList를 가져오기
const accountList = computed(() => accountListStore.accountList);

function getMonthString(month) {
  return month.slice(5) + '월';
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
