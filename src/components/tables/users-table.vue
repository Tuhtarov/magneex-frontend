<template>
  <v-data-table
      :headers="headers"
      :no-data-text="'Пользователи не были загружены'"
      :items="users"
      :search="search">
    <template v-slot:item.employee.people.name="{item}">
      <router-link  :to="{name: 'employees-show', params: {id: item.employee.id}}">
        {{ item.employee.people.family }}
      </router-link>
    </template>
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
      {text: 'Роль', value: 'employee.role.name', width: '250px'},
      {text: 'Сотрудник', value: 'employee.people.name'},
    ]
  })
}
</script>