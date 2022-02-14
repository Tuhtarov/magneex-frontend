<template>
  <v-container fluid class="fill-height">
    <v-row class="justify-center align-center">
      <v-col class="col-md-6 col-sm-10">
        <v-card loading>
          <v-card-title>Выход из системы</v-card-title>
          <v-card-text>Перенаправление..</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {logout} from "@/api/Authorization.js";

export default {
  name: "Logout",
  methods: {
    async exit() {
      await logout();
      await this.$router.push({name: 'login'})
    }
  },
  created() {
    this.exit();
  }
}
</script>

<style scoped>

</style>