<template>
  <v-data-table
    :headers="headers"
    :no-data-text="'Пользователи не были загружены'"
    :items="users"
    :search="search"
  >
    <template v-slot:item.employee.people.family="{ item }">
      <router-link
        :to="{ name: 'employees-show', params: { id: item.employee.id } }"
        class="text-decoration-none"
      >
        {{ getFullName(item.employee.people) }}
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "users-table",
  props: {
    users: Array,
  },
  data: () => ({
    search: "",
    headers: [
      { text: "#", value: "id" },
      { text: "Сотрудник", value: "employee.people.family" },
      { text: "Логин", value: "login" },
      { text: "Роль", value: "employee.role.name" },
    ],
  }),
  methods: {
    getFullName: ({ family, name }) => `${family} ${name}`,
  },
};
</script>