<template>
  <div>
    <v-text-field
        :value="value"
        @click="dialogChooseVisible = !dialogChooseVisible"
        :label="label"
        :error-messages="errorMessages"
        readonly
        append-icon="mdi-clock-time-four-outline"
    />

    <choose-time-dialog v-model="dialogChooseVisible" @choose="$emit('input', $event)"/>
  </div>
</template>

<script>
import ChooseTimeDialog from "@/components/dialogs/ChooseTimeDialog";

export default {
  name: "time-input",
  components: {ChooseTimeDialog},
  props: {
    value: {type: String, default: ''}, label: String, errorMessages: Array
  },
  data: () => ({
    dialogChooseVisible: false
  })
}
</script>

<style scoped>

</style>