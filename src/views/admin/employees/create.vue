<template>
  <v-container fluid>
    <v-row align-content="center" justify="center">
      <v-col>
        <employees-create-form/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <employees-created-list />        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import employeesCreateForm from '@/components/forms/employeeCreateForm';
import EmployeesCreatedList from '@/components/listViews/employeesCreatedList';

export default {
  name: 'employees-create-page',
  components: {employeesCreateForm, EmployeesCreatedList},
};
</script>

<style>
</style>