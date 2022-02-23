<template>
  <v-card height="100%">
    <v-card-title>Недавно созданные:</v-card-title>
    <v-card-subtitle v-if="!recentEmployees.length > 0">Список пуст.</v-card-subtitle>

    <v-list v-else elevation="5">
      <v-list-group
          v-for="employee in recentEmployees"
          :key="employee.id"
          :prepend-icon="'mdi-briefcase'"
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
import {mapGetters} from "vuex";
import PeopleShortInfoCard from "@/components/cards/peopleShortInfoCard";

export default {
  name: "employeesCreatedList",
  components: {PeopleShortInfoCard},
  computed: {
    ...mapGetters({recentEmployees: "employee/getRecentEmployees"}),
  },
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