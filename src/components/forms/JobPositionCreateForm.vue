<template>
  <v-card elevation="3" :max-width="maxWidth" outlined>
    <v-card-title>Создать должность</v-card-title>
    <v-card-subtitle>Введите имя должности, и нажмите сохранить.</v-card-subtitle>

    <v-card-text>
      <v-text-field
          v-model="name"
          label="Имя"
          required
          style="max-width: 500px;"
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
          :error-messages="nameErrors">
      </v-text-field>

      <v-sheet v-show="hasError">
        <p class="error--text">При создании должности произошла ошибка.</p>
      </v-sheet>
    </v-card-text>

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
  mixins: [validationMixin],
  validations: {
    name: {required, minLength: minLength(2), maxLength: maxLength(200)},
  },

  name: "JobPositionCreateForm",
  props: {
    maxWidth: {
      type: String
    }
  },
  data: () => ({
    name: '',
    hasError: false
  }),
  computed: {
    nameErrors() {
      return this.validateInput(this.$v.name);
    },
  },
  methods: {
    ...mapActions({createJobPosition: 'jobPosition/createJobPosition'}),
    async submit() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this._sendRequest();
      }
    },
    async _sendRequest() {
        await this.createJobPosition(this.name)
            .then(() => this.hasError = false)
            .catch(() => this.hasError = true)
    },
    clear() {
      this.name = '';
      this.$v.$reset();
    },

    validateInput(input) {
      const errors = [];
      const {$dirty, required, minLength} = input;
      if (!$dirty) return errors;

      !required && errors.push("Поле обязательно.");

      const minText = input?.$params?.minLength?.min;

      if (minText !== undefined && minText !== null) {
        !minLength && errors.push(`Минимальное количество символов: ${minText}`);
      }

      return errors;
    }
  }
}
</script>

<style scoped>

</style>