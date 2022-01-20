<template>
  <v-container fluid>
    <v-row align-content="center" justify="center">
      <v-col cols="6">
        <people-create-form />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import peopleCreateForm from "@/components/forms/peopleCreateForm";

export default {
  name: 'employees-create-form',
  components: {peopleCreateForm}
};
</script>

<style>
</style>