<template>
  <v-data-table
      :headers="headers"
      :no-data-text="'Пользователи не были загружены'"
      :items="users"
      :search="search">
    <template v-slot:item.employee.people.family="{item}">
      <router-link :to="{name: 'employees-show', params: {id: item.employee.id}}" class="text-decoration-none">
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
      {text: '#', value: 'id',},
      {text: 'Сотрудник', value: 'employee.people.family'},
      {text: 'Логин', value: 'login'},
      {text: 'Роль', value: 'employee.role.name'},
    ]
  })
}
</script>