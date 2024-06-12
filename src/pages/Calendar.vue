<template>
  <FullCalendar class="container"/>
  <InputIncomeExpense />
  <div v-if="isDailyShow" class="container" style="background-color:#fefefe">
    <DailyAccountList :accounts="dailyAccountList" />
  </div>
</template>


<script setup>
import FullCalendar from '@/components/calendar/FullCalendar.vue'
import { computed } from 'vue'
import { useCalendarAccountStore } from '@/stores/calendarAccount'
import { useAccountListStore } from '@/stores/account';

import InputIncomeExpense from '@/components/InputIncomeExpense.vue';
import DailyAccountList from '@/components/calendar/DailyAccountList.vue'

const calendarAccountStore = useCalendarAccountStore();
const accountListStore = useAccountListStore();
const summaryList = computed(() => calendarAccountStore.summaryList); //읽기 전용 반응형 ref 객체 반환
const dailyAccountList = computed(() => calendarAccountStore.dailyAccountList);
const isDailyShow = computed(() => calendarAccountStore.isDailyShow);
</script>