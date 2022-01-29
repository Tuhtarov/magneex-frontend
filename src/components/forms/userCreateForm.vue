<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-form :disabled="!employees">
          <v-text-field v-model="login" type="text" label="Логин"/>
          <v-text-field v-model="password" type="password" label="Пароль"/>
          <v-btn @click="toggleDialog" text color="primary">
            {{ employee ? 'Изменить сотрудника' : 'Выбрать сотрудника' }}
          </v-btn>


          <!--Выбранный сотрудник-->
          <v-sheet class="mt-3">
            <chosen-employee-card v-if="employee" :employee="employee" :closable="true">
              <!--Кнопка отмены-->
              <v-btn v-show="employee" @click="employee = null" icon color="error" small>
                <v-icon small color="error">mdi-close</v-icon>
              </v-btn>
            </chosen-employee-card>
          </v-sheet>

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
          <v-progress-circular v-if="!employees" indeterminate color="primary"/>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="submit">Сохранить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ChooseTableDialog from "../dialogs/ChooseTableDialog";
import ChosenEmployeeCard from "../cards/chosenEmployeeCard";

export default {
  name: "userCreateForm",
  components: {ChosenEmployeeCard, ChooseTableDialog},
  data: () => ({
    login: '',
    password: '',
    employee: null,
    showChooseDialog: false,

    employeeHeaders: [
      {text: '#', value: 'id'},
      {text: 'Имя', value: 'people.name'},
      {text: 'Роль', value: 'role.name'}
    ]
  }),
  computed: {
    ...mapGetters({employees: 'employee/getEmployees'})
  },
  methods: {
    ...mapActions({createUser: 'user/createUser'}),
    async submit() {
      const user = {login: this.login, password: this.password, employeeId: this.employee.id}
      await this.createUser(user).then(r => console.dir(r)).catch(e => console.dir(e));
    },

    confirm(selectedItem) {
      this.employee = selectedItem;
    },
    toggleDialog() {
      this.showChooseDialog = !this.showChooseDialog
    },
  },
  async beforeMount() {
    await this.$store.dispatch('employee/fetchEmployees')
        .catch(err => console.dir(err));
  },
}
</script>

<style scoped>

</style>