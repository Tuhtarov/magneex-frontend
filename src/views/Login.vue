<template>
  <v-card class="ma-auto pa-10" :disabled="authLoading">
    <v-card-title>
      <span class="d-block mx-auto">Авторизация</span>
    </v-card-title>

    <login-form
        @onAuthError="errorMessage = $event"
        @onAuthLoading="authLoading = $event"
    />

    <v-card-text
        v-if="errorMessage"
        class="px-0 red--text"
        color="transparent">
      {{ errorMessage }}
    </v-card-text>
  </v-card>
</template>
<script>
import loginForm from "@/components/forms/loginForm";

export default {
  name: 'loginView',
  components: {
    loginForm,
  },
  data: () => ({
    errorMessage: null,
    authLoading: false
  })
};
</script>

<style scoped>

</style>