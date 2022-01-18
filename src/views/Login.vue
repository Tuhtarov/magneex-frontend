<template>
  <v-container class="fill-height">
    <v-row>
      <v-card class="ma-auto pa-10" :disabled="authLoading">
        <v-card-title>
          <span class="d-block mx-auto">Авторизация</span>
        </v-card-title>

        <form class="mx-auto form__login">
          <v-text-field
            v-model="login"
            :error-messages="loginErrors"
            label="Логин"
            required
            @input="$v.login.$touch()"
            @blur="$v.login.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :error-messages="passwordErrors"
            label="Пароль"
            required
            type="password"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>

          <v-checkbox
            v-model="rememberMe"
            label="Запомнить меня"
            @change="$v.rememberMe.$touch()"
            @blur="$v.rememberMe.$touch()"
          ></v-checkbox>

          <div class="d-flex mt-4">
            <v-btn class="mr-4" @click="submit" :loading="authLoading"
              >Войти
              <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="clear" icon :disabled="authLoading">
              <v-icon dark>mdi-cached</v-icon>
            </v-btn>
          </div>
        </form>

        <v-card-text
          v-if="messageAuthError"
          class="px-0 red--text"
          color="transparent"
        >
          {{ messageAuthError }}
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { login } from "@/api/Authorization.js";

const MIN_LOGIN = 4;
const MIN_PWD = 4;

export default {
  mixins: [validationMixin],

  validations: {
    login: { required, minLength: minLength(MIN_LOGIN) },
    password: { required, minLength: minLength(MIN_PWD) },
    rememberMe: {},
  },

  data: () => ({
    login: "",
    password: "",
    rememberMe: false,
    authLoading: false,
    messageAuthError: null,
  }),

  computed: {
    loginErrors() {
      const errors = [];
      if (!this.$v.login.$dirty) return errors;
      !this.$v.login.minLength &&
        errors.push(`Логин должен быть не менее ${MIN_LOGIN} символов.`);
      !this.$v.login.required && errors.push("Логин обязателен.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
        errors.push(`Пароль должен быть не менее ${MIN_PWD} символов`);
      !this.$v.password.required && errors.push("Пароль обязателен.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      this.signIn();
    },
    clear() {
      this.$v.$reset();
      this.login = "";
      this.password = "";
      this.rememberMe = false;
      this.authSuccess = null;
    },
    async signIn() {
      if (this.login.length > MIN_LOGIN && this.password.length > MIN_PWD) {
        this.authLoading = true;

        const onErrorCb = (message) => {
          this.messageAuthError = message;
        }

        const onSuccessCb = () => {
          this.$router.push({ name: "Home" });
          this.$router.go();
        }

        await login(this.login, this.password, onSuccessCb, onErrorCb);

        this.authLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.form__login {
  width: 350px;
}

@media screen and (max-width: 500px) {
  .form__login {
    width: 280px;
  }
}
</style>