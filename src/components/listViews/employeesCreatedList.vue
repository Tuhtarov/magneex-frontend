<template>
  <v-list max-width="992" v-if="employees.length > 0 || false">
    <v-list-group
      v-for="employee in employees"
      :key="`${employee.people.id}`"
      v-model="employee.active"
      :prepend-icon="'mdi-briefcase'"
      no-action
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="getFNP(employee)" />
        </v-list-item-content>
      </template>

      <v-list-item class="ps-4">
        <v-list-item-content>
          <v-card class="span-opacity">
            <p><span>Имя:</span> {{ employee.people.name }}</p>
            <p><span>Фамилия:</span> {{ employee.people.family }}</p>
            <p><span>Отчество:</span> {{ employee.people.patronymic }}</p>
            <p><span>Дата рождения:</span> {{ employee.people.birthday }}</p>
            <p><span>Телефон:</span> {{ employee.people.phone }}</p>
            <p><span>Email:</span> {{ employee.people.email }}</p>
            <v-divider dark /><br />
            <p><span>Должность:</span> {{ employee.job_position ? employee.job_position.name : "-" }}</p>
            <p><span>Роль:</span> {{ employee.role ? employee.role.name :  "-" }}</p>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "employeesCreatedList",
  data: () => ({
    employees: []
  }),
  computed: {
    ...mapGetters({ recentEmployee: "employee/getRecentEmployee" }),
  },
  watch: {
    recentEmployee(employee) {
      this.employees.push({...employee, active: false});
    }
  },
  methods: {
    getFNP({people}) {
      return `${people.family} ${people.name} ${people.patronymic}`;
    },
  },
};
</script>

<style>
.span-opacity span {
  opacity: 0.8;
}
</style>