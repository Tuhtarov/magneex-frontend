<template>
  <v-card
      :loading="loading"
      max-width="1360">
    <v-card-title>Сотрудники</v-card-title>

    <employees-table v-if="!loading" :employees="employees"/>

    <v-card-text v-if="hasError">
      При получении данных возникла ошибка.
    </v-card-text>
  </v-card>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import EmployeesTable from "@/components/tables/employees-table";

export default {
  name: 'employees-list',
  components: {EmployeesTable},
  data: () => ({
    loading: true,
    hasError: false
  }),
  computed: mapGetters({employees: 'employee/getEmployees'}),
  methods: mapActions({fetchEmployees: 'employee/fetchEmployees'}),
  watch: {
    employees(data) {
      return data;
    }
  },
  async beforeMount() {
    await this.fetchEmployees()
        .catch(() => this.hasError = true)
        .finally(() => this.loading = false);
  }
}
</script>

<style>

</style>