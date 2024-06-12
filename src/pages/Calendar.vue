<template>
  <FullCalendar class="container"/>
  <InputIncomeExpense />
  <div class="container" style="background-color:rgb(252, 218, 118)">
    <AccountList />
  </div>
</template>


<script setup>
import FullCalendar from '@/components/calendar/FullCalendar.vue'
import { computed } from 'vue'
import { useCalendarAccountStore } from '@/stores/calendarAccount'

import InputIncomeExpense from '@/components/InputIncomeExpense.vue';
import AccountList from '../components/AccountList.vue';

const calendarAccountStore = useCalendarAccountStore();
const summaryList = computed(() => calendarAccountStore.summaryList); //읽기 전용 반응형 ref 객체 반환
</script>