<template>
  <v-card elevation="3">
    <v-system-bar
        v-if="closable"
        lights-out>
      <v-spacer />
      <slot></slot>
    </v-system-bar>

    <v-card-title :class="closable ? 'pt-0' : ''">Выбран сотрудник:</v-card-title>
    <v-card-subtitle>
      <b>{{ employee.people.name }} {{ employee.people.family }} {{ employee.people.patronymic }}</b>
    </v-card-subtitle>
    <v-card-text>
      <p v-if="employee.role">Роль: {{ employee.role.name }} </p>
      <p v-if="employee.jobPosition">Роль: {{ employee.jobPosition.name }} </p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "chosenEmployeeCard",
  props: {
    employee: {
      type: Object
    },
    closable: {
      type: Boolean
    }
  }
}
</script>