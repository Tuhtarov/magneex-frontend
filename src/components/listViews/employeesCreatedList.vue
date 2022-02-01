<template>
  <v-card height="100%">
    <v-card-title>Недавно созданные:</v-card-title>
    <v-card-subtitle v-if="!notEmpty">Список пуст.</v-card-subtitle>
    <v-list v-if="notEmpty" elevation="5">
      <v-list-group
          v-for="employee in employees"
          :key="`${employee.people.id}`"
          v-model="employee.active"
          :prepend-icon="'mdi-briefcase'"
          no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="getFNP(employee)" />
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
import { mapGetters } from "vuex";
import PeopleShortInfoCard from "@/components/cards/peopleShortInfoCard";

export default {
  name: "employeesCreatedList",
  components: {PeopleShortInfoCard},
  data: () => ({
    employees: []
  }),
  computed: {
    ...mapGetters({ recentEmployee: "employee/getRecentEmployee" }),
    notEmpty() {
      return this.employees.length > 0 || false;
    },
  },
  watch: {
    recentEmployee(employee) {
      this.employees.push({...employee, active: false});
    }
  },
  methods: {
    getFNP({people}) {
      return `${people.family} ${people.name} ${people.patronymic}`;
    }
  },
};
</script>

<style>
.span-opacity span {
  opacity: 0.8;
}
</style>