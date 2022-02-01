<template>
  <v-data-table
      :headers="headers"
      :no-data-text="'Пользователи не были загружены'"
      :items="users"
      :search="search">
  </v-data-table>
</template>

<script>
export default {
  name: "users-table",
  props: {
    users: {
      type: Array
    }
  },
  data: () => ({
    search: '',
    headers: [
      {text: '#', value: 'id', width: '50px'},
      {text: 'Логин', value: 'login', width: '250px'},
      {text: 'Сотрудник', value: 'employee.people.name', width: '250px'},
      {text: 'Роль', value: 'employee.role.name'},
    ]
  })
}
</script>

<style scoped>

</style>