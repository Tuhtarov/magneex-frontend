<template>
  <div>
    <v-navigation-drawer app v-if="includeNavigation" v-model="navOpen" width="290">
      <navigation-list v-if="userReady"/>

      <template v-if="!userReady" v-slot:append>
        <v-row class="justify-center pb-10">
          <v-progress-circular indeterminate/>
        </v-row>
      </template>
    </v-navigation-drawer>

    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon v-if="includeNavigation" @click="navOpen = !navOpen"/>
      <v-app-bar-title>Visits</v-app-bar-title>
      <v-spacer/>

      <!-- Пользователь -->
      <strong class="text-h6 mx-3">
        {{ familyAndName ? familyAndName : 'Загрузка' }}
      </strong>

      <app-bar-menu/>
    </v-app-bar>
  </div>
</template>

<script>
import appBarMenu from "@/components/structure/app-bar-menu";
import navigationList from "@/components/navigation/navigation-list";
import {mapGetters} from "vuex";

export default {
  name: "appBar",
  components: {appBarMenu, navigationList},
  props: {
    includeNavigation: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    navOpen: false
  }),
  computed: {
    ...mapGetters({
      familyAndName: 'user/getFamilyAndName',
      userReady: 'user/userIsReady'
    })
  },
}
</script>

<style scoped>

</style>