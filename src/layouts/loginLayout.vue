<template>
  <v-app>
    <v-app-bar app dark="dark" elevate-on-scroll>
      <v-spacer></v-spacer>
      <v-toolbar-title>Visits</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view/>
    </v-main>

<!--    <v-footer dark="dark">-->
<!--      <v-card class="mx-auto">-->
<!--        <v-card-title>ЭТО ТУПАК!!!</v-card-title>-->
<!--      </v-card>-->
<!--    </v-footer>-->
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters({
      dark: 'application/darkMode'
    })
  }
}
</script>

<style scoped>

</style>