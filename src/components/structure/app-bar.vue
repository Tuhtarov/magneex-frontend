<template>
  <v-app-bar app elevate-on-scroll>
    <v-app-bar-nav-icon v-if="includeBurger" @click="$emit('clickNavIcon')"/>
    <v-app-bar-title>Visits</v-app-bar-title>
    <v-spacer></v-spacer>

    <!-- Пользователь -->
    <strong class="text-h6 mx-3">
      <span v-if="user">{{ `${user.people.name} ${user.people.family}` }}</span>
      <span v-show="!user">Загрузка</span>
    </strong>

    <app-bar-menu/>
  </v-app-bar>
</template>

<script>
import appBarMenu from "./app-bar-menu";
import {mapGetters} from "vuex";

export default {
  name: "appBar",
  components: {appBarMenu},
  props: {
    includeBurger: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({user: 'user/getCurrentUser'})
  },
}
</script>

<style scoped>

</style>