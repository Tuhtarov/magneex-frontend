<template>
  <v-card elevation="3" :max-width="maxWidth" outlined>
    <v-card-title>Добавить должность</v-card-title>
    <v-card-subtitle>Введите имя должности, и нажмите сохранить.</v-card-subtitle>

    <v-card-text>
      <v-container fluid>
        <v-row class="px-0">
          <v-col class="col-12 col-md-6 ps-0">
            <v-text-field
                v-model="name"
                label="Наименование"
                required
                counter
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
                :error-messages="nameErr"/>

            <v-text-field
                v-model="salary"
                label="Зарплата"
                required
                type="number"
                min="0"
                @input="$v.salary.$touch()"
                @blur="$v.salary.$touch()"
                :error-messages="salaryErr"
            />
          </v-col>

          <v-col class="col-12 col-md-6 ps-0">
            <time-input
                v-model="beginWorkTime"
                label="Начало набочего времени"
                @input="$v.beginWorkTime.$touch()"
                @blur="$v.beginWorkTime.$touch()"
                :error-messages="beginTimeErr"
            />

            <time-input
                v-model="endWorkTime"
                label="Конец набочего времени"
                @input="$v.endWorkTime.$touch()"
                @blur="$v.endWorkTime.$touch()"
                :error-messages="endTimeErr"
            />

          </v-col>
        </v-row>
      </v-container>
    </v-card-text>


    <v-card-text>
      <v-sheet v-show="hasServerError">
        <p class="error--text">При добавлении должности произошла ошибка.</p>
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
import {mapActions} from "vuex";
import TimeInput from "@/components/inputs/TimeInput";
import {validationMixin} from "vuelidate";
import {minLength, required, maxLength, minValue} from "vuelidate/lib/validators";

const validations = {
  name: {required, minLength: minLength(2), maxLength: maxLength(200)},
  beginWorkTime: {required},
  endWorkTime: {required},
  salary: {required, minValue: minValue(0)}
}

export default {
  name: "job-position-create-form",
  props: {maxWidth: String},
  components: {TimeInput},

  mixins: [validationMixin],
  validations: validations,

  data: () => ({
    name: '',
    beginWorkTime: '',
    endWorkTime: '',
    salary: 0,
    hasServerError: false
  }),

  computed: {
    nameErr() {
      return this.validate(this.$v.name, 'name')
    },
    beginTimeErr() {
      return this.validate(this.$v.beginWorkTime, 'begin')
    },
    endTimeErr() {
      return this.validate(this.$v.endWorkTime, 'end')
    },
    salaryErr() {
      return this.validate(this.$v.salary, 'salary')
    },
  },

  methods: {
    ...mapActions({createJobPosition: 'jobPosition/createJobPosition'}),

    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      await this.createJobPosition(this.getJobPosition())
          .then(() => {
            this.hasServerError = false
            this.clear();
          })
          .catch(() => this.hasServerError = true)
    },

    validate(input) {
      let errors = [];
      const {$dirty, $params, required, minLength, minValue} = input

      if ($dirty) {
        if (required !== undefined) {
          !required && errors.push("Поле обязательно.");
        }

        if (minLength !== undefined) {
          !minLength && errors.push(`Минимальное кол-во символов: ${$params.minLength.min}`);
        }

        if (minValue !== undefined) {
          !minValue && errors.push(`Минимальное значение: ${$params.minValue.min}.`);
        }
      }

      return errors;
    },

    getJobPosition() {
      return {
        name: this.name,
        beginWorkTime: this.beginWorkTime,
        endWorkTime: this.endWorkTime,
        salary: this.salary
      };
    },

    clear() {
      this.$v.$reset();
      this.name = '';
      this.beginWorkTime = '';
      this.endWorkTime = '';
      this.salary = '';
    },
  },
};
</script>

<style scoped>

</style>