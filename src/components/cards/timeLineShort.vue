<template>
  <v-card elevation="4" outlined>
    <v-card-text>
      <v-timeline align-top dense>
        <v-timeline-item v-if="beginTime" color="green" small>
          <strong>пришёл</strong> - {{ beginTime }}
        </v-timeline-item>

        <v-timeline-item v-if="endTime" color="red lighten-1" small>
          <strong>ушёл</strong> - {{ endTime }}
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "timeLineShort",
  props: {
    visit: {
      type: Object,
      default: null,
    }
  },
  computed: {
    beginTime() {
      return this.visit.beginWorkTime;
    },
    endTime() {
      return this.visit.endWorkTime;
    },
  }
};
</script>

<style scoped>
</style>