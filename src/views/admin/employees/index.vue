<template>
  <v-container fluid>
    <v-row align-content="center" justify="center">
      <!--Форма создания-->
      <employee-form />

      <!--Недавно созданные сотрудники-->
      <v-col class="col-12 col-md-5 col-lg-4">
        <employees-list :employees="recentEmployees"/>
      </v-col>
    </v-row>

    <v-row>
      <!--Таблица сотрудников-->
      <v-col>
        <v-card :loading="loading" elevation="3">
          <v-card-title>Сотрудники</v-card-title>
          <v-card-text v-if="!loading">
            <employees-table :employees="employees"/>
          </v-card-text>
          <v-card-text v-if="hasError">
            При получении данных возникла ошибка.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import employeeForm from "@/components/forms/employeeForm";

import EmployeesList from '@/components/listViews/employeesList';
import EmployeesTable from "@/components/tables/employees-table";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "employees",
  components: {employeeForm, EmployeesList, EmployeesTable},
  data: () => ({
    loading: true,
    hasError: false,
  }),
  computed: {
    ...mapGetters({
      employees: 'employee/getEmployees',
      recentEmployees: 'employee/getRecentEmployees'
    }),
  },
  methods: mapActions({fetchEmployees: 'employee/fetchEmployees'}),

  async beforeMount() {
    await this.fetchEmployees()
        .catch(() => this.hasError = true)
        .finally(() => this.loading = false);
  }
}
</script>
