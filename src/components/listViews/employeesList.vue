<template>
  <v-card height="100%">
    <v-card-title v-if="title.length > 0">{{ title }}</v-card-title>
    <v-card-subtitle v-if="!employees.length > 0">Список пуст.</v-card-subtitle>

    <v-list v-else elevation="5">
      <v-list-group
          v-for="employee in employees"
          :key="employee.id"
          :prepend-icon="prependIcon"
          no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="getFNP(employee)"/>
          </v-list-item-content>
        </template>

        <v-list-item class="ps-4">
          <v-list-item-content>
            <people-short-info-card :employee="employee"/>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

  </v-card>
</template>

<script>
import PeopleShortInfoCard from "@/components/cards/peopleShortInfoCard";

export default {
  name: "employeesList",
  props: {
    employees: {
      type: Array
    },
    prependIcon: {
      type: String,
      default: 'mdi-briefcase'
    },
    title: {
      type: String,
      default: "Недавно созданные:"
    },
  },
  components: {PeopleShortInfoCard},
  methods: {
    getFNP(employee) {
      return `${employee.people.family} ${employee.people.name} ${employee.people.patronymic}`;
    }
  },
};
</script>

<style>
.span-opacity span {
  opacity: 0.8;
}
</style>