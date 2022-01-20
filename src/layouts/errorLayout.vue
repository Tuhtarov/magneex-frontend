<template>
  <v-app>
    <v-app-bar app elevate-on-scroll>
      <v-toolbar-title>Visits</v-toolbar-title>
      <v-spacer></v-spacer>
      <theme-switch></theme-switch>
    </v-app-bar>

    <v-main>
      <v-container fluid class="fill-height">
        <v-row class="justify-center">
          <v-col class="col-md-6 col-sm-10" style="max-width: 650px;">
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ThemeSwitch from '@/components/inputs/themeSwitch.vue';

export default {
  name: "errorLayout",
  components: {ThemeSwitch}
};
</script>

<style scoped></style>
