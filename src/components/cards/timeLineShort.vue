<template>
  <v-card width="400" elevation="0">
    <v-card-text>
      <div class="font-weight-bold ml-8 mb-2">Сегодня</div>
      <v-timeline align-top dense>
        <v-timeline-item
            v-for="history in histories"
            :key="history.time"
            :color="history.color"
            small>
          <div>
            <div class="font-weight-normal">
              <strong>{{ history.status }}</strong> - {{ history.time }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
      <div class="font-weight-bold ml-8 mb-2">Вчера</div>
      <v-timeline align-top dense>
        <v-timeline-item
            v-for="history in histories"
            :key="history.time"
            :color="history.color"
            small>
          <div>
            <div class="font-weight-normal">
              <strong>{{ history.status }}</strong> - {{ history.time }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "timeLineShort",
  data: () => ({
    histories: [
      {
        status: 'Ушёл ',
        time: '18:00',
        color: 'red lighten-1',
      },
      {
        status: 'Пришёл ',
        time: '09:00',
        color: 'green',
      },
    ],
  })
}
</script>

<style scoped>

</style>