<template>
  <v-app>
    <v-navigation-drawer app v-model="navDrawer" width="290">
      <navigation-list />

      <template v-slot:append>
        <div class="ps-4 pb-4 d-flex">
          <theme-switch />
        </div>
      </template>
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
import ThemeSwitch from "@/components/tool/themeSwitch.vue";

export default {
  name: "Default",
  components: { appBar, appFooter, navigationList, ThemeSwitch },
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