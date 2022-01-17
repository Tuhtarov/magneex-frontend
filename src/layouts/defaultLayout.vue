<template>
  <v-app>
    <v-navigation-drawer app v-model="navDrawer">
      <v-list nav>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Main</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create</v-list-item-title>
          </v-list-item>

        </v-list-group>
      </v-list>
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

export default {
  name: "Default",
  components: {appBar, appFooter},
  data: () => ({
    navDrawer: false
  }),
  methods: {
    onNavClick() {
      this.navDrawer = !this.navDrawer
    }
  }
}
</script>

<style scoped>

</style>