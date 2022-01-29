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
      {text: '#', value: 'id'},
      {text: 'Логин', value: 'login'},
      {text: 'Сотрудник', value: 'employee.people.name'},
    ]
  })
}
</script>

<style scoped>

</style>