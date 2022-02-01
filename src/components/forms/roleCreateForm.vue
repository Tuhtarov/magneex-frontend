<template>
  <v-card elevation="3" style="max-width: 992px;">
    <v-card-title>Создать роль</v-card-title>
    <v-card-subtitle>Введите имя роли, и нажмите сохранить.</v-card-subtitle>
    <form class="mx-auto form__login px-4 pb-5">
      <v-row align-content="stretch">
        <v-col class="col-12 col-sm-6">
          <v-text-field
              v-model="name"
              label="Имя"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              :error-messages="nameErrors">
          </v-text-field>
        </v-col>
      </v-row>
    </form>
    <v-card-actions class="flex-wrap">
      <v-btn @click="submit" type="button" color="primary" class="mr-4">Сохранить
        <v-icon dark right> mdi-checkbox-marked-circle</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn @click="clear" icon>
        <v-icon dark>mdi-cached</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {validationMixin} from "vuelidate";
import {minLength, required, maxLength} from "vuelidate/lib/validators";
import {mapActions} from "vuex";


export default {
  name: "roleCreateForm",
  mixins: [validationMixin],
  validations: {
    name: {required, minLength: minLength(2), maxLength: maxLength(200)},
  },
  data: () => ({
    name: '',
    nameErrors() {
      return this._validateInput(this.$v.name);
    },
  }),
  methods: {
    ...mapActions({createRole: 'role/createRole'}),
    async submit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.createRole(this.name);
      }
    },
    _validateInput(input) {
      const errors = [];
      const {$dirty, required, minLength} = input;
      if (!$dirty) return errors;

      !required && errors.push("Поле обязательно.");

      const minText = input?.$params?.minLength?.min;

      if (minText !== undefined && minText !== null) {
        !minLength && errors.push(`Минимальное количество символов: ${minText}`);
      }

      return errors;
    },
    clear() {
      this.name = '';
      this.$v.$reset();
    },
  }
}
</script>

<style scoped>

</style>