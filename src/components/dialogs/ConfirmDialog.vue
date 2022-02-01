<template>
  <v-dialog :value="visible" persistent max-width="330">
    <v-card>
      <v-card-title class="text-h5">
        {{ title }}
      </v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-btn color="green darken-1" text @click="onAccept">Подтвердить</v-btn>
        <v-spacer/>
        <v-btn color="red darken-1" text @click="onClose">Отменить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ConfirmDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Заголовок не указан'
    },
    text: {
      type: String,
      default: 'Текст не указан'
    },
    acceptCallback: {
      default: null
    }
  },
  methods: {
    onAccept() {
      try {
        this.acceptCallback()
      } catch (e) {
        console.log(e)
      }

      this.onClose();
    },
    onClose() {
      this.$emit('close', true);
    }
  }
}
</script>

<style scoped>

</style>