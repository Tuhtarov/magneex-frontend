<template>
  <v-form :disabled="!employees">
    <v-text-field
        v-model="login"
        type="text"
        @input="$v.login.$touch()"
        @blur="$v.login.$touch()"
        :error-messages="loginErrors"
        label="Логин"/>

    <v-text-field
        v-model="password"
        type="password"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
        :error-messages="passwordErrors"
        label="Пароль"/>

    <v-btn class="mt-2" @click="toggleDialog" text color="primary">
      {{ employee ? 'Изменить сотрудника' : 'Выбрать сотрудника' }}
    </v-btn>

    <!--Выбранный сотрудник-->
    <v-sheet class="my-3">
      <chosen-employee-card v-if="employee" :employee="employee" :closable="true">
        <!--Кнопка отмены-->
        <v-btn v-show="employee" @click="employee = null" icon color="error" small>
          <v-icon small color="error">mdi-close</v-icon>
        </v-btn>
      </chosen-employee-card>
    </v-sheet>

    <v-btn :disabled="!formReady" color="success" @click="submit">Сохранить</v-btn>

    <!--Модальное окно выбора сотрудника-->
    <choose-table-dialog
        v-if="employees"
        :headers="employeeHeaders"
        :items="employees"
        :visibility="showChooseDialog"
        @close="toggleDialog"
        @confirm="confirm"
    >
      <!--Карточка выбранного сотрудника в модальном окне-->
      <template v-slot:selectedRow="{item}">
        <chosen-employee-card v-if="item" :employee="item"/>
      </template>
    </choose-table-dialog>

    <!--Если сотрудники не подгрузились-->
    <v-progress-circular v-else indeterminate color="primary"/>

    <text-error :message="errorMessage" @close="errorMessage = null"/>
  </v-form>
</template>

<script>
import ChooseTableDialog from "@/components/dialogs/ChooseTableDialog";
import ChosenEmployeeCard from "@/components/cards/chosenEmployeeCard";
import TextError from "@/components/outputs/text-error";

import {validationMixin} from "vuelidate";
import {mapActions, mapGetters} from "vuex";
import {maxLength, minLength, required} from "vuelidate/lib/validators";

let field = {required, minLength: minLength(2), maxLength: maxLength(200)}
const validations = {login: field, password: field};

export default {
  name: "userCreateForm",
  mixins: [validationMixin],
  validations: validations,
  components: {TextError, ChosenEmployeeCard, ChooseTableDialog},

  data: () => ({
    login: '',
    password: '',
    employee: null,

    showChooseDialog: false,
    errorMessage: '',

    employeeHeaders: [
      {text: '#', value: 'id'},
      {text: 'Имя', value: 'people.name'},
      {text: 'Роль', value: 'role.name'}
    ]
  }),

  computed: {
    ...mapGetters({employees: 'employee/getEmployees'}),
    loginErrors() {
      return this.validateInput(this.$v.login);
    },
    passwordErrors() {
      return this.validateInput(this.$v.password);
    },
    formReady() {
      const fieldNotEmpty = this.employee !== null && this.login !== '' && this.password !== '';
      return !this.$v.$error && fieldNotEmpty;
    },
  },

  methods: {
    ...mapActions({createUser: 'user/createUser'}),
    async submit() {
      this.$v.$touch();

      if (this.formReady) {
        await this.createUser(this.getUserData())
            .finally(this.clear);
      }
    },

    confirm(selectedItem) {
      this.employee = selectedItem;
    },

    toggleDialog() {
      this.showChooseDialog = !this.showChooseDialog
    },

    validateInput({$dirty, $params, required, minLength}) {
      const errors = [];

      if (!$dirty) return errors;

      !required && errors.push("Поле обязательно.");

      const minText = $params?.minLength?.min;

      if (minText !== undefined && minText !== null) {
        !minLength && errors.push(`Минимальное количество символов: ${minText}`);
      }

      return errors;
    },

    getUserData() {
      return {
        login: this.login,
        password: this.password,
        employeeId: this.employee.id
      };
    },

    clear() {
      this.login = '';
      this.password = '';
      this.employee = null;
    },
  },

  async beforeMount() {
    await this.$store.dispatch('employee/fetchEmployees')
        .catch(err => console.dir(err))
  },
}
</script>

<style scoped>

</style>