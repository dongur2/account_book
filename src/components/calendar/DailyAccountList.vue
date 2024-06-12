<template>
    <ul class="list-group" style="width: 100%;">
      <div
        v-for="(items, month) in groupedData"
        :key="month"
        style="flex-direction: column"
      >
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
  