<template>
  <v-card elevation="3">
    <v-card-title>Добавить сотрудника</v-card-title>
    <v-card-subtitle>Заполните все поля, и нажмите кнопку сохранить.</v-card-subtitle>
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
          <v-text-field
              v-model="family"
              label="Фамилия"
              required
              @input="$v.family.$touch()"
              @blur="$v.family.$touch()"
              :error-messages="familyErrors">
          </v-text-field>
          <v-text-field
              v-model="patronymic"
              label="Отчество"
              required
              @input="$v.patronymic.$touch()"
              @blur="$v.patronymic.$touch()"
              :error-messages="patronymicErrors">
          </v-text-field>
          <v-dialog
              ref="dialog"
              v-model="datePicker"
              :return-value.sync="birthday"
              persistent
              width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="birthday"
                  label="День рождения"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  @input="$v.birthday.$touch()"
                  @blur="$v.birthday.$touch()"
                  :error-messages="birthdayErrors"
              ></v-text-field>
            </template>
            <v-date-picker v-model="birthday" scrollable>
              <v-btn text color="error" @click="datePicker = false">
                Отмена
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn text color="success" @click="$refs.dialog.save(birthday)">
                Ок
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <v-text-field
              v-model="email"
              label="Email"
              type="email"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              :error-messages="emailErrors"
          ></v-text-field>
          <v-text-field
              v-model="phone"
              label="Телефон"
              @input="$v.phone.$touch()"
              @blur="$v.phone.$touch()"
              :error-messages="phoneErrors"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>
      <v-row>
        <v-col class="col-12 col-sm-6">
          <choose-card
              title="должность"
              @change="jobPositionId = $event"
              :items="jobPositions">
          </choose-card>
        </v-col>
        <v-col class="col-12 col-sm-6">
          <choose-card
              title="роль"
              @change="roleId = $event"
              :items="roles">
          </choose-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex flex-wrap">
          <v-btn @click="submit" type="button" color="primary" class="mr-4">
            Сохранить
            <v-icon dark right> mdi-checkbox-marked-circle</v-icon>
          </v-btn>
          <v-spacer/>
          <v-btn @click="clear" icon>
            <v-icon dark>mdi-cached</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </form>
  </v-card>
</template>

<script>
import ChooseCard from "@/components/cards/chooseCard";

import {validationMixin} from "vuelidate";
import {minLength, required, email, maxLength} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";

const defaultRule = {required, minLength: minLength(3), maxLength: maxLength(200)};
const isPhone = (value) => (/^((8|\+7)?[0-9]{5,10}$)/).test(value)

export default {
  name: 'employees-create-form',
  components: {ChooseCard},

  mixins: [validationMixin],

  validations: {
    name: defaultRule,
    family: defaultRule,
    patronymic: defaultRule,
    email: {required, email: email},
    phone: {required, minLength: minLength(11), maxLength: maxLength(12), isPhone},
    birthday: {required}
  },

  data: () => ({
    name: '',
    family: '',
    patronymic: '',
    birthday: '',
    email: '',
    phone: '',
    jobPositionId: null,
    roleId: null,
    datePicker: null
  }),

  computed: {
    ...mapGetters({roles: 'role/getRoles', jobPositions: 'jobPosition/getJobPositions'}),
    nameErrors() {
      return this._validateInput(this.$v.name);
    },
    familyErrors() {
      return this._validateInput(this.$v.family);
    },
    patronymicErrors() {
      return this._validateInput(this.$v.patronymic);
    },
    birthdayErrors() {
      return this._validateInput(this.$v.birthday);
    },
    emailErrors() {
      return this._validateInput(this.$v.email);
    },
    phoneErrors() {
      return this._validatePhone(this.$v.phone)
    }
  },
  methods: {
    ...mapActions({createEmployee: 'employee/createEmployee'}),
    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const employee = {
        name: this.name,
        family: this.family,
        patronymic: this.patronymic,
        birthday: this.birthday,
        email: this.email,
        phone: this.phone,
        job_position_id: this.jobPositionId,
        role_id: this.roleId,
      }

      await this.createEmployee(employee);
    },

    clear() {
      this.name = '';
      this.family = '';
      this.patronymic = '';
      this.birthday = '';
      this.email = '';
      this.phone = '';
      this.jobPositionId = null;
      this.roleId = null;
      this.$v.$reset();
    },

    _validateInput(input) {
      const errors = [];
      const {$dirty, required, minLength, email} = input;
      if (!$dirty) return errors;

      !required && errors.push("Поле обязательно.");

      const minText = input?.$params?.minLength?.min;

      if (minText !== undefined && minText !== null) {
        !minLength && errors.push(`Минимальное количество символов: ${minText}`);
      }

      if (email !== undefined) {
        !email && errors.push('Введите корректный email адрес.')
      }

      return errors;
    },

    _validatePhone(phoneField) {
      let errors = this._validateInput(phoneField);

      if (!phoneField.$dirty) return errors;

      if (!phoneField?.isPhone) errors.push('Введите корректный номер телефона. Пример: 89114445566');

      const {maxLength, $params} = phoneField;

      !maxLength && errors.push('Максимальная длина номера телефона: ' + $params?.maxLength?.max)

      return errors;
    }
  },

  mounted() {
    this.$store.dispatch('role/fetchRoles').catch(e => console.dir(e));
    this.$store.dispatch('jobPosition/fetchJobPositions').catch(e => console.dir(e));
  },
};
</script>

<style>
</style>