<template>
  <v-menu bottom min-width="260px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on" :loading="!user">
        <v-avatar>
          <v-icon> mdi-account-circle</v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <template v-if="userReady">
      <v-card>
        <v-card-title>
          {{ user.login }}
          <v-spacer/>
          <v-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
        </v-card-title>

        <v-card-subtitle v-if="role">
          Роль: {{ role }}
        </v-card-subtitle>

        <v-card-text v-if="user">
          {{ fullName }}
          <v-divider/>
          <br>
          <theme-switch/>
        </v-card-text>

        <v-card-actions>
          <v-spacer/>
          <v-btn color="error" depressed rounded text @click="onLogout">Выйти</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-menu>
</template>

<script>
import {mapGetters} from "vuex";
import ThemeSwitch from "@/components/inputs/themeSwitch";

export default {
  name: "appBarMenu",
  components: {ThemeSwitch},
  computed: {
    ...mapGetters({
      user: "user/getCurrentUser",
      userReady: "user/userIsReady",
      role: "user/getCurrentRole",
      fullName: "user/getFullName"
    }),
  },
  methods: {
    onLogout() {
      this.$router.push({name: "logout"});
    },
  }
};
</script>

<style scoped></style>