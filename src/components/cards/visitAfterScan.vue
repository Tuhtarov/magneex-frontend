<template>
  <v-card elevation="4" outlined>
    <v-card-title>
      Ваше время: {{ time }} ✌
    </v-card-title>

    <v-card-text>
      <v-img src="https://placekitten.com/550/400" height="400" width="400" alt="Cat"/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "visitAfterScan",
  props: {
    visitTime: {
      type: String,
      default: null
    }
  },
  computed: {
    time() {
      return (new Date(this.visitTime)).toLocaleTimeString();
    }
  }
}
</script>
