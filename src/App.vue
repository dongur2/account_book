<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
  />
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import Header from '@/components/Header.vue';
// import { useAccountListStore } from '@/stores/account.js';
import { useMonthlyAccountStore } from './stores/monthlyAccount';
// import Loading from '@/components/Loading.vue'

// const AccountListStore = useAccountListStore();

// const isLoading = computed(()=>todoListStore.isLoading);
// const fetchAccountList = AccountListStore.fetchAccountList;
// fetchAccountList();

const monthlyAccountStore = useMonthlyAccountStore();
const {fetchMonthlyAccountList} = monthlyAccountStore;
fetchMonthlyAccountList(new Date().getMonth() + 1);
</script>
