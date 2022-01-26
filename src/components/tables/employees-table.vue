<template>
  <v-card>
    <template v-if="employeesEmpty">
      <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="employees"
          :no-data-text="'Данные отстутствуют'"
          :search="search"
      >
      </v-data-table>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "employees-table",
  props: {
    employees: {
      default: []
    }
  },
  data: () => ({
    search: '',
    headers: [
      {text: 'Имя', align: 'start', value: 'name',},
      {text: 'Фамилия', value: 'family'},
      {text: 'Отчество', value: 'patronymic'},
      {text: 'Дата рождения', value: 'birthday'},
      {text: 'Почта', value: 'email'},
      {text: 'Телефон', value: 'phone'},
    ],
  }),
  computed: {
    employeesEmpty() {
      return this.employees?.length > 0 ?? false;
    }
  }
}
</script>

<style scoped>

</style>