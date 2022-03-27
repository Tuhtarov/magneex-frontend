<template>
  <v-container fluid>
    <v-row align="stretch">
      <v-col>
        <v-card elevation="5" height="100%">
          <v-card-title>Главная страница</v-card-title>

          <v-card-subtitle>
            Система учета рабочего времени сотрудников IT-компании ООО "Magneex"
          </v-card-subtitle>

          <v-card max-width="850">
            <v-card-title>Сотрудники</v-card-title>
            <v-card-subtitle>* сейчас на рабочем месте</v-card-subtitle>

            <v-card-text>
              <employees-list
                  v-if="employees" :employees="employees"
                  title=""
                  prepend-icon="mdi-lightning-bolt-circle"
              />

              <v-progress-circular v-show="!employees && loading" indeterminate />
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EmployeesList from "@/components/listViews/employeesList";
export default {
  name: 'AdminDashboard',
  components: {EmployeesList},
  data: () => ({
    employees: null,
    loading: true,
  }),

  methods: {
    fetchEmployeesInOnline() {
      this.$store.dispatch('employee/fetchEmployeesInOnline')
        .then(em => this.employees = em)
        .catch(e => console.dir(e))
        .finally(() => this.loading = false)
    }
  },

  beforeMount() {
    this.fetchEmployeesInOnline();
  }
}
</script>
