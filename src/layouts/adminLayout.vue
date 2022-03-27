<template>
  <v-app>
    <app-bar :includeNavigation="true"/>

    <v-main>
      <v-container fluid style="max-width: 1920px;">
        <v-row>
          <router-view />
        </v-row>
      </v-container>

      <app-footer/>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/structure/app-bar";
import appFooter from "@/components/structure/app-footer";

export default {
  name: "adminLayout",
  components: {appBar, appFooter},
};
</script>

<style scoped>
</style>