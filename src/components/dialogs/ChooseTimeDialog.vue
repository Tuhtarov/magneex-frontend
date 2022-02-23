<template>
  <v-dialog :value="value" max-width="330" @input="close">
    <v-card>
      <v-card-title>Выбор времени</v-card-title>

      <v-card-text>
        <v-time-picker
            v-model="time"
            full-width
            format="24hr"/>
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="onChoose">Ок</v-btn>
        <v-spacer/>
        <v-btn color="red darken-1" text @click="close">Отмена</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ChooseTimeDialog",
  props: {value: Boolean},
  data: () => ({
    time: ''
  }),
  methods: {
    onChoose() {
      this.$emit('choose', this.time)
      this.close();
    },

    close() {
      this.$emit('input', false)
    },
  }
}
</script>

<style scoped>

</style>