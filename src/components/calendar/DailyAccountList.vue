<template>
    <ul class="list-group" style="width: 100%;">
        <div class="col" v-for="accountItem in dailyAccountList" :key="accountItem.id">
          <AccountItem :accountItem="accountItem" style="background-color: #fefefe;"></AccountItem>
        </div>
    </ul>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import AccountItem from '@/components/AccountItem.vue';
  import { useCalendarAccountStore } from '@/stores/calendarAccount';
  
  const calendarAccountStore = useCalendarAccountStore();
  const dailyAccountList = computed(() => calendarAccountStore.dailyAccountList);
  </script>
  
  <style>
  .list-group-item {
    margin-bottom: 1em;
  }
  </style>
  