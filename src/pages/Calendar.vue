<template>
  <FullCalendar class="container"/>
</template>


<script setup>
import FullCalendar from '@/components/calendar/FullCalendar.vue'
import { computed } from 'vue'
import { useCalendarAccountStore } from '@/stores/calendarAccount'

const calendarAccountStore = useCalendarAccountStore();
const summaryList = computed(() => calendarAccountStore.summaryList); //읽기 전용 반응형 ref 객체 반환
</script>