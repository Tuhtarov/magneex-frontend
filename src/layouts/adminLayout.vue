<template>
  <v-app>
    <v-navigation-drawer app v-model="navDrawer" width="290">
      <navigation-list v-if="userReady"/>

      <template v-if="!userReady" v-slot:append>
        <v-row class="justify-center pb-10">
          <v-progress-circular indeterminate/>
        </v-row>
      </template>
    </v-navigation-drawer>

    <app-bar @clickNavIcon="onNavClick"/>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>

      <app-footer/>
    </v-main>
  </v-app>
</template>

<script>
import appBar from "@/components/structure/app-bar";
import appFooter from "@/components/structure/app-footer";
import navigationList from "@/components/navigation/navigation-list";
import responseMessages from "@/api/ResponseMessages";
import {mapGetters} from "vuex";

export default {
  name: "admin",
  components: {appBar, appFooter, navigationList},
  data: () => ({
    navDrawer: false,
  }),
  methods: {
    onNavClick() {
      this.navDrawer = !this.navDrawer;
    },
  },
  computed: {
    ...mapGetters({userReady: 'user/userIsReady', responseError: 'user/getErrorResponse'})
  },
  watch: {
    responseError(error) {
      if (error?.message === responseMessages.NETWORK_ERROR_RESPONSE) {
        this.$router.push({name: '408'});
      }
    }
  }
};
</script>

<style scoped>
</style>