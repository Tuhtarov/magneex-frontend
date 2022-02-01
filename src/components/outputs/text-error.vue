<template>
  <v-sheet
      v-if="messageExist"
      elevation="4"
      class="my-3"
      outlined>
    <v-system-bar lights-out>
      <span class="error--text">Ошибка</span>
      <v-spacer/>
      <slot>
        <v-btn @click="close" icon color="error" small>
          <v-icon small color="error">mdi-close</v-icon>
        </v-btn>
      </slot>
    </v-system-bar>
    <div class="d-flex align-center flex-wrap py-5 px-2">
      <p class="error--text ma-0 ms-2">{{ message }}</p>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: "text-error",
  props: {
    message: {
      type: String,
      default: null
    }
  },
  computed: {
    messageExist() {
      return this.message !== null && this.message.length > 0
    },
  },
  methods: {
    close() {
      this.$emit('close', true);
    },
  }
}
</script>