<template>
  <v-container fluid>
    <v-row align-content="center" justify="center">
      <v-col>
        <employees-create-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import employeesCreateForm from "@/components/forms/employeeCreateForm";

export default {
  name: 'employees-create-page',
  components: {employeesCreateForm}
};
</script>

<style>
</style>