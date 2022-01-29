<template>
  <v-container fluid>
    <v-row align-content="center" justify="center">
      <v-col>
        <job-position-create-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import JobPositionCreateForm from "../../../components/forms/JobPositionCreateForm";
export default {
  name: 'employees-create-page',
  components: {JobPositionCreateForm},
};
</script>

<style>
</style>