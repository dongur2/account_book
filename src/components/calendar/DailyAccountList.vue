<template>
    <ul class="list-group" style="width: 100%;">
      <div
        v-for="(items, month) in groupedData"
        :key="month"
        style="flex-direction: column"
      >
        <h2>{{ getMonthString(month) }}</h2>
        <div class="col" v-for="accountItem in items" :key="accountItem.id">
          <AccountItem :accountItem="accountItem" style="background-color: #fefefe;"></AccountItem>
        </div>
      </div>
    </ul>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAccountListStore } from '@/stores/account.js';
  import AccountItem from '@/components/AccountItem.vue';
  
  const accountListStore = useAccountListStore();
  const { fetchAccountList } = accountListStore;
  
  
  function getMonthString(month) {
    const year = month.slice(0, 4); // YYYY 추출
    const monthPart = month.slice(5); // MM 추출
    return `${year} - ${monthPart}`; // "YYYY년 MM월" 형식으로 반환
  }
  
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
  
  const groupedData = computed(() => groupByMonth(accountListStore.accountList));
  
  // 데이터 변경 감지하여 업데이트
  </script>
  
  <style>
  .list-group-item {
    margin-bottom: 1em;
  }
  </style>
  