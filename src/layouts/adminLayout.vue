<template>
  <v-app>
    <v-navigation-drawer app v-model="navDrawer" width="290">
      <navigation-list />
    </v-navigation-drawer>

    <app-bar @clickNavIcon="onNavClick" />

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>

      <app-footer />
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/structure/app-bar";
import appFooter from "@/components/structure/app-footer";
import navigationList from "@/components/navigation/navigation-list";

export default {
  name: "admin",
  components: { appBar, appFooter, navigationList },
  data: () => ({
    navDrawer: false,
  }),
  methods: {
    onNavClick() {
      this.navDrawer = !this.navDrawer;
    },
  },
};
</script>

<style scoped>
</style>