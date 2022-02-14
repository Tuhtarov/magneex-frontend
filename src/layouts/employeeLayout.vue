<template>
  <v-app>
    <app-bar :includeNavigation="true"/>

    <v-main>
      <v-container fluid>
        <v-row>
          <router-view />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/structure/app-bar";

export default {
  name: "employeeLayout",
  components: {appBar},
}
</script>

<style scoped>

</style>