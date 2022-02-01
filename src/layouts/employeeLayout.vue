<template>
  <v-app>
    <app-bar :includeBurger="false" />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/structure/app-bar";
export default {
  name: "employeeLayout",
  components: {appBar}
}
</script>

<style scoped>

</style>