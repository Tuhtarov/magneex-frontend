<template>
  <v-dialog :value="value" @input="$emit('change', $event)" max-width="850">
    <v-card max-width="850">
      <v-card-title>Опоздание</v-card-title>

      <v-card-text>
        <v-row no-gutters>
          <v-col class="col-12 col-md-6">
            <p>Время прибытия: {{ visitTardy.beginWorkTime }}</p>
            <p>Время убытия: {{ visitTardy.endWorkTime }}</p>
          </v-col>
          <v-col class="col-12 col-md-6">
            <p>Установленное время прибытия: {{ visitTardy.employee.jobPosition.beginWorkTime }}</p>
            <p>Установленное время убытия: {{ visitTardy.employee.jobPosition.endWorkTime }}</p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <p><b>Опоздание в минутах: {{ visitTardy.minutes }}</b></p>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" text @click="$emit('change', false)"> Ок</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  props: {
    visitTardy: {
      type: Object,
      required: true
    },
    value: {
      type: Boolean,
      default: false
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