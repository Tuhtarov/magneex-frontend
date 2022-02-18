<template>
  <v-card class="table-persistence-height" outlined>
    <template v-if="employeesNotEmpty">
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Поиск"
            style="max-width: 500px;"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="employees"
          :no-data-text="'Данные отстутствуют'"
          :search="search">
        <template v-slot:item.actions="{item}">
          <div class="d-flex flex-wrap">
            <v-btn small elevation="3" class="mr-3" color="primary" @click="show(item.id)" icon outlined>
              <v-icon small>mdi-eye-outline</v-icon>
            </v-btn>
            <v-btn small elevation="3" class="mr-3" color="orange" @click="edit(item.id)" icon outlined>
              <v-icon small>mdi-pencil-outline</v-icon>
            </v-btn>
            <v-btn small elevation="3" color="red" @click="remove(item.id)" icon outlined>
              <v-icon small>mdi-close</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>

      <confirm-dialog
          title="Удаление сотрудника."
          text="Подтвердите своё действие."
          :visible="confirmDialog"
          :acceptCallback="acceptCallback"
          @close="confirmDialog = false"/>
    </template>
  </v-card>
</template>

<script>
import ConfirmDialog from "../dialogs/ConfirmDialog";
export default {
  name: "employees-table",
  components: {ConfirmDialog},
  props: {
    employees: {
      default: []
    }
  },
  data: () => ({
    search: '',
    headers: [
      {text: '#', value: 'id', width: '50px'},
      {text: 'Имя', align: 'start', value: 'people.name', width: '250px'},
      {text: 'Фамилия', value: 'people.family', width: '250px'},
      // {text: 'Отчество', value: 'people.patronymic'},
      // {text: 'Дата рождения', value: 'people.birthday'},
      {text: 'Почта', value: 'people.email'},
      {text: 'Телефон', value: 'people.phone'},
      {text: 'Роль', value: 'role.name'},
      {text: 'Должность', value: 'jobPosition.name'},
      {text: 'Действия', value: 'actions'},
    ],
    confirmDialog: false,
    acceptCallback: null
  }),
  computed: {
    employeesNotEmpty() {
      return this.employees?.length > 0 ?? false;
    }
  },
  methods: {
    show(id) {
      this.$router.push({name: 'employees-show', params: {id: id}});
    },
    edit(id) {
      console.dir(id)
    },
    // eslint-disable-next-line no-unused-vars
    async remove(id) {
      this.confirmDialog = true;

      this.acceptCallback = async () => {
        await this.$store.dispatch('employee/deleteEmployeeById', id)
            .catch(() => console.log('ошибка при удалении сотрудника'));
      }
    }
  },
}
</script>

<style scoped>
.table-persistence-height {
  min-height: 731px;
}

@media screen and (max-width: 600px) {
  .table-persistence-height {
    min-height: unset;
  }
}
</style>