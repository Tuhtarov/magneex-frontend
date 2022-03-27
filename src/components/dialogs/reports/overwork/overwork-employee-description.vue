<template>
  <v-dialog :value="value" @input="$emit('change', $event)" max-width="850">
    <v-card max-width="850">
      <v-card-title>Описание переработки</v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-md-6">
            <p>Время прибытия: {{ visitOverwork.beginWorkTime }}</p>
            <p>Время убытия: {{ visitOverwork.endWorkTime }}</p>
            <p>Проработанные часы: {{ workSession }}</p>
          </v-col>
          <v-col class="col-12 col-md-6">
            <p>Установленное время прибытия: {{ visitOverwork.employee.jobPosition.beginWorkTime }}</p>
            <p>Установленное время убытия: {{ visitOverwork.employee.jobPosition.endWorkTime }}</p>
            <p>Установленные рабочие часы: {{ jobHours }}</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <p><b>Переработка</b></p>
        <p>{{ visitOverwork.overwork }} ⚠</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" text @click="$emit('change', false)"> Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {getJobHours} from "@/api/Entity/EmployeeManager";
import {getWorkSessionInHours} from "@/api/Entity/VisitManager";

export default {
  props: {
    visitOverwork: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    jobHours() {
      return getJobHours(this.visitOverwork.employee);
    },
    workSession() {
      return getWorkSessionInHours(this.visitOverwork);
    }
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