<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>Visits</v-toolbar-title>
      <v-spacer></v-spacer>
      <theme-switch></theme-switch>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ThemeSwitch from '@/components/inputs/themeSwitch.vue';

export default {
  name: "Login",
  components: {ThemeSwitch}
};
</script>

<style scoped></style>
