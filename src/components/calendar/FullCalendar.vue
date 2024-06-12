<template>
    <FullCalendar :options="state.calendarOptions"  
    class="full-calendar" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

import { reactive, computed, watch } from 'vue'
import { useCalendarAccountStore } from '@/stores/calendarAccount'

const calendarAccountStore = useCalendarAccountStore();
const summaryList = computed(() => calendarAccountStore.summaryList); //읽기 전용 반응형 ref 객체 반환

const { fetchSummaryList, fetchDailyAccountList } = calendarAccountStore;

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
    dateClick: showDailyAccountList,
    eventClick: showDailyAccountListWithEvt,
  },
})

function showDailyAccountList(arg) {
  fetchDailyAccountList(arg.dateStr);
}
function showDailyAccountListWithEvt(arg) {
  fetchDailyAccountList(arg.event._def.extendedProps.datetime);
}

fetchSummaryList();

//수입,지출목록 변경 시 캘린더 이벤트 업데이트
watch(summaryList, (newSummaryList) => {
  state.calendarOptions.events = newSummaryList;
});

</script>


<style>
.full-calendar {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10px;
    margin-top:20px;
    height:100%;
    padding:45px 50px 25px 50px;
}
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

/* 이벤트 배경색 제거 */
.fc-h-event {
  background-color:rgba(255, 255, 255, 0);
  border:1px solid rgba(51, 45, 45, 0);
}

/* 총수입 폰트색 */
.fc .income-event .fc-event-title  {
  color:#35948C !important;
}
/* 총지출 폰트색 */
.fc .expense-event .fc-event-title {
  color:#CF5A7A !important;
}

.fc-event-title {
  font-weight:2.5rem;
}

/* 이벤트 날짜 아래로 분리 */
.fc-daygrid-day-frame {
  flex-direction: column;
}
/* 금액 오른쪽 정렬 */
.fc-daygrid-day-events, .fc-daygrid-event-harness {
  margin-left:auto;
}

.fc-daygrid-day-events {
  flex-direction: column;
}

/* 요일,날짜 폰트 CSS 수정 */
.fc-col-header-cell-cushion, .fc-daygrid-day-number {
  color:black;
  font-weight: bold;
  text-decoration: none;
}

/* 캘린더 헤더 배경 & 폰트 색 수정 */
.fc-col-header {
  background-color:#6E6053;
}
.fc-col-header-cell-cushion {
  color:white;
}

</style>