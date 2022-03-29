<template>
  <v-dialog :value="value" @input="$emit('change', $event)" max-width="850">
    <v-card max-width="850">
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-md-6">
            <p>Время прибытия: {{ visit.beginWorkTime }}</p>
            <p>Время убытия: {{ visit.endWorkTime }}</p>
            <p>Проработанные часы: {{ sessionHours }}</p>
            <slot name="leftSideText"/>
          </v-col>
          <v-col class="col-12 col-md-6">
            <p>Установленное время прибытия: {{ beginWork }}</p>
            <p>Установленное время убытия: {{ endWork }}</p>
            <p>Установленные рабочие часы: {{ jobHours }}</p>
            <slot name="rightSideText"/>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <slot name="bottomText" />
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" text @click="$emit('change', false)"> Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import dateformat from "dateformat";
import {getHoursIntervalFromDatePeriod, getJobHours} from "@/features/HoursManager";

export default {
  name: 'report-visit-dialog-description',
  props: {
    title: String,
    visit: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    beginWork() {
      return dateformat(new Date(this.visit.employee.jobPosition.beginWork), 'HH:MM');
    },
    endWork() {
      return dateformat(new Date(this.visit.employee.jobPosition.endWork), 'HH:MM');
    },

    jobHours() {
      return getJobHours(this.visit.employee.jobPosition);
    },

    sessionHours() {
      const {beginWorkTimeFull, endWorkTimeFull} = this.visit;
      return getHoursIntervalFromDatePeriod(beginWorkTimeFull, endWorkTimeFull);
    },
  },

  methods: {
    onChange(e) {
      console.log(e)
    }
  }
}
</script>

<style>

</style>