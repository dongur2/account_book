<template>

    <FullCalendar :options="state.calendarOptions"    
      style="
      display: flex;
      flex-direction: column;
      background-color: white;
      border-radius: 10px;
      margin: 20px 5%;
      height:100%;
      padding:45px 50px 25px 50px;
    "/>
</template>


<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { reactive, computed, watch } from 'vue'
import { useCalendarAccountStore } from '@/stores/calendarAccount'

const calendarAccountStore = useCalendarAccountStore();
const summaryList = computed(() => calendarAccountStore.summaryList); //읽기 전용 반응형 ref 객체 반환

const { fetchSummaryList } = calendarAccountStore;

const state = reactive({
  calendarOptions: {
    headerToolbar: {
          left: 'title',
          center: '',
          right: 'prev,next today'
    },
    events: [],
    plugins: [ dayGridPlugin, interactionPlugin ],
    initialView: 'dayGridMonth',
    showNonCurrentDates: true,
  },
})

fetchSummaryList();

//수입,지출목록 변경 시 캘린더 이벤트 업데이트
watch(summaryList, (newSummaryList) => {
  state.calendarOptions.events = newSummaryList;
});

</script>


<style>
/* 년월 */
#fc-dom-1402 {
  font-size:1.8rem;
  font-weight:bolder;
}

/* 월 이동 버튼 */
.fc .fc-button-primary {
  background-color:white;
  color:black;
  border: white;
}

/* today 비활성 */
.fc .fc-button-primary:disabled {
  background-color:#4A483F;
  color:white
}
</style>