<template>
  <v-container fluid>
    <v-row align-content="center" justify="center">
      <!--Форма создания-->
      <v-col class="col-12 col-md-7 col-lg-8">
        <employees-create-form/>
      </v-col>
      <!--Недавно созданные сотрудники-->
      <v-col class="col-12 col-md-5 col-lg-4" >
        <employees-created-list/>
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
          <v-card-text v-if="hasError">При получении данных возникла ошибка.</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import employeesCreateForm from '@/components/forms/employeeCreateForm';
import EmployeesCreatedList from '@/components/listViews/employeesCreatedList';
import EmployeesTable from "@/components/tables/employees-table";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "employees",
  components: {employeesCreateForm, EmployeesCreatedList, EmployeesTable},
  data: () => ({
    loading: true,
    hasError: false
  }),
  computed: mapGetters({employees: 'employee/getEmployees'}),
  methods: mapActions({fetchEmployees: 'employee/fetchEmployees'}),
  async beforeMount() {
    await this.fetchEmployees()
        .catch(() => this.hasError = true)
        .finally(() => this.loading = false);
  }
}
</script>
