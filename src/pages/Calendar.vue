<template>
  <div
    class="container"
    style="
      display: flex;
      flex-direction: row;
      background-color: white;
      border-radius: 10px;
      margin-top: 20px;
    "
  >
    Calendar
    <FullCalendar :options="calendarOptions" />

  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
    }
  }
}
</script>