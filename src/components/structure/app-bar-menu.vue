<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on" :loading="!user">
        <v-avatar>
          <v-icon> mdi-account-circle </v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <v-avatar>
            <v-icon> mdi-account-circle </v-icon>
          </v-avatar>

          <h3 class="my-2" v-if="user">
            {{ `${user.people.family} ${user.people.name}` }}
          </h3>
          <p class="my-2 text-h6" v-if="user">Роль пользователя</p>
          <v-divider class="my-3"></v-divider>
          <div class="d-flex justify-center">
            <theme-switch />
          </div>
          <v-divider class="my-3"></v-divider>
          <v-btn depressed rounded text @click="onLogout">Выйти</v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import ThemeSwitch from "@/components/inputs/themeSwitch";

export default {
  name: "appBarMenu",
  components: {ThemeSwitch},
  computed: {
    ...mapGetters({
      user: "user/getCurrentUser",
    }),
  },
  methods: {
    onLogout() {
      this.$router.push({ name: "logout" });
    },
  }
};
</script>

<style scoped></style>